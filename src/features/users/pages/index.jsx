import { useEffect, useState } from "react";
import { getUsers } from "../api";
import { Link } from "react-router";
import { UserCard } from "../components/user-card";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../shared/http-client";

export default function Users() {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const users = await getUsers();
      setUsers(users);
    } catch (error) {
      toast.error(getErrorMessage(error, "No se pudieron cargar los usuarios"));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <section>
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Usuarios</h1>
        <Link to="create" className="btn btn-primary">
          Crear usuario
        </Link>
      </header>
      {loading && <p>Cargando</p>}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onDelete={() => fetchUsers()}
          />
        ))}
      </div>
    </section>
  );
}
