import mysql from 'mysql2/promise';

const conn = await mysql.createConnection({
  host: 'gateway01.eu-central-1.prod.aws.tidbcloud.com',
  port: 4000,
  user: '49mkV6PmUkHPshk.root',
  password: 'xEZ5wwQ1JZRVDHWP',
  database: 'test',
  ssl: { rejectUnauthorized: true }
});

await conn.execute(`INSERT INTO workshops (id,slug,title,titleZh,category,description,descriptionZh,durationMinutes,maxParticipants,priceEur,depositPercent,location,imageUrl,isActive) VALUES
(1,'calligraphy-intro','Calligrafia Cinese — Introduzione','漢字書法入門','calligraphy','Discover the art of Chinese calligraphy in a 2-hour hands-on session.','在兩小時的實作課程中探索漢字書法藝術。',120,10,65.00,50,'Via Indipendenza 8, Bologna','https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/rgyUQfdKTgRPNsEk.png',1),
(2,'ink-painting-plum','Pittura a Inchiostro — Fiori di Pruno','水墨畫：梅花','ink','Learn the meditative art of Chinese ink painting.','學習中國水墨畫的冥想藝術。',150,8,75.00,50,'Via Indipendenza 8, Bologna','https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/fJQLNNktTOZKWVkY.png',1),
(3,'tea-ceremony-dadaocheng','Cerimonia del Tè — Stile Dadaocheng','大稻埕茶道體驗','tea','Experience a traditional Taiwanese tea ceremony.','體驗以大稻埕歷史茶文化為靈感的台灣傳統茶道。',90,12,45.00,50,'Via Indipendenza 8, Bologna','https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/moKMdnvvYcKhiErW.png',1)`);

await conn.execute(`INSERT INTO workshop_sessions (id,workshopId,sessionDate,spotsTotal,spotsBooked,isActive) VALUES
(1,1,'2026-03-15 10:00:00',10,3,1),
(2,1,'2026-03-22 14:00:00',10,1,1),
(3,1,'2026-04-05 10:00:00',10,1,1),
(4,2,'2026-03-20 10:00:00',8,5,1),
(5,2,'2026-04-10 14:00:00',8,0,1),
(6,3,'2026-03-18 16:00:00',12,5,1),
(7,3,'2026-03-25 16:00:00',12,2,1),
(8,3,'2026-04-08 16:00:00',12,0,1)`);

console.log('✅ 資料匯入成功！');
await conn.end();