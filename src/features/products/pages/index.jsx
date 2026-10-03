import { useEffect, useState } from "react";
import { getProducts } from "../api";
import { Link } from "react-router";
import { ProductCard } from "../components/product-card";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../shared/http-client";

export default function Products() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const products = await getProducts();
      setProducts(products);
    } catch (error) {
      toast.error(getErrorMessage(error, "No se pudieron cargar los productos"));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <section>
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Productos</h1>
        <Link to="create" className="btn btn-primary">
          Crear producto
        </Link>
      </header>
      {loading && <p>Cargando</p>}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={() => fetchProducts()}
          />
        ))}
      </div>
    </section>
  );
}
