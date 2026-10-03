import { createProvider } from "../api";
import { ProviderForm } from "../components/provider-form";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../shared/http-client";

export default function CreateProvider() {
  const handleCreate = async (provider) => {
    try {
      await createProvider(provider);
      toast.success("Proveedor creado correctamente");
    } catch (error) {
      toast.error(getErrorMessage(error, "No se pudo crear el proveedor"));
    }
  };
  return (
    <section>
      <ProviderForm providerData={null} onSubmit={handleCreate} />
    </section>
  );
}
