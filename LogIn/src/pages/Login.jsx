import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Importa useDispatch
import LoginButton from "../components/Auth0login";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../components/Logout";
import { loginUsers } from "../redux/slice"; // Asegúrate de importar la acción correctamente
import Pedido from '../components/Pedido'

const Login = () => {
  const { user: auth0User, isAuthenticated, isLoading } = useAuth0();
  const dispatch = useDispatch(); 

  useEffect(() => {
    console.log("El componente se montó");
    if (isAuthenticated) {
      console.log(auth0User)
      dispatch(loginUsers({
        username: auth0User?.nickname,
        email: auth0User?.email // Envia el nickname a través de la acción
      }));
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
  return (
    isAuthenticated && (
      <div>
        <img src={auth0User.picture} alt={auth0User.name} />
        <h2>{auth0User.name}</h2>
        <p>{auth0User.email}</p>
        <LogoutButton />
        <Pedido/>
      </div>
    )
  );
};

export default Login;
