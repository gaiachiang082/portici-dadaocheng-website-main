const express = require('express');
const mysql = require('mysql2/promise');
const { Resend } = require('resend');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const resend = new Resend(process.env.RESEND_API_KEY);

// MySQL 連接池
const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 驗證 email 格式
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// POST /api/subscribe
app.post('/api/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    // 驗證 email
    if (!email || !validateEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const connection = await pool.getConnection();

    // 檢查 email 是否已存在
    const [rows] = await connection.query(
      'SELECT * FROM subscribers WHERE email = ?',
      [email]
    );

    if (rows.length > 0) {
      connection.release();
      return res.status(400).json({ error: 'Email already subscribed' });
    }

    // 插入資料庫
    await connection.query(
      'INSERT INTO subscribers (email, created_at) VALUES (?, NOW())',
      [email]
    );

    connection.release();

    // 發送確認郵件
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: email,
      subject: 'Welcome to our Newsletter',
      html: `<p>Thank you for subscribing to our newsletter!</p>`
    });

    res.status(200).json({ message: 'Successfully subscribed' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 健康檢查
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Newsletter API running on port ${PORT}`);
});
