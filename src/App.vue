<template>
  <div id="app">
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
      crossorigin="anonymous"
    />

    <div class="container my-4 col-lg-6 col-xl-4">
      <div class="d-flex justify-content-center">
        <img
          src="https://memorar.fot.br/images/company/memorar.fot.br.png"
          alt="Memorar Logo"
          width="200px"
        />
      </div>
      <h1 class="h5 fw-bold text-center mt-1 mb-3">
        Crie sua conta na Memorar
      </h1>

      <form v-on:submit.prevent="onSubmit" id="create-account" class="row gx-1">
        <div class="form-floating mb-3">
          <input
            class="form-control"
            type="text"
            id="name"
            placeholder="Type your name"
            v-model="userForm.name"
            required
          /><label for="name"> Let us know your name </label>
        </div>

        <div class="form-floating mb-3">
          <input
            class="form-control"
            type="number"
            id="phoneNumber"
            placeholder="Type your phone number..."
            pattern="/^(\d{2})\D*(\d{5}|\d{4})\D*(\d{4})$/gm"
            v-model="userForm.phone"
            required
          /><label for="phoneNumber"> Please, Tell us your phone number</label>
        </div>

        <div class="form-floating mb-3 col-sm-6">
          <input
            class="form-control"
            type="date"
            id="birthday"
            v-model="userForm.birthDate"
            required
          /><label for="birthday">When you were born</label>
        </div>

        <div class="form-floating mb-3 col-sm-6">
          <input
            class="form-control"
            type="email"
            id="email"
            placeholder="example@example.com"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            v-model="userForm.email"
            required
          /><label for="email">Type here your e-mail</label>
        </div>

        <div class="form-floating col-sm-6">
          <input
            class="form-control"
            type="password"
            id="password"
            placeholder="3xample@E"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$"
            v-model="userForm.password"
            required
          />
          <label for="password">Choose a password</label>
        </div>

        <small class="ps-4 text-muted d-sm-none"
          >Your password must contain at least 8 characters, which is 1
          lowercase, 1 uppercase, 1 number and 1 symbol
        </small>

        <div class="form-floating col-sm-6">
          <input
            class="form-control"
            type="password"
            id="confirm-password"
            placeholder="*********"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$"
            v-model="userForm.confirmPassword"
            required
          /><label for="confirm-password"> Confirm password </label>
        </div>

        <small class="ps-4 mb-2 text-muted d-none d-sm-block"
          >Your password must have at least 8 characters, which is 1 lowercase,
          1 uppercase, 1 number and 1 symbol
        </small>

        <div class="form-floating my-3">
          <input
            class="form-control"
            type="text"
            id="CPF"
            placeholder="123.456.789.00"
            pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}"
            v-model="userForm.cpf"
            required
          /><label for="CPF">Type your CPF</label>
        </div>

        <div class="alert alert-danger" v-if="showErrorMessage">
          {{ errorMessage }}
        </div>

        <button
          type="submit"
          class="btn btn-primary p-3 px-5 w-auto m-auto bg-gradient"
        >
          Create Account
        </button>
      </form>
    </div>

    <div class="container my-4 col-lg-6 col-xl-8">
      <table id="cadastros" class="table table-striped mt-5">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Phone</th>
            <th scope="col">BirthDate</th>
            <th scope="col">E-mail</th>
            <th scope="col">CPF</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <th scope="row">{{ user.id }}</th>
            <td>{{ user.name }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.birthDate }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.cpf }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!--<Home test="Hello Vue!" />-->
  </div>
</template>


<script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
      crossorigin="anonymous">
</script>

<script>
import Home from "./components/Home.vue";

export default {
  name: "App",
  components: {
    Home,
  },
  data: () => {
    return {
      showErrorMessage: false,
      errorMessage: "Aconteceu algo errado.",
      userForm: {},
      users: [
        {
          id: 1,
          name: "Euller",
          email: "peixotoeuller500@gmail.com",
          phone: "81987430455",
          birthDate: "20/10/2001",
          cpf: "111.111.111-00",
        },
        {
          id: 2,
          name: "Morango",
          email: "morango500@gmail.com",
          phone: "323456323434",
          birthDate: "20/10/2099",
          cpf: "111.111.111-99",
        },
      ],
    };
  },
  methods: {
    onSubmit: function () {
      if (this.userForm.password != this.userForm.confirmPassword) {
        this.errorMessage = "As senhas não coincidem.";
        this.showErrorMessage = true;
        return;
      }
      this.showErrorMessage = false;
      this.users.push({ id: this.users.length + 1, ...this.userForm });
    },
  },
};
</script>

<style>
html,
body {
  font-family: "Work Sans", sans-serif;
}
#app {
  font-family: "Work Sans", sans-serif;
}
</style>
