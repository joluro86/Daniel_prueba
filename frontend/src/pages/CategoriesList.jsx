import { useEffect, useState } from 'react'
import { listCategories, deleteCategory } from '../api/categories'
import { Link } from 'react-router-dom'

export default function CategoriesList() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const rows = await listCategories()
      setData(rows)
    } finally {
      setLoading(false)
    }
  }

  const removeOne = async (id) => {
    const confirmDelete = window.confirm('¿Seguro que deseas eliminar esta categoría?')
    if (!confirmDelete) return
    await deleteCategory(id)
    await load()
  }

  useEffect(() => { load() }, [])

  return (
    <div className="container fade-in">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Categorías</h2>
          <Link to="/categories/new" className="btn btn-accent">+ Nueva</Link>
        </div>

        {loading ? (
          <div className="p-3 text-center text-gray">
            <div className="loader"></div>
            <p>Cargando categorías...</p>
          </div>
        ) : data.length ? (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th style={{ textAlign: 'right' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.map(c => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td className="font-medium">{c.name}</td>
                    <td style={{ textAlign: 'right' }}>
                      <Link
                        to={`/categories/${c.id}`}
                        className="btn btn-outline"
                        style={{ marginRight: '8px' }}
                      >
                        Editar
                      </Link>
                      <button
                        className="btn btn-ghost"
                        onClick={() => removeOne(c.id)}
                      >
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
            <p>No hay categorías registradas.</p>
            <Link to="/categories/new" className="btn btn-primary mt-2">
              Crear la primera
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
