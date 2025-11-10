import { useEffect, useState } from 'react';
import { listProducts, deleteProduct } from '../api/products';
import { Link } from 'react-router-dom';

export default function ProductsList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const rows = await listProducts();
      setData(rows);
    } finally {
      setLoading(false);
    }
  };

  const removeOne = async (id) => {
    const confirmDelete = window.confirm('¿Seguro que deseas eliminar este producto?');
    if (!confirmDelete) return;
    await deleteProduct(id);
    await load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="container fade-in">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Productos</h2>
          <Link to="/products/new" className="btn btn-accent">
            + Nuevo
          </Link>
        </div>

        {loading ? (
          <div className="p-3 text-center text-gray">
            <div className="loader"></div>
            <p>Cargando productos...</p>
          </div>
        ) : data.length ? (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Categoría</th>
                  <th style={{ textAlign: 'right' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td className="font-medium">{p.name}</td>
                    <td>{p.description}</td>
                    <td>
                      <span className="badge">
                        ${parseFloat(p.price).toLocaleString('es-CO', { minimumFractionDigits: 2 })}
                      </span>
                    </td>
                    <td>{p.category_name || '—'}</td>
                    <td style={{ textAlign: 'right' }}>
                      <Link
                        to={`/products/${p.id}`}
                        className="btn btn-outline"
                        style={{ marginRight: '8px' }}
                      >
                        Editar
                      </Link>
                      <button className="btn btn-ghost" onClick={() => removeOne(p.id)}>
                        🗑 Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-4 text-center text-gray">
            <p>No hay productos registrados.</p>
            <Link to="/products/new" className="btn btn-primary mt-2">
              Crear el primero
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
