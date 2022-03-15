<template>
  <h1>前台首頁</h1>
  <div id="nav">
    <router-link to="/">首頁</router-link> |
    <router-link to="/products">產品列表</router-link> |
    <router-link to="/cart">購物車</router-link> |
    <router-link to="/admin/products">後台登入</router-link>
  </div>
  <router-view />
</template>

<script>
export default {
  name: 'Home',
  components: {},
  mounted() {},
};
</script>
