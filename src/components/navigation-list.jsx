import { NavLink } from "react-router";

const links = [
  { to: "/users", label: "Usuarios" },
  { to: "/products", label: "Productos" },
  { to: "/sales", label: "Ventas" },
  { to: "/providers", label: "Proveedores" },
];

export const NavigationList = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/products">
          MarketSoft
        </NavLink>
        <ul className="navbar-nav d-flex flex-row gap-3">
          {links.map((link) => (
            <li className="nav-item" key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active fw-bold" : "")
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
