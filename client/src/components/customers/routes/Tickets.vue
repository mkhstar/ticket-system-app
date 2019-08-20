<template>
  <layout>
    <section :class="['main-wrapper' ,'container',{'loader-active': loadingData}]">
      <div v-if="loadingData === true" class="spinner-border" style="width: 3rem; height: 3rem;" />
      <div v-else-if="loadingData === false && tickets.docs">
        <div class="card mb-3">
          <div class="card-header">
            <h4>Your Tickets</h4>
            <button @click="handleOpenModal" class="btn-primary btn">Submit Ticket</button>
          </div>
          <div class="card-body">
            <div class="filter">
              <h5>Filter</h5>
              <div class="select">
                <h6>Status</h6>
                <select @change="handleFilter" class="custom-select" id="status">
                  <option value=".*">All</option>
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div class="select">
                <h6>Date</h6>
                <select @change="handleFilter" class="custom-select" id="sortByDate">
                  <option value="1">Ascending Order</option>
                  <option value="-1">Descending Order</option>
                </select>
              </div>
            </div>

            <div class="table-responsive">
              <table
                v-if="loadingData === false && tickets.total !== 0"
                class="table table-bordered"
                width="100%"
                cellspacing="0"
              >
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>View</th>
                  </tr>
                </thead>
                <tbody>
                  <ticket-row v-for="ticket in tickets.docs" :key="ticket._id" :ticket="ticket"></ticket-row>
                </tbody>
              </table>
              <div v-else>
                <h1>No Data Available</h1>
              </div>
            </div>
            <paginate
              v-if="loadingData === false && tickets.total !== 0"
              :pageCount="tickets.totalPages"
              :clickHandler="handlePaginate"
              :prevText="'Prev'"
              :nextText="'Next'"
              :containerClass="'pagination'"
              :pageClass="'page-item'"
              :pageLinkClass="'page-link'"
              :prevClass="'page-item'"
              :nextClass="'page-item'"
              :prevLinkClass="'page-link'"
              :nextLinkClass="'page-link'"
            ></paginate>
          </div>
        </div>
      </div>
    </section>
    <ticket-add v-if="addModalState" :modalState="addModalState" @close-modal="handleModalClose" />
  </layout>
</template>

<script>
import Layout from "../Layout";
import axios from "axios";
import showToast from "../../../utils/showToast";
import TicketsRow from "../blocks/tickets/TicketsRow";
import TicketsAddModal from "../blocks/tickets/TicketFormModal";
import Paginate from "vuejs-paginate";

export default {
  name: "ticket",
  data() {
    return {
      customerName: "",
      limit: 10,
      status: ".*",
      page: 1,
      sortByDate: 1,
      loadingData: false,
      tickets: {},
      addModalState: false
    };
  },
  components: {
    Layout,
    paginate: Paginate,
    "ticket-row": TicketsRow,
    "ticket-add": TicketsAddModal
  },
  methods: {
    handleOpenModal() {
      this.addModalState = true;
    },
    handleModalClose() {
      this.addModalState = false;
    },
    async handleFilter(e) {
      const { id, value } = e.target;
      this[id] = value;
      const res = await axios.get(
        `/api/customer?customerName=${this.customerName}&limit=${this.limit}&status=${this.status}&sortByDate=${this.sortByDate}`
      );
      this.tickets = res.data;
    },

    async handlePaginate(page) {
      this.page = page;
      try {
        const res = await axios.get(
          `/api/customer?customerName=${this.customerName}&page=${page}&limit=${this.limit}&status=${this.status}&sortByDate=${this.sortByDate}`
        );
        this.tickets = res.data;
      } catch (err) {
        // eslint-disable-next-line
        console.log(err);
      }
    }
  },
  async created() {
    const customerName = localStorage.getItem("customerName");
    if (!customerName || (customerName && customerName.length === 0)) {
      showToast(this.$toasted.show, "Please Register your name", "error");
      this.$router.push("/");
    } else {
      this.loadingData = true;
      this.customerName = customerName;
      try {
        const res = await axios.get(
          `/api/customer?customerName=${customerName}`
        );
        this.tickets = res.data;
        this.loadingData = false;
      } catch (err) {
        this.loadingData = false;
        // eslint-disable-next-line
        console.log(err);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  padding-top: 70px;
  &.loader-active {
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
    align-items: center;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
  }

  .filter {
    @extend .card-header;
    padding: 10px 0;

    .select {
      @extend .card-header;
      flex-direction: row;
      align-items: flex-end;

      h6 {
        padding: 0 5px;
      }
    }
  }
}
</style>