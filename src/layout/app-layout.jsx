import { Outlet } from "react-router";
import { NavigationList } from "../components/navigation-list";

export const AppLayout = () => {
  return (
    <div>
      <header>
        <NavigationList />
      </header>
      <main className="container py-4">
        <Outlet />
      </main>
    </div>
  );
};
