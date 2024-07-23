import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DeviceInfoTable } from "./components/DeviceInfoTable.tsx";
import { DeviceList } from "./components/DeviceList.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/device",
    element: <DeviceList />,
  },
  {
    path: "device/:deviceId",
    element: <DeviceInfoTable />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
