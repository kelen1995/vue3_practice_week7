<template>
  <div class="container">
    <div class="row justify-content-center">
      <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
      <div class="col-8">
        <form id="form" class="form-signin" @submit.prevent="login">
          <div class="form-floating mb-3">
            <input
              v-model.lazy="email"
              type="email"
              class="form-control"
              id="username"
              placeholder="name@example.com"
              required
              autofocus
            />
            <label for="username">Email address</label>
          </div>
          <div class="form-floating">
            <input
              v-model.lazy="password"
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              required
            />
            <label for="password">Password</label>
          </div>
          <button @click="login" class="btn btn-lg btn-primary w-100 mt-3">
            登入
          </button>
        </form>
      </div>
    </div>
    <p class="mt-5 mb-3 text-muted">&copy; 2021~∞ - 六角學院</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      apiUrl: process.env.VUE_APP_URL,
      apiPath: process.env.VUE_APP_URL,
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      // 檢查帳號/密碼是否有輸入
      if (!this.email || !this.password) {
        alert('請輸入帳號密碼');
        return;
      }

      this.axios
        .post(`${this.apiUrl}/admin/signin`, {
          username: this.email,
          password: this.password,
        })
        .then((res) => {
          this.getToken(res.data);
          this.enterProductsPage();
        })
        .catch((err) => {
          console.log(err.response);
          alert(err.response.data.message);
          this.email = '';
          this.password = '';
        });
    },
    getToken(data) {
      // 儲存 token 至 cookie
      const { token, expired } = data;
      document.cookie = `hextoken=${token}; expired=${new Date(
        expired,
      )}; path=/;`;
    },
    checkUser() {
      // 檢查是否有登入 token
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hextoken\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      this.axios.defaults.headers.common.Authorization = token;
      this.axios
        .post(`${this.apiUrl}/api/user/check`)
        .then(() => {
          this.enterProductsPage();
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    enterProductsPage() {
      this.$router.push('/admin/products');
    },
  },
  mounted() {
    this.checkUser(); // 先檢查 token
  },
};
</script>

<style scoped>
.container {
  margin-top: 50px;
}
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
</style>
