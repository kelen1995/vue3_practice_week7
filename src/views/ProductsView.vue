<template>
  <div id="app">
    <div class="container">
      <div class="mt-4">
        <!-- 產品Modal -->
        <product-modal
          :product="tempProduct"
          @add-carts="updateCarts"
          ref="productModal"
        ></product-modal>

        <table class="table align-middle">
          <thead>
            <tr>
              <th>圖片</th>
              <th>商品名稱</th>
              <th>價格</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td style="width: 200px">
                <div
                  style="
                    height: 100px;
                    background-size: cover;
                    background-position: center;
                  "
                  :style="{ backgroundImage: `url(${product.imageUrl})` }"
                ></div>
              </td>
              <td>
                {{ product.title }}
              </td>
              <td>
                <div class="h5">{{ product.price }} 元</div>
                <del class="h6">原價 {{ product.origin_price }} 元</del>
                <!-- <div class="h5">現在只要 {{  }} 元</div> -->
              </td>
              <td>
                <div class="btn-group btn-group-sm">
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    @click="openProductModal(product)"
                  >
                    <!-- <i class="fas fa-spinner fa-pulse"></i> -->
                    查看更多
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click="
                      updateCarts('add', { product_id: product.id, qty: 1 })
                    "
                  >
                    <!-- <i class="fas fa-spinner fa-pulse"></i> -->
                    加到購物車
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <pagination
          :pagination="pagination"
          @switch-page="getProducts"
        ></pagination>
      </div>
    </div>
  </div>
</template>

<script>
import productModal from '../components/productModal.vue';
import pagination from '../components/pagination.vue';

export default {
  data() {
    return {
      products: [],
      tempProduct: {},
      pagination: {},
      cart: {
        carts: [],
      },
      order: {
        user: {},
        message: '',
      },
      apiUrl: process.env.VUE_APP_URL,
      apiPath: process.env.VUE_APP_PATH,
    };
  },
  components: {
    productModal,
    pagination,
  },
  methods: {
    getProducts(page = 1) {
      // 取得商品列表
      const loader = this.$loading.show();
      this.axios
        .get(`${this.apiUrl}/api/${this.apiPath}/products?page=${page}`)
        .then((res) => {
          loader.hide();
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    openProductModal(product) {
      this.tempProduct = { ...product };
      this.$refs.productModal.openModal();
    },
    hideProductModal() {
      this.$refs.productModal.hideModal();
    },
    getCarts() {
      // 取得購物車列表
      const loader = this.$loading.show();
      this.axios
        .get(`${this.apiUrl}/api/${this.apiPath}/cart`)
        .then((res) => {
          loader.hide();
          this.cart = res.data.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    updateCarts(status, cart) {
      // 新增/修改購物車
      const { id, product_id: productId, qty } = cart;
      // 新增購物車
      let method = 'post';
      let url = `${this.apiUrl}/api/${this.apiPath}/cart/`;

      if (status === 'edit') {
        // 更新購物車商品數量
        method = 'put';
        url = `${this.apiUrl}/api/${this.apiPath}/cart/${id}`;
      }

      // 發送請求
      this.axios[method](url, {
        data: {
          product_id: productId,
          qty,
        },
      })
        .then(() => {
          this.hideProductModal();
          this.getCarts();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteCarts(status, cart) {
      let url = '';
      if (status === 'all') {
        // 刪除全部購物車
        url = `${this.apiUrl}/api/${this.apiPath}/carts/`;
      } else if (status === 'single') {
        url = `${this.apiUrl}/api/${this.apiPath}/cart/${cart.id}`; // 刪除一筆購物車商品
      }
      this.axios
        .delete(url)
        .then(() => {
          this.hideDelProductModal();
          this.getCarts();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openDelProductModal(status, title, cart) {
      this.$refs.delModal.openModal(status, title, cart);
    },
    hideDelProductModal() {
      this.$refs.delModal.hideModal();
    },
    submitOrder() {
      if (this.cart.carts.length < 1) {
        // 若購物車沒有資料，不發出請求
        alert('購物車目前沒有商品');
        return;
      }
      const loader = this.$loading.show();

      this.axios
        .post(`${this.apiUrl}/api/${this.apiPath}/order`, {
          data: { ...this.order },
        })
        .then((res) => {
          loader.hide();
          const { message, total } = res.data;
          alert(`${message}，總金額為 ${total}`);
          this.$refs.form.resetForm();
          this.order.message = '';
          this.getCarts();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getProducts();
    this.getCarts();
  },
};
</script>
