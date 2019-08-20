<template>
  <div id="customer">
    <layout>
      <welcome />
    </layout>
  </div>
</template>

<script>
import Layout from "../Layout";
import Welcome from "../blocks/home/Welcome";
export default {
  name: "home",
  components: {
    Layout,
    Welcome
  }
};
</script>