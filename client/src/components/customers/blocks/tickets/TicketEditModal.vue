<template>
  <form @submit.prevent="handleSubmit" :class="['modal',{show:modalState ===true }]">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Submit A Ticket</h5>
          <button @click="handleClose" type="button" class="close">X</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="subject">Subject</label>
            <input
              type="text"
              required
              v-model="ticket.subject"
              id="subject"
              name="subject"
              :class="['form-control', 'fluid', {'is-invalid': errors.subject}]"
              placeholder="Enter Subject..."
            />
            <div class="invalid-feedback">{{errors.subject}}</div>
          </div>
          <div class="my-1">
            <label for="message">Message</label>
            <textarea
              required
              id="message"
              name="message"
              v-model="ticket.message"
              :class="['form-control', 'fluid', {'is-invalid': errors.message}]"
              placeholder="Enter Message..."
            />
            <div class="invalid-feedback">{{errors.message}}</div>
          </div>

          <div class="custom-file my-1">
            <input
              type="file"
              :class="['custom-file-input', 'fluid', {'is-invalid': errors.file}]"
              id="filesUploadedCustomer"
              @change="handleFileChange"
              name="filesUploadedCustomer"
            />
            <label
              class="custom-file-label"
              for="filesUploadedCustomer"
            >{{fileName || "Upload file..."}}</label>
            <div class="invalid-feedback">{{errors.file}}</div>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="handleClose" type="button" class="btn btn-secondary">Close</button>
          <button class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import showToast from "../../../../utils/showToast";
export default {
  name: "ticket-edit",
  props: ["modalState", "ticket"],
  data() {
    return {
      errors: {},
      fileName: this.ticket.filesUploadedCustomer
        ? this.ticket.filesUploadedCustomer[0]
        : ""
    };
  },
  methods: {
    handleClose() {
      this.$emit("close-modal");
    },
    handleFileChange(e) {
      this.fileName = e.target.value.replace(/.*[/\\]/, "");
    },
    async handleSubmit(e) {
      const formData = new FormData(e.target);
      formData.append("customerName", localStorage.getItem("customerName"));
      try {
        const res = await axios.put(
          `/api/customer/${this.ticket._id}`,
          formData
        );
        showToast(this.$toasted.show, "Successfully edited ticket", "success");
        this.$emit("close-modal", res.data);
      } catch (err) {
        if (err.response) this.errors = err.response.data;
        else showToast(this.$toasted.show, "Something went wrong", "error");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  animation: fadeIn 0.3s ease-in;
  background-color: rgba(0, 0, 0, 0.6);
  &.show {
    display: block;
  }
}
@keyframes fadeIn {
  from {
    background-color: rgba(0, 0, 0, 0.2);
  }
  to {
    background-color: rgba(0, 0, 0, 0.6);
  }
}
</style>