import { useEffect, useState } from "react";
import { getProviders } from "../api";
import { Link } from "react-router";
import { ProviderTable } from "../components/provider-table";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../shared/http-client";

export default function Providers() {
  const [providers, setProviders] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      const providers = await getProviders();
      setProviders(providers);
    } catch (error) {
      toast.error(getErrorMessage(error, "No se pudieron cargar los proveedores"));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProviders();
  }, []);
  return (
    <section>
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Proveedores</h1>
        <Link to="create" className="btn btn-primary">
          Crear proveedor
        </Link>
      </header>
      {loading && <p>Cargando</p>}
      {!loading && (
        <ProviderTable
          providers={providers}
          onDelete={() => fetchProviders()}
        />
      )}
    </section>
  );
}
