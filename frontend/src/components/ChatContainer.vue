<template>
  <div class="chat-container">
    <div class="chat-header">
      <div class="user-details">
        <div class="avatar">
          <!--  <img :src="`data:image/svg+xml;base64,${avatar}`" alt="avatar" /> -->
        </div>
        <div class="username">
          <!--  <h3>{{ user.username }}</h3> -->
        </div>
      </div>
    </div>
    <div class="chat-messages">
      <div v-for="message of messages" class="contact" :key="message">
        <div>
          <div :class="[message.fromSelf ? sended : recieved, message]">
            <div class="content">
              <p>{{ message.message }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Input />
  </div>
</template>

<script>
import { authService } from "../services/auth.service";
import Input from "../components/Input.vue";

export default {
  name: "Contacts",
  components: {
    Input,
  },
  data: function () {
    return {
      user: JSON.parse(localStorage.getItem(process.env.VUE_APP_LOCALHOSTKEY)),
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
