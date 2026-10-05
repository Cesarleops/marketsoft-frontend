import { useEffect, useState } from "react";
import { getProducts } from "../api";
import { getProviders } from "../../providers/api";
import { Link } from "react-router";
import { ProductTable } from "../components/product-table";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../shared/http-client";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [providers, setProviders] = useState([]);

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
    const fetchProviders = async () => {
      try {
        const providers = await getProviders();
        setProviders(providers);
      } catch (error) {
        toast.error(
          getErrorMessage(error, "No se pudieron cargar los proveedores"),
        );
      }
    };
    fetchProviders();
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
      {!loading && (
        <ProductTable
          products={products}
          providers={providers}
          onDelete={() => fetchProducts()}
        />
      )}
    </section>
  );
}
