<template>
  <button class="btn-logout" @click="handleLogout">
      <img :src="require('../assets/155491.svg')" />
  </button>
</template>


<script>
export default {
  name: "LogoutOut",
  props:[""],
  data: function () {
    return {

    };
  },
  methods: {  
    handleLogout: async function (){
      this.$store.dispatch("logout", {_id: this.$store.state.user._id})
        .then((res) => { 
          if (res.status){
            this.$toast.success(`Bye!`);
            this.$router.push({ name: "login" });
          } else {
            this.$toast.error("Something went wrong when logging out.");
          }
        })
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
