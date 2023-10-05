import { createBrowserRouter } from "react-router-dom"
// pages
import BaseLayout from "@/components/layout/BaseLayout";
import Home from "@/pages/Home";
import Users from "@/pages/Users";
import Magazines from "@/pages/Magazines";
import Subscriptions from "@/pages/Subscriptions";
import Login from "@/pages/Login";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export const router = createBrowserRouter([
	{
		path: '/login',
		element: <PublicRoute><Login /></PublicRoute>,
	},
	{
		path: '/',
		element: <BaseLayout/>,
		children: [
			{
				index: true,
				element: <PrivateRoute><Home /></PrivateRoute>,
			},
			{
				path: 'users',
				element: <PrivateRoute><Users /></PrivateRoute>,
			},
			{
				path: 'magazines',
				element: <PrivateRoute><Magazines /></PrivateRoute>,
			},
			{
				path: 'subscriptions',
				element: <PrivateRoute><Subscriptions /></PrivateRoute>,
			}
		],
	},
	
])