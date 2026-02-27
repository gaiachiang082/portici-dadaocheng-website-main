import mysql from 'mysql2/promise';

const conn = await mysql.createConnection({
  host: 'gateway01.eu-central-1.prod.aws.tidbcloud.com',
  port: 4000,
  user: '49mkV6PmUkHPshk.root',
  password: 'xEZ5wwQ1JZRVDHWP',
  database: 'test',
  ssl: { rejectUnauthorized: true }
});

await conn.execute(`INSERT INTO bookings 
(id, sessionId, workshopId, guestName, guestEmail, guestPhone, participants, totalAmountEur, depositAmountEur, balanceAmountEur, stripeCheckoutSessionId, paymentStatus, status, createdAt) VALUES
(1, 1, 1, 'Marco Rossi', 'marco@example.com', '+39 333 1234567', 1, 65.00, 32.50, 32.50, 'cs_test_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z', 'deposit_paid', 'confirmed', '2026-02-25 10:30:00'),
(2, 3, 3, 'Lucia Bianchi', 'lucia@example.com', '+39 333 9876543', 2, 90.00, 45.00, 45.00, 'cs_test_b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6', 'deposit_paid', 'confirmed', '2026-02-26 14:15:00')`);

console.log('✅ Bookings 匯入成功！');
await conn.end();
