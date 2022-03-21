<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
    <div class="container-fluid">
      <a href="/#/admin" class="navbar-brand"  @click="hideCollapse">後台</a>
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
            <router-link class="nav-link" to="/"
              >回首頁</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/admin/products"
              @click="hideCollapse"
              >產品列表</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/admin/orders"
              @click="hideCollapse"
              >訂單列表</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" @click.prevent="logout" to="/"
              >登出</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<script>
import { Collapse } from 'bootstrap';

export default {
  methods: {
    logout() {
      document.cookie = 'hextoken=;expires=;';
      this.$router.push('/login');
    },
    hideCollapse() {
      // 點了 router-link 時，將 collapse 收起來
      const myCollapse = document.getElementById('navbarSupportedContent');
      const bsCollapse = new Collapse(myCollapse, {
        toggle: false,
      });
      bsCollapse.hide();
    },
  },
};
</script>
