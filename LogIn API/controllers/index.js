const fs = require("fs");
const jsonFilePath = "./json/usuarios.json"; // Ajusta la ruta a tu archivo JSON
// const usuarios = require('../json/usuarios.json')

const generateUniqueId = (() => {
  let id = 0;
  return () => id++ + Math.random().toString(36).substr(2);
})();
//Login crea en DB mediante File System los usuarios que se logean con Auth0 y les añade pedidos predefinidos
const login = async (req, res) => {
  const { username, email } = req.body;
  try {
    console.log("Recibidos desde el cliente:", username);
    let users = JSON.parse(fs.readFileSync(jsonFilePath)); // Lee los datos actuales del archivo JSON

    // Verifica si el usuario ya existe
    const existingUser = users.find((user) => user.nombre_usuario === username);

    if (existingUser) {
      console.log("El usuario ya existe.");
      // Verifica si el usuario es administrador
      if (existingUser.admin) {
        // Si el usuario es administrador, envía todos los pedidos
        const allPedidos = users.flatMap((user) => user.pedidos);
        existingUser.pedidos = allPedidos; // Asigna todos los pedidos al usuario administrador
        await res.send(existingUser);
      } else {
        // Si el usuario no es administrador, envía el usuario existente
        await res.send(existingUser);
      }
    } else {
      // Si el usuario no existe, lo agrega al array de usuarios
      users.push({
        id: generateUniqueId(),
        nombre_usuario: username,
        email,
        admin: false,
        pedidos: [
          {
            id: generateUniqueId(),
            nombre_pedido: "Turbo",
            estado: "pendiente",
          },
          {
            id: generateUniqueId(),
            nombre_pedido: "Radiador",
            estado: "entregado",
          },
          {
            id: generateUniqueId(),
            nombre_pedido: "Cubierta",
            estado: "cancelado",
          },
          {
            id: generateUniqueId(),
            nombre_pedido: "Tapa de Leva",
            estado: "entregado",
          },
        ],
      });
      fs.writeFileSync(jsonFilePath, JSON.stringify(users, null, 2), "utf8");
      await res.send(existingUser);
    }
  } catch (error) {
    console.error("Ocurrió un error:", error);
    res.status(500).send("Ocurrió un error al iniciar sesión.");
  }
};

//getPedidos consume los pedidos creados anteriormente
const getPedidos = async (req, res) => {
  try {
    const { email } = req.body;
    const users = JSON.parse(fs.readFileSync(jsonFilePath)); // Lee los datos actuales del archivo JSON

    // Busca al usuario en el array de usuarios
    const user = users.find((user) => user.email === email);

    if (user) {
      // Si el usuario existe, verifica si es administrador
      if (user.admin) {
        // Si el usuario es administrador, devuelve todos los pedidos
        const allPedidos = users.flatMap((user) => user.pedidos);
        await res.send(allPedidos);
      } else {
        // Si el usuario no es administrador y tiene pedidos, devuelve sus pedidos
        if (user.pedidos.length > 0) {
          await res.send(user.pedidos);
        } else {
          // Si el usuario no es administrador y no tiene pedidos, devuelve un mensaje indicando que no tiene pedidos
          await res.send({ message: "El usuario no tiene pedidos." });
        }
      }
    } else {
      // Si el usuario no existe, devuelve un mensaje de error
      await res.send({ message: "El usuario no existe." });
    }
  } catch (error) {
    console.error("Error en la función 'getPedidos':", error);
  }
};

//deletePedidos busca por id de pedido  y email al usuario y permite eliminar de DB el pedido seleccionado
const deletePedido = async (req, res) => {
  try {
    const { email, id } = req.body;

    console.log(email, id, "back username delete pedidos");
    let users = JSON.parse(fs.readFileSync(jsonFilePath)); // Lee los datos actuales del archivo JSON

    // Busca al usuario en el array de usuarios
    const user = users.find((user) => user.email === email);

    if (user) {
      // Si el usuario existe, verifica si es administrador
      if (user.admin) {
        // Si el usuario es administrador, busca el pedido en el array de pedidos de todos los usuarios
        const userWithPedido = users.find((user) =>
          user.pedidos.find((pedido) => pedido.id === id)
        );
        if (userWithPedido) {
          const pedidoIndex = userWithPedido.pedidos.findIndex(
            (pedido) => pedido.id === id
          );
          if (pedidoIndex !== -1) {
            // Si el pedido existe, lo elimina del array de pedidos del usuario
            userWithPedido.pedidos.splice(pedidoIndex, 1);

            // Guarda los datos actualizados en el archivo JSON
            fs.writeFileSync(jsonFilePath, JSON.stringify(users));

            // Devuelve un mensaje indicando que el pedido se eliminó correctamente
            await res.send({ message: "El pedido se eliminó correctamente." });
          } else {
            // Si el pedido no existe, devuelve un mensaje de error
            await res.send({ message: "El pedido no existe." });
          }
        }
      } else {
        // Si el usuario no es administrador, busca el pedido en el array de pedidos del usuario
        const pedidoIndex = user.pedidos.findIndex(
          (pedido) => pedido.id === id
        );

        if (pedidoIndex !== -1) {
          // Si el pedido existe, lo elimina del array de pedidos del usuario
          user.pedidos.splice(pedidoIndex, 1);

          // Guarda los datos actualizados en el archivo JSON
          fs.writeFileSync(jsonFilePath, JSON.stringify(users));

          // Devuelve un mensaje indicando que el pedido se eliminó correctamente
          await res.send({ message: "El pedido se eliminó correctamente." });
        } else {
          // Si el pedido no existe, devuelve un mensaje de error
          await res.send({ message: "El pedido no existe." });
        }
      }
    } else {
      // Si el usuario no existe, devuelve un mensaje de error
      await res.send({ message: "El usuario no existe." });
    }
  } catch (error) {
    console.error("Error en la función 'deletePedido':", error);
  }
};

module.exports = { login, getPedidos, deletePedido };
