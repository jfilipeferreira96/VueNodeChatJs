<template>
  <section>Welcome to the Chat page</section>
</template>

<script>
export default {
  name: "Chat",
  components: {},
  data: function () {
    return {
      currentUser: {},
    };
  },
  /*   async beforeMount() {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      this.$router.push({ name: "login" });
    } else {
      this.currentUser = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
      console.log(this.currentUser);
    }
  }, */
  methods: {
    checkLogin: function () {
      console.log("Validations");
    },
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
</style>
