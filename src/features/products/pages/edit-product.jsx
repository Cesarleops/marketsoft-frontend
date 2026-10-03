import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ProductForm } from "../components/product-form";
import { getProduct, updateProduct } from "../api";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../shared/http-client";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async (data) => {
    try {
      await updateProduct(id, data);
      toast.success("Producto actualizado correctamente");
      navigate("/products");
    } catch (error) {
      toast.error(getErrorMessage(error, "No se pudo actualizar el producto"));
    }
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await getProduct(id);
        setProduct(response);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);
  return (
    <section>
      {isLoading && <div>Cargando</div>}

      {error && <div>{error}</div>}
      {product && <ProductForm productData={product} onSubmit={handleUpdate} />}
    </section>
  );
}
