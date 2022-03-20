<template>
  <table class="table mt-4">
    <thead>
      <tr>
        <th>購買時間</th>
        <th>Email</th>
        <th>購買款項</th>
        <th>應付金額</th>
        <th>是否付款</th>
        <th>編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="order in orders" :key="order.id">
        <td>{{ dateFormat(order.create_at) }}</td>
        <td>{{ order.user.email }}</td>
        <td>
          <ul class="list-unstyled">
            <li v-for="product in order.products" :key="product.id">
              {{ product.product.title }} {{ product.qty }}
              {{ product.product.unit }}
            </li>
          </ul>
        </td>
        <td>{{ order.total }}</td>
        <td>
          <div class="form-check form-switch">
            <label :for="`isPaid${order.id}`" class="form-check-label">
              <span>{{ order.is_paid ? '已付款' : '未付款' }}</span>
            </label>
            <input
              :id="`isPaid${order.id}`"
              type="checkbox"
              class="form-check-input"
              @change="updatePaid(order)"
              v-model="order.is_paid"
            />
          </div>
        </td>
        <td>
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-primary btn-sm"
              @click="openOrderModal(order)"
            >
              檢視
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="openDelOrderConfirm(order.id)"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <Pagination :pagination="pagination" @switch-page="getOrders"></Pagination>
  <OrderModal ref="orderModal"></OrderModal>
</template>

<script>
import Swal from 'sweetalert2';
import Pagination from '../components/Pagination.vue';
import OrderModal from '../components/OrderModal.vue';
import dateFormat from '../utils/utility';

export default {
  data() {
    return {
      apiUrl: process.env.VUE_APP_URL,
      apiPath: process.env.VUE_APP_PATH,
      orders: [],
      pagination: {},
    };
  },
  components: {
    Pagination,
    OrderModal,
  },
  methods: {
    getOrders(page = 1) {
      // 取得訂單資訊
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/orders?page=${page}`;
      this.axios
        .get(url)
        .then((res) => {
          const { orders, pagination } = res.data;
          this.orders = orders;
          this.pagination = pagination;
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    updatePaid(order) {
      // 更新付款狀態
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/order/${order.id}`;
      this.axios
        .put(url, {
          data: order,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    dateFormat(timestamp) {
      return dateFormat(timestamp);
    },
    openOrderModal(order) {
      this.$refs.orderModal.openModal(order);
    },
    openDelOrderConfirm(orderId) {
      // 開啟確認刪除訂單的視窗
      Swal.fire({
        title: '是否要刪除訂單?',
        showCancelButton: true,
        confirmButtonText: '確認刪除',
        cancelButtonText: '取消',
        reverseButtons: true,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.deleteOrder(orderId);
        }
      });
    },
    deleteOrder(orderId) {
      // 刪除單筆訂單
      console.log(orderId);
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/order/${orderId}`;
      this.axios
        .delete(url)
        .then((res) => {
          const status = res.data.success;
          if (status) {
            Swal.fire('已刪除訂單');
            this.getOrders();
          }
        })
        .catch((err) => {
          console.dir(err);
        });
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
          this.getOrders();
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
