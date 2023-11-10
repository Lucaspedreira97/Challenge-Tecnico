import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginButton from "../components/Auth0login";
import { useAuth0 } from "@auth0/auth0-react";
import { loginUsers } from "../redux/slice";
import { Navigate } from "react-router-dom"; // Importa Navigate

const Login = () => {
  const { user: auth0User, isAuthenticated, isLoading } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("El componente se montó");
    if (isAuthenticated) {
      console.log(auth0User);
      dispatch(
        loginUsers({
          username: auth0User?.nickname,
          email: auth0User?.email,
        })
        );
        localStorage.setItem('userEmail', auth0User.email);
    }
    return () => {
      console.log("El componente se desmontó");
    };
  }, [auth0User, dispatch, isAuthenticated]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div>
        <div>
          <LoginButton />
        </div>
      </div>
    );
  }

  // Redirige al usuario a la página Home si está autenticado
  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }
};

export default Login;
