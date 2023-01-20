<template>
  <button class="btn-logout" @click="handleLogout">
      <img :src="require('../assets/155491.svg')" />
  </button>
</template>


<script>
import { authService } from "../services/auth.service";

export default {
  name: "LogoutOut",
  props:["user"],
  data: function () {
    return {

    };
  },
  methods: {  
    handleLogout: async function (){
        const data = await authService.logout(this.user._id);
        if (data.status) {
          this.$toast.success(`Bye!`);
          //redirect para a página do login
          localStorage.clear();
          this.$router.push({ name: "login" });
        } else {
          this.$toast.error("Something went wrong when logging out.");
        }
    }
  },
  mounted() {
  }
};
</script>

<style lang="scss">
.btn-logout{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  img {
    height: 1.5rem;
  }
}
</style>
