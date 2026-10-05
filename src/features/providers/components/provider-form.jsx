import { useState } from "react";
import { toast } from "react-toastify";

const initialProvider = {
  name: "",
  phone: "",
  email: "",
  city: "",
};
export const ProviderForm = ({ providerData, onSubmit }) => {
  const [provider, setProvider] = useState(() => providerData ?? initialProvider);
  const [validated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProvider((prev) => ({ ...prev, [name]: value }));
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
      await onSubmit({ ...provider });
    } catch (error) {
      console.error(error);
      toast.error("No se pudo guardar el proveedor");
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
          value={provider.name}
          onChange={handleChange}
        />
        <div className="invalid-feedback">El nombre es obligatorio</div>
      </div>
      <div className="col-md-6">
        <label htmlFor="phone" className="form-label">
          Teléfono
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          className="form-control"
          required
          value={provider.phone}
          onChange={handleChange}
        />
        <div className="invalid-feedback">El teléfono es obligatorio</div>
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
          value={provider.email}
          onChange={handleChange}
        />
        <div className="invalid-feedback">Ingrese un correo válido</div>
      </div>
      <div className="col-md-6">
        <label htmlFor="city" className="form-label">
          Ciudad
        </label>
        <input
          type="text"
          name="city"
          id="city"
          className="form-control"
          required
          value={provider.city}
          onChange={handleChange}
        />
        <div className="invalid-feedback">La ciudad es obligatoria</div>
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
