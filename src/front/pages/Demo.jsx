// Import necessary components from react-router-dom and other parts of the application.
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { Navigate } from "react-router-dom";

export const Demo = () => {

  console.log('se cargo demo')
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()

  return (
    <div className="container">
      { store.auth ? 
      <>
        <h1>PRIVADO</h1>
      </>
      : <Navigate to='/' /> }
    </div>
  );
};
