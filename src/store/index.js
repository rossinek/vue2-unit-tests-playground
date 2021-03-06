import Vue from "vue";
import Vuex from "vuex";

import * as authApi from "@/api/auth";
import { removeAuthHeader, setAuthHeader } from "@/api/client";

const TOKEN_STORAGE_KEY = "auth-token";
const USER_STORAGE_KEY = "user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    authToken: null,
  },
  getters: {
    isLoggedIn: (state) => !!state.authToken,
  },
  mutations: {
    setUserData(state, { authToken, user }) {
      state.authToken = authToken;
      state.userData = user;
      localStorage.setItem(TOKEN_STORAGE_KEY, authToken);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    },
    resetUserData(state) {
      state.authToken = null;
      state.userData = null;
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
    },
  },
  actions: {
    async login({ commit, dispatch, getters }, credentials) {
      if (getters.isLoggedIn) await dispatch("logout");
      const response = await authApi.login(credentials);
      const authHeader = response.headers.authorization;
      const authToken = authHeader.slice("Bearer ".length);
      setAuthHeader(authHeader);
      commit("setUserData", { authToken, user: response.data });
    },
    async register({ commit, dispatch, getters }, credentials) {
      if (getters.isLoggedIn) await dispatch("logout");
      const response = await authApi.register(credentials);
      const authHeader = response.headers.authorization;
      const authToken = authHeader.slice("Bearer ".length);
      setAuthHeader(authHeader);
      commit("setUserData", { authToken, user: response.data });
    },
    async logout({ commit, getters }) {
      if (!getters.isLoggedIn) return;
      // TODO: logout from API
      commit("resetUserData");
      removeAuthHeader();
    },
    restoreUserData({ commit }) {
      try {
        const authToken = localStorage.getItem(TOKEN_STORAGE_KEY);
        const user = JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || null);
        if (authToken && user) {
          setAuthHeader(`Bearer ${authToken}`);
          commit("setUserData", { authToken, user });
        }
      } catch {
        // ignore error
      }
    },
  },
  modules: {},
});
