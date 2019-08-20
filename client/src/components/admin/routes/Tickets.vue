<template>
  <layout>
    <section :class="['main-wrapper' ,'container',{'loader-active': loadingData}]">
      <div v-if="loadingData === true" class="spinner-border" style="width: 3rem; height: 3rem;" />
      <div v-else-if="loadingData === false && tickets.docs">
        <div class="card mb-3">
          <div class="card-header">
            <h5>Posted Tickets</h5>
          </div>
          <div class="card-body">
            <div class="filter">
              <h5>Filter</h5>
              <div class="search">
                <h6>Search</h6>
                <div class="input-group">
                  <input
                    class="form-control"
                    @keyup="handleFilterChange"
                    type="text"
                    id="search"
                    placeholder="Search..."
                  />
                </div>
              </div>
              <div class="select">
                <h6>Status</h6>
                <select @change="handleFilterChange" class="custom-select" id="status">
                  <option value=".*">All</option>
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div class="select">
                <h6>Date</h6>
                <select @change="handleFilterChange" class="custom-select" id="sortByDate">
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
                    <th>Full Name</th>
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
  </layout>
</template>

<script>
import Layout from "../Layout";
import axios from "axios";
import TicketsRow from "../blocks/tickets/TicketsRow";
import Paginate from "vuejs-paginate";

export default {
  name: "ticket",
  data() {
    return {
      search: ".*",
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
    "ticket-row": TicketsRow
  },
  methods: {
    handleOpenModal() {
      this.addModalState = true;
    },
    handleModalClose() {
      this.addModalState = false;
    },
    async handleFilterChange(e) {
      const { id, value } = e.target;
      if (value.trim() === "") this[id] = ".*";
      else this[id] = value;
      const res = await axios.get(
        `/api/admin?search=${this.search}&limit=${this.limit}&status=${this.status}&sortByDate=${this.sortByDate}`
      );
      this.tickets = res.data;
    },

    async handlePaginate(page) {
      this.page = page;
      try {
        const res = await axios.get(
          `/api/admin?search=${this.search}&page=${page}&limit=${this.limit}&status=${this.status}&sortByDate=${this.sortByDate}`
        );
        this.tickets = res.data;
      } catch (err) {
        // eslint-disable-next-line
        console.log(err);
      }
    }
  },
  async created() {
    try {
      const res = await axios.get(`/api/admin`);
      this.tickets = res.data;
      this.loadingData = false;
    } catch (err) {
      this.loadingData = false;
      // eslint-disable-next-line
      console.log(err);
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

    .select,
    .search {
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