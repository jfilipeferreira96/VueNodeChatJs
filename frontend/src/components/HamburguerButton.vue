<template>
  <span class="btn-menu" @click="openMenu">
    <img :src="require('../assets/Hamburger_icon.svg')" />
  </span>
</template>


<script>

export default {
  name: "HamburguerButton",
  data: function () {
    return {

    };
  },
  methods: {  
  },
  mounted() {
  }
};
</script>

<style lang="scss">
.btn-menu{
  grid-area: header;
  max-width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  display:none;
  cursor: pointer;
  margin: 1rem 1rem 0rem 1rem;
  img {
    height: 1.5rem;
  }

  @media screen and  (max-width: 719px) {
    display: inline;
  }
}
</style>
