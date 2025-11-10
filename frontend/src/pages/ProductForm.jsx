import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getProduct, createProduct, updateProduct } from '../api/products';
import { listCategories } from '../api/categories';

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category_id: ''
  });
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const cats = await listCategories();
      setCategories(cats);

      if (id) {
        try {
          const p = await getProduct(id);
          setForm({
            name: p.name ?? '',
            description: p.description ?? '',
            // se mantiene  como string para el input;  se formatea visualmente sólo al mostrarse
            price: p.price ?? '',
            category_id: p.category_id ?? ''
          });
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Evita números negativos en precio
    if (name === 'price') {
      const v = value.replace(',', '.');
      if (v === '' || /^[0-9]*\.?[0-9]{0,2}$/.test(v)) {
        setForm((f) => ({ ...f, [name]: v }));
      }
      return;
    }
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { name, description, price, category_id } = form;

    if (!name.trim() || !description.trim()) {
      alert('Nombre y descripción son obligatorios');
      return;
    }

    const priceNum = Number((price || '0').toString().replace(',', '.'));
    if (Number.isNaN(priceNum) || priceNum < 0) {
      alert('Precio inválido');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: name.trim(),
        description: description.trim(),
        price: priceNum,
        category_id: category_id ? Number(category_id) : null
      };
      if (id) await updateProduct(id, payload);
      else await createProduct(payload);
      navigate('/products');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container fade-in">
        <div className="card text-center">
          <div className="loader"></div>
          <p>Cargando producto...</p>
        </div>
      </div>
    );
  }

  const pricePreview =
    form.price !== ''
      ? (() => {
          const n = Number(form.price.toString().replace(',', '.'));
          return Number.isNaN(n)
            ? ''
            : n.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
        })()
      : '';

  return (
    <div className="container fade-in">
      <div className="card" style={{ maxWidth: 640, margin: '0 auto' }}>
        <h2 className="card-title mb-3">{id ? 'Editar producto' : 'Nuevo producto'}</h2>

        <form className="form" onSubmit={onSubmit}>
          {/* Nombre */}
          <div className="field">
            <label className="label">Nombre</label>
            <input
              className="input"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ej: Mouse inalámbrico"
              autoFocus
            />
            <div className="help">Nombre comercial del producto.</div>
          </div>

          {/* Descripción */}
          <div className="field">
            <label className="label">Descripción</label>
            <textarea
              className="textarea"
              name="description"
              rows={3}
              value={form.description}
              onChange={handleChange}
              placeholder="Breve descripción o especificaciones"
            />
            <div className="help">Máximo 500–700 caracteres recomendados.</div>
          </div>

          {/* Precio */}
          <div className="field">
            <label className="label">Precio</label>
            <input
              className="input"
              name="price"
              inputMode="decimal"
              placeholder="0.00"
              value={form.price}
              onChange={handleChange}
            />
            <div className="help">
              {pricePreview ? `Vista previa: ${pricePreview}` : 'Ingresa un valor numérico (hasta 2 decimales).'}
            </div>
          </div>

          {/* Categoría */}
          <div className="field">
            <label className="label">Categoría</label>
            <select
              className="select"
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
            >
              <option value="">— Sin categoría —</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <div className="help">Opcional. Puedes asignarlo después.</div>
          </div>

          {/* Acciones */}
          <div className="flex gap-3 mt-3">
            <button className="btn btn-primary" type="submit" disabled={saving}>
              {saving ? 'Guardando…' : 'Guardar'}
            </button>
            <Link to="/products">
              <button className="btn btn-outline" type="button">
                Cancelar
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
