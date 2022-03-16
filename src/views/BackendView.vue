<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a href="#" class="navbar-brand">後台</a>
      <!-- 行動版漢堡選單 -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">回首頁</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" @click.prevent="logout" to="/">登出</router-link>
            <!-- <a href="#" class="nav-link" @click.prevent="logout">登出</a> -->
          </li>
        </ul>
      </div>
    </div>
  </nav>
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
