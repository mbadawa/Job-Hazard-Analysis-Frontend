import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./css/main.css";
// Importing routes for pages
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import NewJHA from "./pages/NewJHA";

const router = createBrowserRouter([
	{
		path: "/dashboard",
		element: <Dashboard />,
	},
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/create_JHA",
		element: <NewJHA />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
