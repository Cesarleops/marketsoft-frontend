import { Link } from "react-router";

export const SaleTable = ({ sales }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle">
        <thead>
          <tr>
            <th scope="col">Fecha</th>
            <th scope="col">Vendedor</th>
            <th scope="col">Productos</th>
            <th scope="col">Total</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sales.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center text-body-secondary">
                No hay ventas
              </td>
            </tr>
          )}
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td className="text-nowrap">
                {new Date(sale.date).toLocaleString()}
              </td>
              <td>{sale.User?.name}</td>
              <td>
                <ul className="list-unstyled mb-0 small">
                  {sale.SaleDetails?.map((detail) => (
                    <li key={detail.id}>
                      {detail.Product?.name} × {detail.quantity}
                    </li>
                  ))}
                </ul>
              </td>
              <td>${Number(sale.total).toFixed(2)}</td>
              <td>
                <Link
                  to={`edit/${sale.id}`}
                  className="btn btn-outline-primary btn-sm"
                >
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
