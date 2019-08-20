<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-secondary fixed-top">
    <div class="container">
      <router-link class="navbar-brand" to="/admin">Customer Tickets Admin</router-link>
      <button class="navbar-toggler" type="button" @click="toggleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div :class="navbarToggleList">
        <ul class="navbar-nav ml-auto">
          <router-link exact tag="li" to="/admin" active-class="active" class="nav-item">
            <a class="nav-link">Home</a>
          </router-link>
          <router-link exact tag="li" to="/admin/tickets" active-class="active" class="nav-item">
            <a class="nav-link">Tickets</a>
          </router-link>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {
      navbarToggleList: {
        collapse: true,
        "navbar-collapse": true,
        show: false
      }
    };
  },
  methods: {
    toggleNavbar() {
      this.navbarToggleList.show = !this.navbarToggleList.show;
    }
  }
};
</script>