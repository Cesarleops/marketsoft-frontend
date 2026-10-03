import { createProduct } from "../api";
import { ProductForm } from "../components/product-form";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../shared/http-client";

export default function CreateProduct() {
  const handleCreate = async (product) => {
    try {
      await createProduct(product);
      toast.success("Producto creado correctamente");
    } catch (error) {
      toast.error(getErrorMessage(error, "No se pudo crear el producto"));
    }
  };
  return (
    <section>
      <ProductForm productData={null} onSubmit={handleCreate} />
    </section>
  );
}
