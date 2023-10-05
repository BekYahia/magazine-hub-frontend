import './App.scss'
import { RouterProvider } from 'react-router'
import { router } from './router'
import { AppDispatch, authActions } from './store'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

function App() {

	//check if user has a valid token in local storage to maintain persistent login
	const dispatch = useDispatch<AppDispatch>()

	// const [validAuthCheck, setValidAuthCheck] = useState(false)
	// const auth = useSelector((state: RootState) => state.auth)

	useEffect(() => {
		dispatch(authActions.check_auth())
	}, [])

	//TODO: the flashing when window.reload
	return <RouterProvider router={router} />
}

export default App