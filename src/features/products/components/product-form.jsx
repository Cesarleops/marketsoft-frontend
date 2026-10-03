import { useEffect, useState } from "react";
import { getProviders } from "../../providers/api";
import { toast } from "react-toastify";

const initialProduct = {
  name: "",
  price: "",
  description: "",
  stock: "",
  providerId: "",
};
export const ProductForm = ({ productData, onSubmit }) => {
  const [product, setProduct] = useState(() => productData ?? initialProduct);
  const [providers, setProviders] = useState([]);
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
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
      await onSubmit({
        ...product,
        price: Number(product.price),
        stock: Number(product.stock),
      });
    } catch (error) {
      console.error(error);
      toast.error("No se pudo guardar el producto");
    }
  };

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const providers = await getProviders();
        setProviders(providers);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProviders();
  }, []);
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={"row g-3" + (validated ? " was-validated" : "")}
    >
      <div className="col-12">
        <label htmlFor="name" className="form-label">
          Nombre
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="form-control"
          required
          value={product.name}
          onChange={handleChange}
        />
        <div className="invalid-feedback">El nombre es obligatorio</div>
      </div>
      <div className="col-12">
        <label htmlFor="description" className="form-label">
          Descripción
        </label>
        <textarea
          name="description"
          id="description"
          className="form-control"
          rows={3}
          required
          value={product.description}
          onChange={handleChange}
        />
        <div className="invalid-feedback">La descripción es obligatoria</div>
      </div>
      <div className="col-md-6">
        <label htmlFor="price" className="form-label">
          Precio
        </label>
        <input
          type="number"
          name="price"
          id="price"
          className="form-control"
          min="0.01"
          step="0.01"
          required
          value={product.price}
          onChange={handleChange}
        />
        <div className="invalid-feedback">El precio debe ser mayor a 0</div>
      </div>
      <div className="col-md-6">
        <label htmlFor="stock" className="form-label">
          Stock
        </label>
        <input
          type="number"
          name="stock"
          id="stock"
          className="form-control"
          min="1"
          required
          value={product.stock}
          onChange={handleChange}
        />
        <div className="invalid-feedback">El stock debe ser mayor a 0</div>
      </div>
      <div className="col-12">
        <label htmlFor="provider" className="form-label">
          Proveedor
        </label>
        <select
          name="providerId"
          id="provider"
          className="form-select"
          required
          value={product.providerId}
          onChange={handleChange}
        >
          <option value="" disabled>
            Seleccione un proveedor
          </option>
          {providers.map((provider) => (
            <option key={provider.id} value={provider.id}>
              {provider.name}
            </option>
          ))}
        </select>
        <div className="invalid-feedback">Debe seleccionar un proveedor</div>
      </div>
      <div className="col-12">
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
      </div>
    </form>
  );
};
