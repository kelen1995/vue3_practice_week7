<template>
  <div class="modal fade" tabindex="-1" id="orderModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">訂單細節</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-6">
                <h6>買家資訊</h6>
                <table class="table">
                  <tr>
                    <th>姓名</th>
                    <td>{{ order.user.name }}</td>
                  </tr>
                  <tr>
                    <th>電話</th>
                    <td>{{ order.user.tel }}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{{ order.user.email }}</td>
                  </tr>
                  <tr>
                    <th>住址</th>
                    <td>{{ order.user.address }}</td>
                  </tr>
                </table>
              </div>
              <div class="col-md-6">
                <h6>訂單資訊</h6>
                <table class="table">
                  <tr>
                    <th>訂單編號</th>
                    <td>{{ order.id}}</td>
                  </tr>
                  <tr>
                    <th>購買時間</th>
                    <td>{{ dateFormat(order.create_at) }}</td>
                  </tr>
                  <tr>
                    <th>購買品項</th>
                    <td>
                      <ul class="list-unstyled">
                        <li v-for="product in order.products" :key="product.id">
                          {{ product.product.title }} {{ product.qty }}
                          {{ product.product.unit }}
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>{{ order.is_paid ? '已付款' : '未付款'}}</td>
                  </tr>
                  <tr>
                    <th>總金額</th>
                    <td>{{ order.total }}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-primary">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';
import dateFormat from '../utils/utility';

export default {
  data() {
    return {
      modal: {},
      order: {
        user: {},
      },
    };
  },
  methods: {
    openModal(order) {
      this.modal.show();
      this.order = order;
    },
    dateFormat(timestamp) {
      return dateFormat(timestamp);
    },
  },
  mounted() {
    this.modal = new Modal(document.getElementById('orderModal'), {});
  },
};
</script>
