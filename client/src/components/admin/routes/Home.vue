<template>
  <div id="customer">
    <layout>
      <header class="jumbotron container">
        <h1 class="display-4">A Warm Welcome Admin!</h1>
        <p
          class="lead"
        >Welcome to your dashboard dear Admin. Here you can view all tickets and reply to them</p>
        <div>
          <router-link exact to="/admin/tickets">Go to Tickets</router-link>
        </div>
      </header>
    </layout>
  </div>
</template>

<script>
import Layout from "../Layout";
export default {
  name: "home",
  components: {
    Layout
  }
};
</script>

<style scoped>
header {
  margin-top: 70px;
}
</style>