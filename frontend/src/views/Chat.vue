<template>
  <section>
    <!-- Select User Avatar -->
    <div v-if="currentUser.isAvatarImageSet === false">
      <SetAvatar />
    </div>

    <!-- Chat Div -->
    <div v-else>
      <h1>ola ja tens imagem</h1>
    </div>

  </section>
</template>

<script>
import SetAvatar from '../components/SetAvatar.vue'

export default {
  name: "Chat",
  components: {
    SetAvatar
  },
  data: function () {
    return {
      currentUser: JSON.parse(localStorage.getItem(process.env.VUE_APP_LOCALHOSTKEY)),
    };
  },
  methods: {  
    checkLogin: function () {
      console.log("Validations");
      console.log(this.currentUser.username)
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
