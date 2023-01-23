<template>
  <div class="main-contacts">
    <div class="brand">
      <HamburguerButton></HamburguerButton>
      <div class="center">
          <img :src="require('../assets/logo1.png')" />
          <h3>Vue Chat</h3>
      </div>
    </div>
    <div class="contacts">
      <div v-for="contact of contacts" class="contact" :key="contact" @click="handleChatChange(contact)">
        <div class="avatar">
          <img :src="`data:image/svg+xml;base64,${contact.avatarImage}`" alt="contactAvatar" />
        </div>
        <div class="username">
          <h3>{{ contact.username }}</h3>
        </div>
      </div>
    </div>
    <div class="current-user">
      <div class="avatar">
        <img :src="`data:image/svg+xml;base64,${user.avatarImage}`" alt="avatar" />
      </div>
      <div class="username">
        <h2>{{ user.username }}</h2>
      </div>
      <div>
        <LogoutButton :user="user" />
      </div>
    </div>
  </div>
</template>

<script>
import HamburguerButton from "../components/HamburguerButton.vue";
import LogoutButton from "../components/LogoutButton.vue";

export default {
  name: "Contacts",
  props: ["contacts"],
  components: {
    LogoutButton,
    HamburguerButton
  },
  data: function () {
    return {
      user: JSON.parse(localStorage.getItem(process.env.VUE_APP_LOCALHOSTKEY)),
      
      selectedContact: null,
    };
  },
  methods: {
    handleChatChange: function (contact) {
      this.$emit("changeChat", contact);
    },
  },
  mounted() {
    //this.fetchAvatars()
  },
};
</script>

<style lang="scss">
.main-contacts {
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    gap: 1rem;

    .center{
      justify-content: center;
      align-items: center;
      display: flex;
      justify-content: center;
      width: 100%;
      @media screen and (max-width: 719px) {
        justify-content: center;
        align-items: center;
        display: flex;
        justify-content: center;
        width: 65vw;
      
      }
      img {
        height: 2rem;
      }
      h3 {
        color: white;
        text-transform: uppercase;
      }
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.4rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
  .btn-logout {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #9a86f3;
    border: none;
    cursor: pointer;
    svg {
      font-size: 1.3rem;
      color: #ebe7ff;
    }
  }
}
</style>
