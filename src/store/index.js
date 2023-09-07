import { createStore } from "vuex";

export default createStore({
  state: {
    user: {
      isLoggedIn: false,
      name: "",
      avatar: "",
      email: "",
    },
    carts: [],
  },
  getters: {
    getLoggedIn(state) {
      return state.user.isLoggedIn;
    },
    getUser(state) {
      return state.user;
    },
    getTotal(state) {
      return 0;
      // return state.carts.reduce((acc, cur) => cur.price + acc, 0);
    },
  },
  mutations: {
    setLoggedIn(state, data) {
      state.user = data;
    },
    setLogout(state) {
      const defaultUser = {
        isLoggedIn: false,
        name: "",
        avatar: "",
        email: "",
      };
      state.user = defaultUser;
      state.carts = [];
      localStorage.setItem("token", "");
      localStorage.setItem("user", JSON.stringify(defaultUser));
      localStorage.setItem("cartList", JSON.stringify([]));
    },
    setCarts(state, data) {
      state.carts = data;
      localStorage.setItem("cartList", JSON.stringify(data));
    },
  },
  actions: {},
  modules: {},
});
