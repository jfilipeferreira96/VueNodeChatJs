<template>
  <section class="login">
    <form @submit.prevent="login">
      <div class="brand">
        <img :src="require('../assets/logo1.png')" />
        <h1>Log in</h1>
      </div>
      <input type="text" v-model="username" placeholder="Username" name="username" min="3" />
      <input type="password" v-model="password" placeholder="Password" name="password" />
      <button type="submit">Log In</button>
      <span>
        Don't have an account ?
        <router-link :to="{ name: 'register' }" replace>Create One.</router-link>
      </span>
    </form>
  </section>
</template>

<script>

export default {
  name: "LoginView",
  components: {},
  data: function () {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      if (this.username != "" && this.password != "") {
        this.$store.dispatch("login", {username: this.username, password: this.password})
          .then((res) => { 
            if (res.status){
              this.$toast.success(`Welcome`);
              //redirect para a página do chat
              this.$router.push({ name: "chat" });
            } else {
              this.$toast.error(res.msg);
            }
          })
      } else {
        this.$toast.error(`Empty fields`);
      }
    },
  },
};
</script>

<style lang="scss">
.login {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .brand {
    display: grid;
    align-items: center;
    gap: 1rem;
    justify-content: center;
  }
  .brand img {
    height: 6rem;
  }
  .brand h1 {
    color: white;
    text-transform: uppercase;
    text-align: center;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
  }
  input:focus {
    border: 0.1rem solid #997af0;
    outline: none;
  }

  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
  }
  button:hover {
    background-color: #4e0eff;
  }
  span {
    color: white;
    text-transform: uppercase;
  }
  span a {
    color: #4e0eff;
    text-decoration: none;
    font-weight: bold;
  }
}
</style>
