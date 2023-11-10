import { useDispatch } from "react-redux";
import { pedidos } from "../redux/slice";
import { useEffect, useState } from "react";


// eslint-disable-next-line react/prop-types
const Pedido = ({ email }) => {
  const dispatch = useDispatch();
  const [pedidosData, setPedidosData] = useState([]);
 
  useEffect(() => {
    if (email) {
      dispatch(pedidos(email))
        .then((data) => {
          setPedidosData(data.payload);
        })
        .catch((error) => {
          console.log("error", error.message);
        });
    }
  }, [dispatch, email]);
 
  return email ? (
    <div className="card" style={{ width: "40rem", border: "3px solid black"}}>
      <div className="card-body">
        <h2 className="primary alert-primary" role="primary" style={{ color: 'blue' }}>LISTA DE PEDIDOS</h2>
        {pedidosData?.length > 0 ? (
          pedidosData.map((pedido, index) => (
            <div className="card" key={index}>
              <h4 className="card-text"><strong>Nombre del pedido: </strong>{pedido.nombre_pedido}</h4>
              <h4 className="card-text"><strong>Estado: </strong>{pedido.estado}</h4>
            </div>
          ))
        ) : (
          <h1>No hay pedidos cargados</h1>
        )}
      </div>
    </div>
  ) : (
    <p>Cargando...</p>
  );
 };
 
 export default Pedido;
 