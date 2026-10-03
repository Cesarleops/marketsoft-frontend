import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { UserForm } from "../components/user-form";
import { getUser, updateUser } from "../api";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../shared/http-client";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async (data) => {
    try {
      await updateUser(id, data);
      toast.success("Usuario actualizado correctamente");
      navigate("/users");
    } catch (error) {
      toast.error(getErrorMessage(error, "No se pudo actualizar el usuario"));
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const response = await getUser(id);
        setUser(response);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [id]);
  return (
    <section>
      {isLoading && <div>Cargando</div>}

      {error && <div>{error}</div>}
      {user && <UserForm userData={user} onSubmit={handleUpdate} />}
    </section>
  );
}
