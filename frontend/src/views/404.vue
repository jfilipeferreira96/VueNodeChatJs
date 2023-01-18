<template>
  <section>
    <img :src="require('../assets/4041.png')" />
    <span>
      <router-link @click="$router.go(-1)" class="error" to="">Go back</router-link>
    </span>
  </section>
</template>

<script>
export default {
  name: "PageNotFound",
  components: {},
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
img {
  width: 100%;
  max-width: 600px;
  height: auto;
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
.error {
  text-decoration: none;
  font-weight: bold;
  background-color: #4f2d8c;
  color: white;
  padding: 1rem 2rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
}
</style>
