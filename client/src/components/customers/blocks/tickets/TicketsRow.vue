<template>
  <tr>
    <td>{{ticket.subject | shortenWords(8)}}</td>
    <td>{{ticket.message | shortenWords(15)}}</td>
    <td>{{ticket.status}}</td>
    <td>{{new Date(ticket.date).toLocaleDateString()}}</td>
    <td>
      <router-link exact :to="'tickets/'+ticket._id">View</router-link>
    </td>
  </tr>
</template>

<script>
export default {
  name: "ticket-row",
  props: ["ticket"],
  filters: {
    shortenWords(value, number) {
      const words = value.split(/\s/g);
      const gtValue = words.length > number;
      return words
        .slice(0, number)
        .join(" ")
        .concat(gtValue ? "..." : "");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>