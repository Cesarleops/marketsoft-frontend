import { useState } from "react";
import { toast } from "react-toastify";

const initialUser = {
  name: "",
  email: "",
  role: "",
};
export const UserForm = ({ userData, onSubmit }) => {
  const [user, setUser] = useState(() => userData ?? initialUser);
  const [validated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

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
      await onSubmit({ ...user });
    } catch (error) {
      console.error(error);
      toast.error("No se pudo guardar el usuario");
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
      <div className="col-md-6">
        <label htmlFor="name" className="form-label">
          Nombre
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="form-control"
          required
          value={user.name}
          onChange={handleChange}
        />
        <div className="invalid-feedback">El nombre es obligatorio</div>
      </div>
      <div className="col-md-6">
        <label htmlFor="email" className="form-label">
          Correo
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="form-control"
          required
          value={user.email}
          onChange={handleChange}
        />
        <div className="invalid-feedback">Ingrese un correo válido</div>
      </div>
      <div className="col-12">
        <label htmlFor="role" className="form-label">
          Rol
        </label>
        <input
          type="text"
          name="role"
          id="role"
          className="form-control"
          required
          value={user.role}
          onChange={handleChange}
        />
        <div className="invalid-feedback">El rol es obligatorio</div>
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
