const pool = require('../db/pool');

// Obtener todas las categorías
exports.getAll = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM categories ORDER BY id DESC');
  res.json(rows);
};

// Obtener una sola categoría por ID
exports.getOne = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM categories WHERE id=?', [req.params.id]);
  if (!rows.length) return res.status(404).json({ message: 'No encontrada' });
  res.json(rows[0]);
};

// Crear una categoría nueva
exports.create = async (req, res) => {
  const { name } = req.body;
  if (!name?.trim()) return res.status(400).json({ message: 'El campo name es obligatorio' });

  const [result] = await pool.query('INSERT INTO categories(name) VALUES(?)', [name.trim()]);
  res.status(201).json({ id: result.insertId, name: name.trim() });
};

// Actualizar una categoría
exports.update = async (req, res) => {
  const { name } = req.body;
  if (!name?.trim()) return res.status(400).json({ message: 'El campo name es obligatorio' });

  const [result] = await pool.query('UPDATE categories SET name=? WHERE id=?', [name.trim(), req.params.id]);
  if (!result.affectedRows) return res.status(404).json({ message: 'No encontrada' });

  res.json({ id: Number(req.params.id), name: name.trim() });
};

// Eliminar una categoría
exports.remove = async (req, res) => {
  const [result] = await pool.query('DELETE FROM categories WHERE id=?', [req.params.id]);
  if (!result.affectedRows) return res.status(404).json({ message: 'No encontrada' });
  res.json({ ok: true });
};
