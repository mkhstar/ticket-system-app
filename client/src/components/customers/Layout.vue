<template>
  <div id="cusotmer-layout">
    <navbar />
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
import Navbar from "./blocks/Navbar";
export default {
  name: "layout",
  components: {
    Navbar
  }
};
</script>