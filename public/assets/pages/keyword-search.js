window.app = new Vue({
  el: '#app',
  data: function () {
    return {
        isShowCustomerInput: false,
    }
  },

  methods: {
      onCustomerClick() {
          this.isShowCustomerInput = !this.isShowCustomerInput;
      }
  }
});
