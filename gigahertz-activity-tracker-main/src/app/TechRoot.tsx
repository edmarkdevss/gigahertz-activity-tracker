import { Outlet } from "react-router";
import { TechNavigation } from "./components/TechNavigation";
import { TechFooter } from "./components/TechFooter";

export function TechRoot() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <TechNavigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <TechFooter />
    </div>
  );
}
