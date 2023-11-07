import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "react-redux"; // Importa el Provider de Redux Toolkit
import store from "./redux/store.js"; // Importa tu tienda de Redux

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-yd266ykn0elfjscw.us.auth0.com"
      clientId="Yx3vM2bG3tng4I6HsDY4Pm0Q1NwBh3Eu"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Provider store={store}>
        {" "}
        {/* Agrega el Provider de Redux Toolkit */}
        <App />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
);
