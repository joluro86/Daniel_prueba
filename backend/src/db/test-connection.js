const pool = require('./pool');

(async () => {
  try {
    const [rows] = await pool.query('SELECT 1 AS ok');
    console.log('Conexión OK:', rows[0]);
    process.exit(0);
  } catch (e) {
    console.error('Error de conexión:', e.message);
    process.exit(1);
  }
})();
