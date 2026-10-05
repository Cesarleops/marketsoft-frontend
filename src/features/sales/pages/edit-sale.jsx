import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { SaleUserForm } from "../components/sale-user-form";
import { getSale, updateSale } from "../api";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../shared/http-client";

export default function EditSale() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sale, setSale] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async (data) => {
    try {
      await updateSale(id, data);
      toast.success("Venta actualizada correctamente");
      navigate("/sales");
    } catch (error) {
      toast.error(getErrorMessage(error, "No se pudo actualizar la venta"));
    }
  };
  useEffect(() => {
    const fetchSale = async () => {
      try {
        setIsLoading(true);
        const response = await getSale(id);
        setSale(response);
      } catch (error) {
        setError(getErrorMessage(error, "No se pudo cargar la venta"));
      } finally {
        setIsLoading(false);
      }
    };
    fetchSale();
  }, [id]);
  return (
    <section>
      {isLoading && <div>Cargando</div>}

      {error && <div>{error}</div>}
      {sale && <SaleUserForm sale={sale} onSubmit={handleUpdate} />}
    </section>
  );
}
