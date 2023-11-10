import { useDispatch, useSelector } from "react-redux";
import { deletePedidos, pedidos } from "../redux/slice";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';


// eslint-disable-next-line react/prop-types
const AdminPedidos = ({ email }) => {
  const dispatch = useDispatch();
  const pedidosData = useSelector(state => state.user.pedidos);
  const [localPedidosData, setLocalPedidosData] = useState([]);

  useEffect(() => {
    if (email) {
      dispatch(pedidos(email))
        .then((data) => {
          if (data.payload.length > 0) {
            setLocalPedidosData(data.payload);
          } else {
            console.log("No hay pedidos disponibles.");
          }
        })
        .catch((error) => {
          console.log("error", error.message);
        });
    }
  }, [dispatch, email]);

  const handleDeletePedido = (email, id) => {
    if (email, id) {
      dispatch(deletePedidos({ email, id }))
        .then(() => {
          // Actualiza el estado local después de que la acción deletePedidos se complete
          dispatch(pedidos(email))
            .then((data) => {
              if (data.payload.length > 0) {
                setLocalPedidosData(data.payload);
              } else {
                console.log("No hay pedidos disponibles.");
              }
            })
            .catch((error) => {
              console.log("error", error.message);
            });
        })
        .catch((error) => {
          console.log("error", error.message);
        });
    }
  };

  return email ? (
    <div className="card" style={{ width: "40rem", border: "3px solid black" }}>
      <div className="card-body">
        <h2 className="primary alert-primary" role="primary" style={{ color: 'blue' }}>PEDIDOS DE {email}</h2>
        {localPedidosData && localPedidosData.length > 0 ? (
          localPedidosData.map((pedido, index) => (
            <div className="card" key={index}>
              <h3 className="card-title"><strong>Pedido ID: </strong>{pedido.id}</h3>
              <h4 className="card-text"><strong>Nombre del pedido: </strong>{pedido.nombre_pedido}</h4>
              <h4 className="card-text"><strong>Estado: </strong>{pedido.estado}</h4>
              <Button variant="danger" onClick={() => handleDeletePedido(email, pedido.id)}>
                Eliminar
              </Button>
            </div>
          ))
        ) : (
          <h1>No hay más pedidos cargados</h1>
        )}
      </div>
      <Link className="text-center" to="/home">
        <h3 className="display-8" style={{margin:"1.5rem"}}>Volver atrás</h3>
      </Link>
    </div>
  ) : (
    <p>Cargando...</p>
  );
};

export default AdminPedidos;
