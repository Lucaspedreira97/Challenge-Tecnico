import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  error: "",
  user: {
    id: null,
    nombre_usuario: null,
    email: null,
    admin: false,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(loginUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          ...state.user,
          ...action.payload.user,
          id: action.payload.id,
          nombre_usuario: action.payload.nombre_usuario,
          admin: action.payload.admin,
          email: action.payload.email,
          pedidos: action.payload.pedidos ? action.payload.pedidos : [], // Asegura que 'pedidos' exista antes de acceder a sus propiedades
        };
        console.log(action.payload.nombre_usuario);
      })
      .addCase(loginUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.requestStatus;
      })
      .addCase(pedidos.pending, (state) => {
        state.loadingPedidos = true;
      })
      .addCase(pedidos.fulfilled, (state, action) => {
        state.loadingPedidos = false;
        state.pedidos = action.payload;
      })
      .addCase(pedidos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.requestStatus;
      })
      .addCase(deletePedidos.pending, (state) => {
        state.loadingPedidos = true;
      })
      .addCase(deletePedidos.fulfilled, (state, action) => {
        state.loadingPedidos = false;
        state.pedidos = action.payload;
      })
      .addCase(deletePedidos.rejected, (state, action) => {
        state.loadingPedidos = false;
        state.errorPedidos = action.error.message;
      }),
});

//Define una acción asincrónica
export const loginUsers = createAsyncThunk(
  "user/login",
  async ({ username, email }) => {
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
        }),
      });

      console.log(response, "aca response");
      return await response.json();
    } catch (error) {
      console.log("error:", error.message);
    }
  }
);

export const pedidos = createAsyncThunk("pedido/getPedidos", async (email) => {
  try {
    const response = await fetch("http://localhost:3001/getPedidos", {
      method: "POST", // Cambia el método a POST
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }), // Envía el correo electrónico en el cuerpo
    });
    return await response.json();
  } catch (error) {
    console.log("error", error.message);
  }
});

export const deletePedidos = createAsyncThunk(
  "pedidos/deletePedidos",
  async ({ email, id }) => {
    try {
      const response = await fetch("http://localhost:3001/deletePedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, id }), // Envía el correo electrónico en el cuerpo
      });
      return await response.json();
    } catch (error) {
      console.log("error", error.message);
    }
  }
);

export default userSlice;
