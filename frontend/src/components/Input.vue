<template>
  <div class="input">
    <div class="button-container">
      <div class="emoji"></div>
    </div>
    <form class="input-container" ref="myForm" @submit.prevent="submitMessage">
      <input v-model="message" ref="message" name="message" type="text" placeholder="Type your message here" autocomplete="off" />
      <button type="submit">
        <img :src="require('../assets/send.svg')" />
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Input",
  data: function () {
    return {};
  },
  methods: {
    submitMessage() {
      if (this.message.length > 0) {
        //passa a mensagem para o pai e da reset ao input
        this.$emit("messageEmit", this.message);
        this.$refs.message.value = "";
      }
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
.input {
  display: flex;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 1rem;
}
.button-container {
  display: flex;
  align-items: center;
  color: white;
  gap: 1rem;
  .emoji {
    position: relative;
    svg {
      font-size: 1.5rem;
      color: #ffff00c8;
      cursor: pointer;
    }
    .emoji-picker-react {
      position: absolute;
      top: -350px;
      background-color: #080420;
      box-shadow: 0 5px 10px #9a86f3;
      border-color: #9a86f3;
      .emoji-scroll-wrapper::-webkit-scrollbar {
        background-color: #080420;
        width: 5px;
        &-thumb {
          background-color: #9a86f3;
        }
      }
      .emoji-categories {
        button {
          filter: contrast(0);
        }
      }
      .emoji-search {
        background-color: transparent;
        border-color: #9a86f3;
      }
      .emoji-group:before {
        background-color: #080420;
      }
    }
  }
}
.input-container {
  width: 100%;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  background-color: #ffffff34;
  input {
    width: 90%;
    height: 60%;
    background-color: transparent;
    color: white;
    border: none;
    padding-left: 1rem;
    font-size: 1.2rem;

    &::selection {
      background-color: #9a86f3;
    }
    &:focus {
      outline: none;
    }
  }
  button {
    padding: 0.3rem 2rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #9a86f3;
    border: none;
    img {
      height: 2rem;
      color: white;
    }
    @media screen and (max-width: 719px) {
      padding: 0.3rem 1rem;
      img {
        height: 1.5rem;
      }
    }
  }
}
</style>
