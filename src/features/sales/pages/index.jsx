import { useEffect, useState } from "react";
import { getSales } from "../api";
import { Link } from "react-router";
import { SaleTable } from "../components/sale-table";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../shared/http-client";

export default function Sales() {
  const [sales, setSales] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchSales = async () => {
    try {
      setLoading(true);
      const sales = await getSales();
      setSales(sales);
    } catch (error) {
      toast.error(getErrorMessage(error, "No se pudieron cargar las ventas"));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSales();
  }, []);
  return (
    <section>
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Ventas</h1>
        <Link to="create" className="btn btn-primary">
          Crear venta
        </Link>
      </header>
      {loading && <p>Cargando</p>}
      {!loading && <SaleTable sales={sales} />}
    </section>
  );
}
