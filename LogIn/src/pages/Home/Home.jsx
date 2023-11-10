import { Link } from "react-router-dom";
import LogoutButton from "../../components/Logout";
import Pedido from "../../components/Pedido";
import { useAuth0 } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const { user: auth0User, isAuthenticated, isLoading } = useAuth0();

  const logoutButtonStyle = {
    position: "fixed",
    bottom: "10px",
    right: "10px",
  };

  return (
    <div className="container-fluid">
      <h3 className="display-8 text-center">
        Bienvenido..
        <p className="display-6 text-muted">
          <strong>
            {" "}
            {auth0User?.given_name &&
              auth0User.given_name.charAt(0).toUpperCase() +
                auth0User.given_name.slice(1).toLowerCase()}
          </strong>
        </p>
      </h3>
      <Pedido email={auth0User?.email} />
      <Link className="text-right" to="/AdminPage">
        <h3 className="display-8" style={{margin:"1.5rem"}}>Administrar Pedidos</h3>
      </Link>
      <LogoutButton style={logoutButtonStyle} />
    </div>
  );
};

export default Home;
