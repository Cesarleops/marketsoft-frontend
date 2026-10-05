import { useEffect, useState } from "react";
import { getUsers } from "../../users/api";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../shared/http-client";

export const SaleUserForm = ({ sale, onSubmit }) => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(() => sale.User?.id ?? "");
  const [validated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        setUsers(users);
      } catch (error) {
        console.error(error);
        toast.error(getErrorMessage(error, "No se pudieron cargar los usuarios"));
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      toast.error("Revise los campos marcados en rojo");
      return;
    }
    try {
      setIsSubmitting(true);
      await onSubmit({ userId });
    } catch (error) {
      console.error(error);
      toast.error("No se pudo guardar la venta");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={"row g-3" + (validated ? " was-validated" : "")}
    >
      <div className="col-12">
        <div className="border rounded p-3">
          <h2 className="h5">Detalles de la venta</h2>
          <p className="mb-1 text-body-secondary">
            Fecha: {new Date(sale.date).toLocaleString()}
          </p>
          <p className="mb-1 text-body-secondary">
            Total: ${Number(sale.total).toFixed(2)}
          </p>
          <ul className="list-unstyled mb-0">
            {sale.SaleDetails?.map((detail) => (
              <li key={detail.id}>
                {detail.Product?.name} × {detail.quantity} — $
                {Number(detail.price).toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="col-12">
        <label htmlFor="userId" className="form-label">
          Vendedor
        </label>
        <select
          name="userId"
          id="userId"
          className="form-select"
          required
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value="" disabled>
            Seleccione un vendedor
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <div className="invalid-feedback">Debe seleccionar un vendedor</div>
      </div>
      <div className="col-12">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </form>
  );
};
