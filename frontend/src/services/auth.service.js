import { loginRoute, registerRoute, setAvatarRoute } from "./config.js";

export const authService = {
  async login(username, password) {
    console.log("entrei");
    const response = await fetch(loginRoute, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  },

  async register(username, email, password) {
    const response = await fetch(registerRoute, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  },

  async setAvatar(id, avatar) {
    const response = await fetch(setAvatarRoute + '/' + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({image: avatar}),
    });
    const data = await response.json();
    console.log(data);
    return data;
  },

};

export default authService;
