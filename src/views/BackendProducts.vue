<template>
  <div class="container">
    <div class="text-end mt-4">
      <button
        class="btn btn-primary"
        type="button"
        @click="showProductModal('add')"
      >
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-end">{{ item.origin_price }}</td>
          <td class="text-end">{{ item.price }}</td>
          <td>
            <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="showProductModal('edit', item)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="showProductModal('delete', item)"
              >
                刪除
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
  <productModal
    @update-product="updateProduct"
    ref="productModal"
  ></productModal>
  <delProductModal
    @delete-product="deleteProduct"
    ref="delProductModal"
  ></delProductModal>
  <!-- Modal -->
</template>

<script>
import emitter from '@/utils/emitter';
import pagination from '../components/pagination.vue';
import productModal from '../components/BackendProductModal.vue';
import delProductModal from '../components/delProductModal.vue';

export default {
  data() {
    return {
      products: [],
      tempProduct: {
        imagesUrl: [],
      },
      isNew: false,
      pagination: {},
      apiUrl: process.env.VUE_APP_URL,
      apiPath: process.env.VUE_APP_PATH,
    };
  },
  components: {
    pagination,
    productModal,
    delProductModal,
  },
  methods: {
    getProducts(page = 1) {
      this.axios
        .get(`${this.apiUrl}/api/${this.apiPath}/admin/products?page=${page}`)
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    showProductModal(status, product) {
      switch (status) {
        case 'add':
          this.tempProduct = { imagesUrl: [] };
          this.isNew = true;
          this.toggleProductModal();
          break;
        case 'edit':
          this.tempProduct = { ...product };
          this.isNew = false;
          this.toggleProductModal();
          break;
        case 'delete':
          this.tempProduct = { ...product };
          this.toggleDelProductModal('open');
          break;
        default:
          break;
      }
    },
    toggleProductModal() {
      emitter.emit('openModal', this.tempProduct);// 觸發 openModal
      this.$refs.productModal.toggleModal();
    },
    updateProduct(product = this.tempProduct) {
      let method = 'post';
      let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
      let message = '產品新增完成';

      if (!this.isNew) {
        method = 'put';
        url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${product.id}`;
        message = '產品修改完成';
      }

      this.axios[method](url, {
        data: product,
      })
        .then(() => {
          alert(message);
          this.toggleProductModal();
          this.getProducts(this.pagination.current_page);
          this.tempProduct = { imagesUrl: [] };
        })
        .catch((err) => {
          console.log(err);
          alert('產品新增失敗');
        });
    },
    deleteProduct() {
      this.axios
        .delete(
          `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`,
        )
        .then(() => {
          this.toggleDelProductModal('hide');
          this.getProducts();
        })
        .catch((err) => {
          console.log(err);
          alert('產品刪除失敗');
        });
    },
    toggleDelProductModal(status) {
      if (status === 'open') {
        this.$refs.delProductModal.openModal('single', this.tempProduct.title);
      } else {
        this.$refs.delProductModal.hideModal();
      }
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
          this.getProducts();
        })
        .catch((err) => {
          console.log(err);
          this.$router.push('/login');
        });
    },
  },
  mounted() {
    this.checkUser();
  },
};
</script>
