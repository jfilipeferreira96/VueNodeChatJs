<template>
  <section>
    Welcome to the Chat page
  </section>
</template>

<script>
export default {
  name: "Chat",
  components: {},
  methods:{
    checkLogin: function (){
      console.log('Validations')
    },

     
  },
 beforeMount(){
   this.checkLogin();

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
