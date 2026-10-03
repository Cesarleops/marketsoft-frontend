import { Link } from "react-router";
import { deleteUser } from "../api";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../shared/http-client";

export const UserTable = ({ users, onDelete }) => {
  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      onDelete(userId);
    } catch (error) {
      toast.error(getErrorMessage(error, "No se pudo eliminar el usuario"));
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Correo</th>
            <th scope="col">Rol</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center text-body-secondary">
                No hay usuarios
              </td>
            </tr>
          )}
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td className="text-body-secondary">{user.email}</td>
              <td>
                <span className="badge text-bg-primary">{user.role}</span>
              </td>
              <td>
                <div className="d-flex gap-2">
                  <Link
                    to={`edit/${user.id}`}
                    className="btn btn-outline-primary btn-sm"
                  >
                    Editar
                  </Link>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(user.id)}
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
