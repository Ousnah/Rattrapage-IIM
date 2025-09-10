import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow px-4 py-2 flex gap-4">
        <Link to="/">Accueil</Link>
        <Link to="/products">Produits</Link>
        <Link to="/add">Ajouter</Link>
      </nav>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
