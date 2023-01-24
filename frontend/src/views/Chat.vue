<template>
  <section>
    <!-- Select User Avatar -->
    <div v-if="$store.state.user.isAvatarImageSet === false">
      <SetAvatar />
    </div>

    <!-- Chat Div -->
    <div v-else class="container-chat">
    <!--   <span class="btn-menu" >
        <img :src="require('../assets/Hamburger_icon.svg')" />
      </span> -->
      <HamburguerButton @click="openMenu"></HamburguerButton>
      <Contacts :class="{ sidebarActive: sideMenuIsOpen }" id="contacts" :contacts="contacts" v-on:changeChat="updateCurrentChat($event)" v-on:menuPressed="openMenu" />

      <template v-if="currentChat === null">
        <div id="robo" class="RoboDiv">
          <img :src="require('../assets/robot.gif')" alt="WelcomeRobot" />
          <h1>
            Welcome,
            <span>{{ $store.state.user.username }}!</span>
          </h1>
          <h3>Please select a chat to Start messaging.</h3>
        </div>
      </template>
      <template v-else>
        <ChatContainer id="chat"  :currentChat="currentChat" />
      </template>
    </div>
  </section>
</template>

<script>
import SetAvatar from "../components/SetAvatar.vue";
import Contacts from "../components/Contacts.vue";
import HamburguerButton from "../components/HamburguerButton.vue";
import ChatContainer from "../components/ChatContainer.vue";
import SocketioService from "../services/socketio.service.js";
import { authService } from "../services/auth.service";

export default {
  name: "Chat",
  components: {
    SetAvatar,
    Contacts,
    HamburguerButton,
    ChatContainer,
  },
  mounted(){
    //este metodo recebe a width da janela para fechar o sidemenu caso esteja aberto num resizing
    this.$nextTick(function() {
      window.addEventListener('resize', this.getWindowWidth);
      this.getWindowWidth()
    })
  },
  created() {
    SocketioService.setupSocketConnection(this.$store.state.user._id);
    this.getContacts();
  },
  beforeUnmount() {
    SocketioService.disconnect(this.$store.state.user._id);
  },
  data: function () {
    return {
      currentChat: null,
      contacts: [],
      socket: null,
      sideMenuIsOpen: false,
      windowWidth: 0,
    };
  },
  methods: {
    updateCurrentChat: function (newChat) {
      this.currentChat = newChat;
    },
    openMenu: function (){
      this.sideMenuIsOpen = !this.sideMenuIsOpen;
    },
     getWindowWidth(event) {
      if (document.documentElement.clientWidth < 719 && this.sideMenuIsOpen){
         this.sideMenuIsOpen = false;
      }
    },
    async getContacts() {
      if (this.$store.state.user) {
        //pedido async
        const data = await authService.getAllUsers(this.$store.state.user._id);
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
    grid-template-areas:
    "sidebar main";
    
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }

    #contacts{
      grid-area: sidebar;
      overflow-y: auto;
      -webkit-transition: all 0.5s;
      transition: all 0.5s;
    }
    #robo, #chat{
      grid-area: main;
    }

    @media screen and  (max-width: 719px) {
      height: 100vh;
      width: 100vw;
      grid-template-areas:
      "header header"
      "main main";
      grid-template-rows: 55px 1fr;
      #contacts{
        display: none;
      }
    }
    
    .sidebarActive{
      display: grid !important;
      z-index: 9999 !important;
      left: 0 !important;
      top: 0!important;
      position: absolute;
      width: 100vw;
      height: -webkit-fill-available;
    }
  }
}

.RoboDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  text-align: center;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
}
</style>
