import { createSale } from "../api";
import { SaleForm } from "../components/sale-form";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../shared/http-client";

export default function CreateSale() {
  const handleCreate = async (sale) => {
    try {
      await createSale(sale);
      toast.success("Venta creada correctamente");
    } catch (error) {
      toast.error(getErrorMessage(error, "No se pudo crear la venta"));
    }
  };
  return (
    <section>
      <SaleForm onSubmit={handleCreate} />
    </section>
  );
}
