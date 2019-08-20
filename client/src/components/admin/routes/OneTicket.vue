<template>
  <layout>
    <section class="container">
      <div v-if="loading === true" class="spinner-border" style="width: 3rem; height: 3rem;" />
      <div v-else-if="loading === false && ticket._id && loaded=== true">
        <h2>Your Ticket</h2>
        <hr />
        <h4>Subject</h4>
        <p class="lead">{{ticket.subject}}</p>
        <hr />
        <h4>Message</h4>
        <p class="lead">{{ticket.message}}</p>
        <hr />
        <h4>Status</h4>
        <p class="lead">{{ticket.status}}</p>
        <hr />
        <div v-if="ticket.filesUploadedCustomer">
          <div v-for="(file, index) in ticket.filesUploadedCustomer" :key="index">
            <h4>File Attached: {{file.replace(/-[0-9]*/g, "")}}</h4>
            <p>
              <a :href="'/file/'+file" download class="btn btn-primary">Download</a>
            </p>
            <hr />
          </div>
        </div>
        <h2>Admin's Response</h2>
        <hr />
        <div v-if="ticket.adminResponse">
          <h4>Admin Message</h4>
          <p class="lead">{{ticket.adminResponse.message}}</p>
          <hr />
          <h4>Time Replied</h4>
          <p class="lead">{{new Date(ticket.adminResponse.date).toLocaleString()}}</p>
          <hr />
          <div v-if="ticket.filesUploadedAdmin">
            <div v-for="(file, index) in ticket.filesUploadedAdmin" :key="index">
              <h4>File Attached: {{file.replace(/-[0-9]*/g, "")}}</h4>
              <p>
                <a :href="'/file/'+file" download class="btn btn-primary">Download</a>
              </p>
              <hr />
            </div>
          </div>
        </div>
        <div v-else>
          <h5>No Response From Admin Yet</h5>
        </div>
      </div>
      <div v-else-if="loading === false && !ticket._id && loaded === true">
        <h1>Ticket Not Found...</h1>
      </div>
      <div class="actions" v-if="loading === false">
        <button @click="openModal" class="mb-3 btn btn-primary btn-block">Edit</button>
      </div>
      <ticket-edit
        v-if="editModalState"
        :modalState="editModalState"
        @close-modal="handleModalClose"
        :ticket="ticket"
      />
    </section>
  </layout>
</template>

<script>
import Layout from "../Layout";
import axios from "axios";
import TicketEditModal from "../blocks/tickets/TicketEditModal";
import showToast from "../../../utils/showToast";

export default {
  name: "one-ticket",
  props: ["id"],
  data() {
    return {
      ticket: {},
      editModalState: false,
      loading: false,
      loaded: false
    };
  },
  components: {
    Layout,
    "ticket-edit": TicketEditModal
  },
  methods: {
    openModal() {
      this.editModalState = true;
    },
    handleModalClose(data) {
      this.editModalState = false;
      if (data) this.ticket = data;
    }
  },
  async created() {
    try {
      this.loading = true;
      const res = await axios.get(`/api/admin/${this.id}`);
      this.ticket = res.data || {};
      this.loading = false;
      this.loaded = true;
    } catch (err) {
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  padding-top: 70px;
}
</style>