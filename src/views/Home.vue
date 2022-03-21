<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
    <div class="container-fluid">
      <a href="#" class="navbar-brand">前台</a>
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
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/products" @click="hideCollapse"
              >產品列表</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cart" @click="hideCollapse"
              >購物車</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/products"
              >後台登入</router-link
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
  name: 'Home',
  components: {},
  methods: {
    hideCollapse() {
      // 點了 router-link 時，將 collapse 收起來
      const myCollapse = document.getElementById('navbarSupportedContent');
      const bsCollapse = new Collapse(myCollapse, {
        toggle: false,
      });
      bsCollapse.hide();
    },
  },
  mounted() {},
};
</script>
