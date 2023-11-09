const fs = require("fs");
const jsonFilePath = "./json/usuarios.json"; // Ajusta la ruta a tu archivo JSON
// const usuarios = require('../json/usuarios.json')

const generateUniqueId = (() => {
  let id = 0;
  return () => id++ + Math.random().toString(36).substr(2);
})();

const login = async (req, res) => {
  const { username, email } = req.body;
  try {
    console.log("Recibidos desde el cliente:", username);
    let users = JSON.parse(fs.readFileSync(jsonFilePath)); // Lee los datos actuales del archivo JSON

    // Verifica si el usuario ya existe
    const existingUser = users.find((user) => user.nombre_usuario === username);

    if (existingUser) {
      console.log("El usuario ya existe.");
      // En lugar de enviar un mensaje, envía el usuario existente
      await res.send(existingUser);
    } else {
      // Si el usuario no existe, lo agrega al array de usuarios
      users.push({
        id: generateUniqueId(),
        nombre_usuario: username,
        email,
        admin: false,
        pedidos: [
          {
            id:  generateUniqueId(),
            nombre_pedido: "Turbo",
            estado: "pendiente",
          },
          {
            id:  generateUniqueId(),
            nombre_pedido: "Radiador",
            estado: "entregado",
          },
          {
            id:  generateUniqueId(),
            nombre_pedido: "Cubierta",
            estado: "cancelado",
          },
          {
            id:  generateUniqueId(),
            nombre_pedido: "Tapa de Leva",
            estado: "entregado",
          },
        ],
      });

      // Escribe los datos actualizados en el archivo JSON
      fs.writeFileSync(jsonFilePath, JSON.stringify(users, null, 2));

      console.log("Usuarios actualizados:", users);
      await res.send(users);
    }
  } catch (error) {
    console.error("Error en la función 'login':", error);
    // Maneja errores aquí
  }
};

const getPedidos = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email, "back username pedidos");
    const users = JSON.parse(fs.readFileSync(jsonFilePath)); // Lee los datos actuales del archivo JSON

    // Busca al usuario en el array de usuarios
    const user = users.find((user) => user.email === email);

    if (user) {
      console.log(user.pedidos.length, "aca pedidos");
      // Si el usuario existe, verifica si tiene pedidos
      if (user.pedidos.length === 0) {
        // Si el usuario no tiene pedidos, devuelve un mensaje indicando que no tiene pedidos
        await res.send({ message: "El usuario no tiene pedidos." });
      } else {
        // Si el usuario tiene pedidos, devuelve sus pedidos
        await res.send(user.pedidos);
      }
    } else {
      // Si el usuario no existe, devuelve un mensaje de error
      await res.send({ message: "El usuario no existe." });
    }
  } catch (error) {
    console.error("Error en la función 'getPedidos':", error);
    // Maneja errores aquí
  }
};

module.exports = { login, getPedidos };
