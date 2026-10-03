import { useEffect, useState } from "react";
import { getProducts } from "../api";
import { Link } from "react-router";
import { ProductCard } from "../components/product-card";

export default function Products() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const products = await getProducts();
      setProducts(products);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <section>
      <header>
        <h1>Productos</h1>
        <Link to="create">
          <button>Crear</button>
        </Link>
      </header>
      {loading && <p>Cargando</p>}
      {error && <p>{error}</p>}
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onDelete={() => fetchProducts()}
        />
      ))}
    </section>
  );
}
