<template>
  <form @submit.prevent="handleSubmit" :class="['modal',{show:modalState ===true }]">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Admin Reply to ticket</h5>
          <button @click="handleClose" type="button" class="close">X</button>
        </div>
        <div class="modal-body">
          <h6>Status</h6>
          <div class="input-group mb-2">
            <select class="custom-select" name="status" id="status" :selected="ticket.status">
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div>
            <label for="message">
              <h6>Reply Message</h6>
            </label>
            <textarea
              required
              id="message"
              name="message"
              v-model="(ticket.adminResponse || {}).message"
              :class="['form-control', 'fluid', {'is-invalid': errors.message}]"
              placeholder="Enter Message..."
            />
            <div class="invalid-feedback">{{errors.message}}</div>
          </div>

          <div class="custom-file my-1">
            <input
              type="file"
              :class="['custom-file-input', 'fluid', {'is-invalid': errors.file}]"
              id="filesUploadedAdmin"
              @change="handleFileChange"
              name="filesUploadedAdmin"
            />
            <label
              class="custom-file-label"
              for="filesUploadedAdmin"
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
      fileName: this.ticket.filesUploadedAdmin
        ? this.ticket.filesUploadedAdmin[0]
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
      try {
        const res = await axios.put(`/api/admin/${this.ticket._id}`, formData);
        showToast(
          this.$toasted.show,
          "Successfully replied to ticket",
          "success"
        );
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