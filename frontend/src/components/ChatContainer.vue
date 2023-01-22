<template>
  <div class="chat-container">
    <div class="chat-header">
      <div class="user-details">
        <div class="avatar">
          <img :src="`data:image/svg+xml;base64,${currentChat.avatarImage}`" alt="avatar" />
        </div>
        <div class="username">
          <h3>{{ currentChat.username }}</h3>
        </div>
      </div>
    </div>
    <div class="chat-messages" ref="msgContainer">
      <div v-for="message of messages" class="contact" :key="message">
        <div>
          <div class="message" :class="getClass(message.fromSelf)">
            <div class="content">
              <p>{{ message.message }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Input @messageEmit="handleSendingMessage" />
  </div>
</template>

<script>
import Input from "../components/Input.vue";
import SocketioService from "../services/socketio.service.js";

export default {
  name: "Contacts",
  components: {
    Input,
  },
  data: function () {
    return {
      user: JSON.parse(localStorage.getItem(process.env.VUE_APP_LOCALHOSTKEY)),
      messages: [],
    };
  },
  props: ["currentChat"],
  updated() {
    this.scrollToBottom();
  },
  methods: {
    scrollToBottom() {
      const targetRef = this.$refs.msgContainer;
      this.$nextTick(() => {
        targetRef.scrollTo({
          top: targetRef.scrollHeight,
          left: 0,
          behavior: "smooth",
        });
      });
    },
    getClass: function (fromSelf) {
      return fromSelf ? "sended" : "recieved";
    },
    fetchMessages: async function () {
      //pedido async
      const data = await SocketioService.recieveMessage(this.user._id, this.currentChat._id);
      if (data.status) {
        this.messages = data.allMessages;
        window.scrollTo(0, this.$refs["msgContainer"]);
      } else {
        console.log("Failed to fetch messages");
      }
    },
    async handleSendingMessage(message) {
      //from    to   message
      const sendSocketMsg = await SocketioService.sendMessage(this.user._id, this.currentChat._id, message);
      if (sendSocketMsg.status) {
        this.messages.push({ fromSelf: true, message: message });
      } else {
        this.$toast.error("Couldn't send message. Something went error.");
      }
    },
  },
  mounted() {
    if (this.currentChat) {
      this.fetchMessages();
    }
  },
};
</script>

<style lang="scss">
.chat-container {
  display: grid;
  grid-template-rows: 15% 70% 15%;
  gap: 0.1rem;
  overflow: hidden;
}
.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  .user-details {
    display: flex;
    align-items: center;
    gap: 1rem;
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
}
.chat-messages {
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  .message {
    display: flex;
    align-items: center;
    .content {
      max-width: 40%;
      overflow-wrap: break-word;
      padding: 1rem;
      font-size: 1.1rem;
      border-radius: 1rem;
      color: #d1d1d1;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        max-width: 70%;
      }
    }
  }
  .sended {
    justify-content: flex-end;
    .content {
      background-color: #4f04ff21;
    }
  }
  .recieved {
    justify-content: flex-start;
    .content {
      background-color: #9900ff20;
    }
  }
}
</style>
