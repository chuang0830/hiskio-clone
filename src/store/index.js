// import * as $api from '@/library/api'
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
    getCarts(state) {
      return state.carts;
    },
    getTotal(state) {
      return state.carts.reduce((acc, cur) => cur.price + acc, 0);
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
      };
      state.user = defaultUser;
      localStorage.setItem("token", "");
    },
    setCarts(state, data) {
      state.carts = data;
    },
  },
  actions: {},
  modules: {},
});
