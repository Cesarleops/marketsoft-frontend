import { NavigationList } from "../components/navigation-list";

export default function Home() {
  return (
    <section>
      <NavigationList />

      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center p-5">
          <h1 className="fw-bold mb-3">Marketsoft</h1>

          <p className="text-secondary mb-0">
            Nuestro software te permite gestionar usuarios, proveedores,
            productos y ventas.
          </p>
        </div>
      </div>
    </section>
  );
}
