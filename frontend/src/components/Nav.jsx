import { Link } from 'react-router-dom';

export default function Nav(){
  return (
    <nav style={{display:'flex', gap:12, padding:12, borderBottom:'1px solid #eee'}}>
      <Link to="/categories">Categorías</Link>
      <Link to="/products">Productos</Link>
    </nav>
  );
}
