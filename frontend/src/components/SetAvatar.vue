<template>
  <section>
    <div class="title-container">
      <h1>Pick an Avatar as your profile picture</h1>
    </div>
    <div class="avatars">
      <div v-for="(avatar, index) of avatars" :key="avatar" class="avatar">
        <img :src="`data:image/svg+xml;base64,${avatar}`" alt="avatar" class="avatar" :class="{ selected: avatar === selectedAvatar }" @click="setClickedAvatar(index)" />
      </div>
    </div>
    <button class="submit-btn" @click="setProfileAvatar">Set as Profile Picture</button>
  </section>
</template>

<script>
import { authService } from "../services/auth.service";

export default {
  name: "SetAvatar",
  components: {},
  data: function () {
    return {
      avatars: [],
      selectedAvatar: null,
    };
  },
  methods: {
    fetchAvatars: async function () {
      for (let i = 0; i < 4; i++) {
        const response = await fetch(`https://api.multiavatar.com/4645646/${Math.round(Math.random() * 1000)}`);
        const data = await response.text();
        const encodedData = btoa(unescape(encodeURIComponent(data)));
        this.avatars.push(encodedData);
      }
    },
    setClickedAvatar: function (id) {
      this.selectedAvatar = this.avatars[id];
    },
    setProfileAvatar: async function () {
      if (this.selectedAvatar === null) {
        this.$toast.error("Please select an avatar");
      } else {
        this.$store.dispatch("setAvatar", {_id: this.$store.state.user._id, selectedAvatar: this.selectedAvatar})
        .then((res) => { 
          if (!res.isSet){
            this.$toast.error("Error setting avatar. Please try again.");
          }
        })
      }
    },
  },
  mounted() {
    this.fetchAvatars();
  },
};
</script>

<style lang="scss">
.title-container h1 {
  color: white;
}

.avatars {
  gap: 2rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  .avatar {
    border: 0.4rem solid transparent;
    padding: 0.4rem;
    border-radius: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s ease-in-out;
    img {
      height: 6rem;
      transition: 0.5s ease-in-out;
      cursor: pointer;
    }
  }
  .selected {
    border: 0.4rem solid #4e0eff;
  }
}
.submit-btn {
  background-color: #4e0eff;
  color: white;
  padding: 1rem 2rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  &:hover {
    background-color: #4e0eff;
  }
}
</style>
