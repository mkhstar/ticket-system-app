<template>
  <header class="jumbotron my-4 container">
    <h1 class="display-4">A Warm Welcome!</h1>
    <p
      class="lead"
    >Welcome to our platform where you can share your concerns to the creators of this application</p>
    <div v-if="customerName.length === 0">
      <form @submit.prevent="handleSubmit" autocomplete="off">
        <div class="form-group">
          <label for="customerName">Register Your Name</label>
          <input
            type="text"
            @change="handleChange"
            id="customerName"
            v-model="customerNameInput"
            :class="['form-control', 'fluid', {'is-invalid': errorClass}]"
            placeholder="Enter Your Name..."
          />
          <div class="invalid-feedback">{{errors}}</div>
        </div>
        <button class="btn btn-primary btn-block">Submit</button>
      </form>
    </div>
    <div v-else>
      <h3 class="my-2">{{customerName}}</h3>
      <router-link exact to="/tickets">Go to Submit Ticket</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "welcome",
  data() {
    return {
      customerName: "",
      customerNameInput: "",
      errors: "",
      errorClass: false
    };
  },
  methods: {
    handleSubmit() {
      if (this.customerNameInput.length === 0) {
        this.errors = "Full Name field is required";
        this.errorClass = true;
      } else {
        localStorage.setItem("customerName", this.customerNameInput);
        this.customerName = this.customerNameInput;
        this.customerNameInput = "";
      }
    },
    handleChange() {
      if (this.errors.length > 0) this.errors = "";
      if (this.errorClass === true) this.errorClass = false;
    }
  },
  created() {
    const customerName = localStorage.getItem("customerName");
    if (customerName) this.customerName = customerName;
    else this.customerName = "";
  }
};
</script>

<style lang="scss" scoped>
</style>