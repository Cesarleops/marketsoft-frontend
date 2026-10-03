import { Link } from "react-router";

export const NavigationList = () => {
  return (
    <>
      <Link to="/users">Usuarios</Link>
      <Link to="/products">Productos</Link>
      <Link to="/sales">Ventas</Link>
      <Link to="/providers">Proveedores</Link>
    </>
  );
};
