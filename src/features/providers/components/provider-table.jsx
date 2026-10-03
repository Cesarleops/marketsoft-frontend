import { Link } from "react-router";
import { deleteProvider } from "../api";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../shared/http-client";

export const ProviderTable = ({ providers, onDelete }) => {
  const handleDelete = async (providerId) => {
    try {
      await deleteProvider(providerId);
      onDelete(providerId);
    } catch (error) {
      toast.error(getErrorMessage(error, "No se pudo eliminar el proveedor"));
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Teléfono</th>
            <th scope="col">Correo</th>
            <th scope="col">Ciudad</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {providers.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center text-body-secondary">
                No hay proveedores
              </td>
            </tr>
          )}
          {providers.map((provider) => (
            <tr key={provider.id}>
              <td>{provider.name}</td>
              <td className="text-body-secondary">{provider.phone}</td>
              <td className="text-body-secondary">{provider.email}</td>
              <td>{provider.city}</td>
              <td>
                <div className="d-flex gap-2">
                  <Link
                    to={`edit/${provider.id}`}
                    className="btn btn-outline-primary btn-sm"
                  >
                    Editar
                  </Link>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(provider.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
