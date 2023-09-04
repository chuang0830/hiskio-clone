<template>
  <div class="min-h-screen">
    <HeaderComp :loginOpen="loginOpen" :tab="tab" @openLogin="openLogin" />
    <LoginBox v-if="loginOpen" :loginOpen="loginOpen" :tab="tab" @openLogin="openLogin" @changeTab="changeTab" />
    <div class="px-6 max-w-screen-xl xl:mx-auto pt-6 xl:px-0 ">
      <ShopCart />
      <ProductList />
    </div>
  </div>
</template>
<script>
import HeaderComp from "../components/HeaderComp.vue";
import LoginBox from "../components/LoginBox.vue";
import ShopCart from "../components/ShopCart.vue";
import ProductList from "../components/ProductList.vue";

export default {
  name: 'HomePage',
  components: {
    HeaderComp,
    LoginBox,
    ShopCart,
    ProductList,
  },
  data() {
    return {
      loginOpen: false,
      tab: ''
    };
  },
  mounted() {
    this.getUser()
  },
  methods: {
    openLogin(boolean, param) {
      this.loginOpen = boolean;
      this.tab = param;
    },
    changeTab(param) {
      this.tab = param;
    },
    getUser() {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user?.isLoggedIn) {
        this.$store.commit('setLoggedIn', user)
      }
    }
  },
}
</script>
