import './App.scss'
import { RouterProvider } from 'react-router'
import { router } from './router'
import { AppDispatch, authActions } from './store'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

function App() {

	//check if user has a valid token in local storage to maintain persistent login
	const dispatch = useDispatch<AppDispatch>()
	const [validAuthCheck, setValidAuthCHeck] = useState(false)
	dispatch(authActions.check_auth())
	.then(res => {
		if('error' in res) return;
		setValidAuthCHeck(true)
	})

	//don't render anything until check_auth is done
	if(validAuthCheck) return <RouterProvider router={router} />	
	return;
}

export default App