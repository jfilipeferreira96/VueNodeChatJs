<template>
  <section>
    <form action="">
      <div className="brand">
        <img :src="require('../assets/logo1.png')" />
        <h1>Register</h1>
      </div>
      <input type="text" placeholder="Username" name="username" />
      <input type="email" placeholder="Email" name="email" />
      <input type="password" placeholder="Password" name="password" />
      <input type="password" placeholder="Confirm Password" name="confirmPassword" />
      <button type="submit">Create User</button>
      <span>
        Already have an account ?
        <span><router-link :to="{ name: 'login' }" replace>Login.</router-link></span>
      </span>
    </form>
  </section>
</template>

<script>
import {authService} from '../services/auth.service';

export default {
  name: "RegisterView",
  components: {},
  data: function () {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    async register() {
      console.log(this.username, this.password);
      if (this.username != "" && this.email != "" && this.password != "" && this.confirmPassword != ""){
        if (this.handleValidation()){
          //pedido async
          const data = await authService.register(this.username, this.email, this.password);
          if (data.status){
            this.$toast.success(`Success!`);
            //redirect para a página do chat
            localStorage.setItem(process.env.LOCALHOST_KEY, JSON.stringify(data.user));
            this.$router.push({ name: 'chat' })
          } else {
            this.$toast.error(data.msg);
          }
        }
      } else {
         this.$toast.success(`Empty fields`);
      }
    },
    handleValidation() {
      if (this.password !== this.confirmPassword) {
        this.$toast.error("Password and confirm password should be same.");
        return false;
      } else if (this.username.length < 3) {
        this.$toast.error("Username should be greater than 3 characters.");
        return false;
      } else if (this.password.length < 8) {
        this.$toast.error("Password should be equal or greater than 6 characters.");
        return false;
      } else if (this.email === "") {
        this.$toast.error("Email is required.");
        return false;
      }
      return true;
    }
  },
};
</script>

<style>
section {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
}
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
</style>
