import { createBrowserRouter } from "react-router";
import { TechRoot } from "./TechRoot";
import { TechHome } from "./pages/TechHome";
import { Products } from "./pages/Products";
import { Gaming } from "./pages/Gaming";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: TechRoot,
    children: [
      { index: true, Component: TechHome },
      { path: "products", Component: Products },
      { path: "gaming", Component: Gaming },
      { path: "support", Component: TechHome },
      { path: "about", Component: TechHome },
    ],
  },
]);
