# Challenge-Tecnico
Instrucciones de Configuración e Inicialización:

1- Descargar/clonar el repositorio.
2- Abrir el archivo en el editor.
3- Instalar dependencias. La carpeta Challenge-Técnico contiene las carpetas LogIn API (Backend) y LogIn (Frontend). Las dependencias se instalarán haciendo clic derecho en cada carpeta, abriendo terminales separadas y utilizando el comando npm install en ambos casos.
4- Una vez instaladas las dependencias, podremos iniciar el proyecto con el comando npm run dev en el caso del Backend (LogIn API) y npm start en el caso del Frontend (LogIn).
5- Abrir el navegador y visitar la URL http://localhost:3000/, lo que mostrará la aplicación.


Documentación y Tecnologías Implementadas:

Para este proyecto se utilizó del lado del servidor Express.js y Node.js, y del lado del cliente React inicializado con Vite, Redux Toolkit, Auth0 para la autenticación por terceros (Google) y Bootstrap para los estilos.
La idea del proyecto es mostrar una aplicación en la que un usuario pueda iniciar sesión creando un usuario o con su cuenta de Google y se le asignen una serie de pedidos ya predefinidos en la base de datos mock que se alojan en un JSON. El usuario tiene la opción de eliminar pedidos en tiempo real borrándolos de la base de datos en el momento; esto se logra con peticiones desde el cliente al servidor mediante Redux. Además, los estados de React juegan un papel importante para que la aplicación no se desmonte en ningún momento.
Por otro lado, hay un usuario predefinido en la base de datos con el cual se podrá acceder a la aplicación. Como indicaba la consigna, este podrá eliminar en tiempo real los pedidos de cualquier usuario.
Credenciales de Admin:
Email: admin@challengeadmin.com
Contraseña: Admin123456789

Logica utilizada: 

- Mi idea dado el tiempo de realización fue dar prioridad a la logica y funcionalidad de la aplicación y no a los estílos.
- La implemetación de Redux Toolkit está hecha de manera tal que los extraReducers puedan encontrar errores en los 3 estados de una petición (cargando, realizado o rejected).
-  La habilitacíon al administrador está hecha en su mayoria desde el backend para que sea más segura y si la aplicación no fuese solo local se hubiese usado el sistema de Tokes proporcionados por Auth0 y JWT. 
- En cuanto a los componentes de React la idea fue demostrar distintos escenarios posibles utilizando diferentes metodos y hooks para llevar a cabo la tarea pedida, por ejemplo el uso de estados locales, globales e incluso del localStorage del navegador.
- El manejo de errores del Backend no tiene los errores 400, 404, etc. Debido a que no lo concideré necesario ya que es una aplicación de prueba que utiliza una base de datos Mock
- Para la interpretación del codigo a la hora de evaluar la prueba estoy dejando comentarios que notifican lo que realiza cada parte de las funciones.