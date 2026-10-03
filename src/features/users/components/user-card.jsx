import { Link } from "react-router";
import { deleteUser } from "../api";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../shared/http-client";

export const UserCard = ({ user, onDelete }) => {
  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      onDelete(userId);
    } catch (error) {
      toast.error(getErrorMessage(error, "No se pudo eliminar el usuario"));
    }
  };

  return (
    <div className="col">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title h5">{user.name}</h2>
          <p className="card-text text-body-secondary">{user.email}</p>
        </div>
        <div className="card-footer bg-white d-flex justify-content-between align-items-center">
          <span className="badge text-bg-primary">{user.role}</span>
          <div className="d-flex gap-2">
            <Link to={`edit/${user.id}`} className="btn btn-outline-primary btn-sm">
              Editar
            </Link>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => handleDelete(user.id)}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
