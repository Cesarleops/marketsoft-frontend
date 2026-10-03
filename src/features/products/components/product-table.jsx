import { Link } from "react-router";
import { deleteProduct } from "../api";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../shared/http-client";

export const ProductTable = ({ products, onDelete }) => {
  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      onDelete(productId);
    } catch (error) {
      toast.error(getErrorMessage(error, "No se pudo eliminar el producto"));
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Descripción</th>
            <th scope="col">Precio</th>
            <th scope="col">Stock</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center text-body-secondary">
                No hay productos
              </td>
            </tr>
          )}
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td className="text-body-secondary">{product.description}</td>
              <td>${Number(product.price).toFixed(2)}</td>
              <td>{product.stock}</td>
              <td>
                <div className="d-flex gap-2">
                  <Link
                    to={`edit/${product.id}`}
                    className="btn btn-outline-primary btn-sm"
                  >
                    Editar
                  </Link>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(product.id)}
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
