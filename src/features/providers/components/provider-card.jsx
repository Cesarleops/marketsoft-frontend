import { Link } from "react-router";
import { deleteProvider } from "../api";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../shared/http-client";

export const ProviderCard = ({ provider, onDelete }) => {
  const handleDelete = async (providerId) => {
    try {
      await deleteProvider(providerId);
      onDelete(providerId);
    } catch (error) {
      toast.error(getErrorMessage(error, "No se pudo eliminar el proveedor"));
    }
  };

  return (
    <div className="col">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title h5">{provider.name}</h2>
          <p className="card-text text-body-secondary">{provider.email}</p>
          <p className="card-text mb-0 text-body-secondary">
            {provider.city} · {provider.phone}
          </p>
        </div>
        <div className="card-footer bg-white d-flex gap-2">
          <Link to={`edit/${provider.id}`} className="btn btn-outline-primary btn-sm">
            Editar
          </Link>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => handleDelete(provider.id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};
