import { Link } from "react-router";
import { deleteProduct } from "../api";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../shared/http-client";

export const ProductCard = ({ product, onDelete }) => {
  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      onDelete(productId);
    } catch (error) {
      toast.error(getErrorMessage(error, "No se pudo eliminar el producto"));
    }
  };

  return (
    <div className="col">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title h5">{product.name}</h2>
          <p className="card-text text-body-secondary">
            {product.description}
          </p>
        </div>
        <div className="card-footer bg-white d-flex gap-2">
          <Link to={`edit/${product.id}`} className="btn btn-outline-primary btn-sm">
            Editar
          </Link>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => handleDelete(product.id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};
