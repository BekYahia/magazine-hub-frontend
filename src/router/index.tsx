import { createBrowserRouter } from "react-router-dom"
// pages
import BaseLayout from "@/components/layout/BaseLayout";
import Home from "@/pages/Home";
import Users from "@/pages/Users";

export const router = createBrowserRouter([

	{
		path: '/',
		element: <BaseLayout/>,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: 'users',
				element: <Users />,
			},
		],
	},
	
])