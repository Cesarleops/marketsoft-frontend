import { useEffect, useState } from "react";
import { getUsers } from "../../users/api";
import { getProducts } from "../../products/api";
import { toast } from "react-toastify";

const emptyItem = () => ({ productId: "", quantity: "" });

export const SaleForm = ({ onSubmit }) => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState("");
  const [items, setItems] = useState(() => [emptyItem()]);
  const [validated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUsersAndProducts = async () => {
      try {
        const [users, products] = await Promise.all([
          getUsers(),
          getProducts(),
        ]);
        setUsers(users);
        setProducts(products);
      } catch (error) {
        console.error(error);
        toast.error("No se pudieron cargar usuarios y productos");
      }
    };
    fetchUsersAndProducts();
  }, []);

  const productsById = new Map(
    products.map((product) => [product.id, product]),
  );

  const handleItemChange = (index) => (e) => {
    const { name, value } = e.target;
    setItems((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, [name]: value } : item,
      ),
    );
  };

  const addItem = () => setItems((prev) => [...prev, emptyItem()]);

  const removeItem = (index) =>
    setItems((prev) => prev.filter((_, i) => i !== index));

  const total = items.reduce((acc, item) => {
    const product = productsById.get(item.productId);
    if (!product) return acc;
    return acc + Number(product.price) * Number(item.quantity || 0);
  }, 0);

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
      await onSubmit({
        userId,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: Number(item.quantity),
        })),
      });
    } catch (error) {
      console.error(error);
      toast.error("No se pudo guardar la venta");
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
      <div className="col-12">
        <label htmlFor="userId" className="form-label">
          Vendedor
        </label>
        <select
          name="userId"
          id="userId"
          className="form-select"
          required
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value="" disabled>
            Seleccione un vendedor
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <div className="invalid-feedback">Debe seleccionar un vendedor</div>
      </div>
      {items.map((item, index) => {
        const selectedProduct = productsById.get(item.productId);
        const productsInOtherRows = new Set(
          items
            .filter((_, i) => i !== index)
            .map((otherItem) => otherItem.productId),
        );
        return (
          <div className="col-12" key={index}>
            <div className="row g-2 align-items-end border rounded p-2">
              <div className="col-md-6">
                <label htmlFor={`productId-${index}`} className="form-label">
                  Producto
                </label>
                <select
                  name="productId"
                  id={`productId-${index}`}
                  className="form-select"
                  required
                  value={item.productId}
                  onChange={handleItemChange(index)}
                >
                  <option value="" disabled>
                    Seleccione un producto
                  </option>
                  {products.map((product) => (
                    <option
                      key={product.id}
                      value={product.id}
                      disabled={
                        product.stock < 1 || productsInOtherRows.has(product.id)
                      }
                    >
                      {product.name} — ${product.price} ({product.stock}{" "}
                      disponibles)
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">
                  Debe seleccionar un producto
                </div>
              </div>
              <div className="col-md-4">
                <label htmlFor={`quantity-${index}`} className="form-label">
                  Cantidad
                </label>
                <input
                  type="number"
                  name="quantity"
                  id={`quantity-${index}`}
                  className="form-control"
                  min="1"
                  max={selectedProduct ? selectedProduct.stock : undefined}
                  required
                  value={item.quantity}
                  onChange={handleItemChange(index)}
                />
                <div className="invalid-feedback">
                  La cantidad debe ser mayor a 0 y no exceder el stock
                </div>
              </div>
              <div className="col-md-2">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => removeItem(index)}
                  disabled={items.length === 1}
                >
                  Quitar
                </button>
              </div>
            </div>
          </div>
        );
      })}
      <div className="col-12">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={addItem}
        >
          Agregar producto
        </button>
      </div>
      <div className="col-12">
        <p className="h5 mb-0">Total: ${total.toFixed(2)}</p>
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
