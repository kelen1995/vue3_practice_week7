<template>
  <h1>後台首頁</h1>
  <div id="nav">
    <router-link to="/">回前台首頁</router-link> |
    <a href="#" @click.prevent="logout">登出</a>
  </div>
  <router-view />
</template>

<script>
export default {
  methods: {
    logout() {
      document.cookie = 'hextoken=;expires=;';
      this.$router.push('/login');
    },
  },
};
</script>
