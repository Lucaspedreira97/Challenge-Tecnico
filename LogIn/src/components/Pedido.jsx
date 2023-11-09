import { useDispatch, useSelector } from "react-redux";
import { pedidos } from "../redux/slice";
import { useEffect, useState } from "react";

const Pedido = () => {
  const userData = useSelector((state) => state.user.user);
  const dispatch = useDispatch()
  const [pedidosData, setPedidosData] = useState([])

  useEffect(() => {
    if (userData) {
      dispatch(pedidos(userData.email))
        .then((data) => {
          setPedidosData(data.payload);
        })
        .catch((error) => {
          console.log("error", error.message);
        });
    }
  }, [dispatch, userData]);

  

  return (
    userData ? (
      <div>
        {console.log(pedidosData, "data de pedidos")}
        <h1>Pedidos de {userData.nombre_usuario}</h1>
        {userData.pedidos && userData.pedidos.map((pedido, index) => (
          <div key={index}>
            <h3>Pedido ID: {pedido.id}</h3>
            <p>Nombre del pedido: {pedido.nombre_pedido}</p>
            <p>Estado: {pedido.estado}</p>
          </div>
        ))}
      </div>
    ) : (
      <p>Cargando...</p>
    )
  );
 };
 export default Pedido
 
 
 
