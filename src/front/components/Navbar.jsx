import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer()

	const navigate = useNavigate()

	function logout(){
		// limpiar token
		localStorage.removeItem("token")
		//pasar auth a false
		dispatch({type: "set_auth", payload: false})
		//redireccionar a Home
		navigate('/')
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				{ store.auth ? <button className="btn btn-primary" onClick={logout}>Logout</button> : null }
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};