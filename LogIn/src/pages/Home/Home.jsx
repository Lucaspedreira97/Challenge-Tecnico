import { Link } from 'react-router-dom';
import LogoutButton from "../../components/Logout";
import Pedido from "../../components/Pedido";
import { useAuth0 } from "@auth0/auth0-react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const { user: auth0User, isAuthenticated, isLoading } = useAuth0();

  return (
    <div className="container-fluid">
      <LogoutButton />
      {console.log(auth0User)}
      <h2 className="display-8 text-center">Bienvenido... 
        <small className="display-6 text-muted"><strong> {auth0User?.email}</strong>
        </small>
      </h2>
      <Pedido email={auth0User?.email} />
      <Link className="text-right" to="/AdminPage">
        <h3 className="display-8">Administrar Pedidos
        </h3>
      </Link> 
    </div>
  );
};

export default Home;
