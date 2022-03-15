<template>
  <!-- 元件 -->
  <delProductModal
    @delete-product="deleteCarts"
    ref="delModal"
  ></delProductModal>
  <!-- 購物車列表 -->
  <div class="container">
    <div class="text-end">
      <button
        class="btn btn-outline-danger"
        type="button"
        :class="{ disabled: cart.carts.length < 1 }"
        @click="openDelProductModal('all', '所有')"
      >
        清空購物車
      </button>
    </div>
    <table class="table align-middle">
      <thead>
        <tr>
          <th></th>
          <th>品名</th>
          <th style="width: 150px">數量/單位</th>
          <th class="text-end">單價</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="cart.carts.length > 0">
          <tr v-for="cart in cart.carts" :key="cart.id">
            <td>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openDelProductModal('single', cart.product.title, cart)"
              >
                x
              </button>
            </td>
            <td>
              {{ cart.product.title }}
              <div class="text-success">已套用優惠券</div>
            </td>
            <td>
              <div class="input-group input-group-sm">
                <div class="input-group mb-3">
                  <input
                    min="1"
                    type="number"
                    class="form-control"
                    v-model.lazy="cart.qty"
                    @change="updateCarts('edit', cart)"
                  />
                  <span class="input-group-text" id="basic-addon2">{{
                    cart.product.unit
                  }}</span>
                </div>
              </div>
            </td>
            <td class="text-end">
              <small class="text-success">折扣價：</small>
              {{ cart.final_total }}
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="4" class="text-center">購物車目前沒有商品</td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-end">總計</td>
          <td class="text-end">{{ cart.total }}</td>
        </tr>
        <tr>
          <td colspan="3" class="text-end text-success">折扣價</td>
          <td class="text-end text-success">{{ cart.final_total }}</td>
        </tr>
      </tfoot>
    </table>
    <div class="my-5 row justify-content-center">
      <VForm
        ref="form"
        class="col-md-6"
        v-slot="{ errors }"
        @submit="submitOrder"
      >
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <VField
            id="email"
            name="email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email"
            rules="required|email"
            v-model.lazy="order.user.email"
          ></VField>
          <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <VField
            id="name"
            name="姓名"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名"
            rules="required"
            v-model.lazy="order.user.name"
          ></VField>
          <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <VField
            id="tel"
            name="電話"
            type="tel"
            class="form-control"
            :class="{ 'is-invalid': errors['電話'] }"
            placeholder="請輸入電話"
            :rules="{required:true, numeric:true, min:8, regex: /^09/ }"
            v-model.lazy="order.user.tel"
          ></VField>
          <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <VField
            id="address"
            name="地址"
            type="address"
            class="form-control"
            :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址"
            rules="required"
            v-model.lazy="order.user.address"
          ></VField>
          <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea
            id="message"
            class="form-control"
            cols="30"
            rows="10"
            v-model.lazy="order.message"
          ></textarea>
        </div>
        <div class="text-end">
          <button
            type="submit"
            class="btn btn-danger"
            :disabled="
              this.cart.carts.length < 1 || Object.keys(errors).length > 0
            "
          >
            送出訂單
          </button>
        </div>
      </VForm>
    </div>
  </div>
</template>

<script>
import delProductModal from '../components/delProductModal.vue';

export default {
  data() {
    return {
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
    delProductModal,
  },
  methods: {
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
    this.getCarts();
  },
};
</script>
