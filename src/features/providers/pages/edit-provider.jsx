import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ProviderForm } from "../components/provider-form";
import { getProvider, updateProvider } from "../api";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../shared/http-client";

export default function EditProvider() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [provider, setProvider] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async (data) => {
    try {
      await updateProvider(id, data);
      toast.success("Proveedor actualizado correctamente");
      navigate("/providers");
    } catch (error) {
      toast.error(getErrorMessage(error, "No se pudo actualizar el proveedor"));
    }
  };
  useEffect(() => {
    const fetchProvider = async () => {
      try {
        setIsLoading(true);
        const response = await getProvider(id);
        setProvider(response);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProvider();
  }, [id]);
  return (
    <section>
      {isLoading && <div>Cargando</div>}

      {error && <div>{error}</div>}
      {provider && <ProviderForm providerData={provider} onSubmit={handleUpdate} />}
    </section>
  );
}
