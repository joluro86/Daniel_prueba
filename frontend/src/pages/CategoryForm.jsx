import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getCategory, createCategory, updateCategory } from '../api/categories';

export default function CategoryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      if (id) {
        try {
          const c = await getCategory(id);
          setName(c.name);
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert('El nombre es obligatorio');
    setSaving(true);
    try {
      if (id) await updateCategory(id, { name });
      else await createCategory({ name });
      navigate('/categories');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container fade-in">
        <div className="card text-center">
          <div className="loader"></div>
          <p>Cargando categoría...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container fade-in">
      <div className="card" style={{ maxWidth: '480px', margin: '0 auto' }}>
        <h2 className="card-title mb-3">
          {id ? 'Editar categoría' : 'Nueva categoría'}
        </h2>

        <form className="form" onSubmit={onSubmit}>
          <div className="field">
            <label className="label">Nombre</label>
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Electrónica"
              autoFocus
            />
          </div>

          <div className="flex gap-3 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={saving}
            >
              {saving ? 'Guardando...' : 'Guardar'}
            </button>

            <Link to="/categories">
              <button type="button" className="btn btn-outline">
                Cancelar
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
