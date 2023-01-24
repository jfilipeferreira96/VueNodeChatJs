import { createStore } from "vuex";
import { authService } from "../services/auth.service";

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem(process.env.VUE_APP_LOCALHOSTKEY)) ? JSON.parse(localStorage.getItem(process.env.VUE_APP_LOCALHOSTKEY)) : {},
    pendingMessage: {},
  },
  getters: {
    getPendingMessage: (state) => {
      return state.pendingMessage;
    },
  },
  mutations: {
    LOGIN_USER(state, payload) {
      state.user = payload;
      localStorage.setItem(process.env.VUE_APP_LOCALHOSTKEY, JSON.stringify(state.user));
    },
    REGISTER_USER(state, payload) {
      state.user = payload;
      localStorage.setItem(process.env.VUE_APP_LOCALHOSTKEY, JSON.stringify(state.user));
    },
    SET_AVATAR(state, payload) {
      state.user.avatarImage = payload;
      state.user.isAvatarImageSet = true;
      localStorage.setItem(process.env.VUE_APP_LOCALHOSTKEY, JSON.stringify(state.user));
    },
    LOGOUT(state, payload) {
      state.user = {};
      localStorage.setItem(process.env.VUE_APP_LOCALHOSTKEY, null);
    },
    SET_USER(state, payload) {
      state.user = payload;
    },
    SET_RECIVIED_MESSAGE(state, payload) {
      state.lastMessage = payload;
    },
  },
  actions: {
    async login(context, payload) {
      const data = await authService.login(payload.username, payload.password);
      if (data.status) {
        context.commit("LOGIN_USER", data.user);
      }
      return data;
    },
    async register(context, payload) {
      const data = await authService.register(payload.username, payload.email, payload.password);
      if (data.status) {
        context.commit("REGISTER_USER", data.user);
      }
      return data;
    },
    async setAvatar(context, payload) {
      const data = await authService.setAvatar(payload._id, payload.selectedAvatar);
      if (data.isSet) {
        context.commit("SET_AVATAR", data.image);
      }
      return data;
    },
    async logout(context, payload) {
      const data = await authService.logout(payload._id);
      if (data) {
        context.commit("LOGOUT", null);
      }

      return data;
    },
    setUserOnRefresh(context, payload) {
      context.commit("SET_USER", payload);
    },
    updateReciviedMessage(context, payload) {
      context.commit("SET_RECIVIED_MESSAGE", payload);
    },
  },
});
