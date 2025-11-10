const express = require('express');
const cors = require('cors');
require('dotenv').config();

const categoriesRouter = require('./routes/category.routes');
const productsRouter = require('./routes/product.routes');


const app = express();
app.use(cors());
app.use(express.json());

// healthcheck
app.get('/health', (req, res) => res.json({ ok: true }));

// rutas
app.use('/categories', categoriesRouter);

app.use('/products', productsRouter);

// 404
app.use((req, res) => res.status(404).json({ message: 'Ruta no encontrada' }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API escuchando en http://localhost:${PORT}`));
