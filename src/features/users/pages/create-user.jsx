import { createUser } from "../api";
import { UserForm } from "../components/user-form";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../shared/http-client";

export default function CreateUser() {
  const handleCreate = async (user) => {
    try {
      await createUser(user);
      toast.success("Usuario creado correctamente");
    } catch (error) {
      toast.error(getErrorMessage(error, "No se pudo crear el usuario"));
    }
  };
  return (
    <section>
      <UserForm userData={null} onSubmit={handleCreate} />
    </section>
  );
}
