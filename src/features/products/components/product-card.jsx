import { Link } from "react-router";
import { deleteProduct } from "../api";

export const ProductCard = ({ product, onDelete }) => {

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      onDelete(productId);
    } catch (error) {
      
    }
  };
  
  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <Link to={`edit/${product.id}`}>
        <button>Editar</button>
      </Link>
      <button onClick={() => handleDelete(product.id)}>Eliminar</button>
    </div>
  );
};
