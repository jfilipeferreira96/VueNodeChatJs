<template>
  <section>
    <!-- Select User Avatar -->
    <div v-if="currentUser.isAvatarImageSet === false">
      <SetAvatar />
    </div>

    <!-- Chat Div -->
    <div v-else class="container-chat">
      <Contacts :contacts="contacts" v-on:changeChat="updateCurrentChat($event)" />

      <template v-if="currentChat === null">
        <div class="RoboDiv">
          <img :src="require('../assets/robot.gif')" alt="WelcomeRobot" />
          <h1>
            Welcome,
            <span>{{ currentUser.username }}!</span>
          </h1>
          <h3>Please select a chat to Start messaging.</h3>
        </div>
      </template>
      <template v-else>
        <ChatContainer :currentChat="currentChat" />
      </template>
    </div>
  </section>
</template>

<script>
import SetAvatar from "../components/SetAvatar.vue";
import Contacts from "../components/Contacts.vue";
import ChatContainer from "../components/ChatContainer.vue";
import SocketioService from "../services/socketio.service.js";
import { authService } from "../services/auth.service";

export default {
  name: "Chat",
  components: {
    SetAvatar,
    Contacts,
    ChatContainer,
  },
  created() {
    SocketioService.setupSocketConnection(this.currentUser._id);
    this.getContacts();
  },
  beforeUnmount() {
    SocketioService.disconnect(this.currentUser._id);
  },
  data: function () {
    return {
      currentUser: JSON.parse(localStorage.getItem(process.env.VUE_APP_LOCALHOSTKEY)),
      currentChat: null,
      contacts: [],
      socket: null,
    };
  },
  methods: {
    updateCurrentChat: function (newChat) {
      this.currentChat = newChat;
    },
    async getContacts() {
      if (this.currentUser) {
        //pedido async
        const data = await authService.getAllUsers(this.currentUser._id);
        if (data) {
          this.contacts = data;
        } else {
          console.log("Failed to fetch all users");
        }
      }
    },
  },
};
</script>

<style lang="scss">
section {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container-chat {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
}

.RoboDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
}
</style>
