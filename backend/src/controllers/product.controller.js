const pool = require('../db/pool');

const isNumber = (v) => typeof v === 'number' && !Number.isNaN(v);

// LISTAR todos (con nombre de categoría)
exports.getAll = async (req, res) => {
  const [rows] = await pool.query(
    `SELECT p.id, p.name, p.description, p.price, p.category_id,
            c.name AS category_name
     FROM products p
     LEFT JOIN categories c ON c.id = p.category_id
     ORDER BY p.id DESC`
  );
  res.json(rows);
};

// OBTENER uno
exports.getOne = async (req, res) => {
  const [rows] = await pool.query(
    `SELECT p.id, p.name, p.description, p.price, p.category_id,
            c.name AS category_name
     FROM products p
     LEFT JOIN categories c ON c.id = p.category_id
     WHERE p.id=?`,
    [req.params.id]
  );
  if (!rows.length) return res.status(404).json({ message: 'No encontrado' });
  res.json(rows[0]);
};

// CREAR
exports.create = async (req, res) => {
  let { name, description, price, category_id } = req.body;

  if (!name?.trim() || !description?.trim()) {
    return res.status(400).json({ message: 'name y description son requeridos' });
  }
  price = Number(price);
  if (!isNumber(price) || price < 0) {
    return res.status(400).json({ message: 'price debe ser número >= 0' });
  }
  category_id = category_id ? Number(category_id) : null;

  const [r] = await pool.query(
    `INSERT INTO products(name, description, price, category_id)
     VALUES (?,?,?,?)`,
    [name.trim(), description.trim(), price, category_id]
  );
  res.status(201).json({ id: r.insertId, name: name.trim(), description: description.trim(), price, category_id });
};

// ACTUALIZAR
exports.update = async (req, res) => {
  let { name, description, price, category_id } = req.body;

  if (!name?.trim() || !description?.trim()) {
    return res.status(400).json({ message: 'name y description son requeridos' });
  }
  price = Number(price);
  if (!isNumber(price) || price < 0) {
    return res.status(400).json({ message: 'price debe ser número >= 0' });
  }
  category_id = category_id ? Number(category_id) : null;

  const [r] = await pool.query(
    `UPDATE products
     SET name=?, description=?, price=?, category_id=?
     WHERE id=?`,
    [name.trim(), description.trim(), price, category_id, req.params.id]
  );
  if (!r.affectedRows) return res.status(404).json({ message: 'No encontrado' });
  res.json({ id: Number(req.params.id), name: name.trim(), description: description.trim(), price, category_id });
};

// ELIMINAR
exports.remove = async (req, res) => {
  const [r] = await pool.query('DELETE FROM products WHERE id=?', [req.params.id]);
  if (!r.affectedRows) return res.status(404).json({ message: 'No encontrado' });
  res.json({ ok: true });
};
