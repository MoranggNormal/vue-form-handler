<template>
  <div id="app">
    <header
      class="
        d-flex
        flex-wrap
        align-items-center
        justify-content-center
        mb-4
        border-bottom
        bg-primary
      "
    >
      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li>
          <a
            href="https://github.com/MoranggNormal/vue-form-handler"
            class="nav-link px-2 link-light"
          >
            <font-awesome-icon
              icon="fa-brands fa-github"
              size="2x"
              fixed-width
              swap-opacity
          /></a>
        </li>

        <li>
          <a
            href="https://www.facebook.com/euller.peixoto.18"
            class="nav-link px-2 link-light"
            ><font-awesome-icon
              icon="fa-brands fa-facebook"
              size="2x"
              fixed-width
              swap-opacity
          /></a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/euller-peixoto"
            class="nav-link px-2 link-light"
            ><font-awesome-icon
              icon="fa-brands fa-linkedin"
              size="2x"
              fixed-width
              swap-opacity
          /></a>
        </li>
        <li>
          <a href="http://epeixoto.me" class="nav-link px-2 link-light">
            <font-awesome-icon
              icon="fa-solid fa-square-arrow-up-right"
              size="2x"
              fixed-width
              swap-opacity
            />
          </a>
        </li>
      </ul>
    </header>

    <div class="container mt-5 mb-4 col-lg-6 col-xl-4">
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
        <Input
          v-for="(props, index) in inputTemplate"
          :key="index"
          :type="props.type"
          :id="props.id"
          :placeholder="props.placeholder"
          :errorMessage="props.errorMessage"
          :htmlClass="props.htmlClass"
          :value="props.value"
        />

        <div class="alert alert-danger" v-if="showErrorMessage">
          {{ errorMessage }}
        </div>

        <div
          id="alertResponse"
          ref="alertResponse"
          class="alert"
          v-bind:class="{
            'alert-success': status === 200,
            'alert-danger': status != 200,
          }"
          v-if="status"
        >
          {{
            status === 200
              ? "Dados enviados"
              : "Ocorreu algo errado, tente novamente."
          }}
        </div>

        <button
          type="submit"
          class="btn btn-primary p-3 px-5 w-auto m-auto bg-gradient mt-5"
        >
          {{ loading ? "Enviando..." : "Criar conta" }}
        </button>
      </form>
    </div>

    <div class="container table my-4 col-lg-6 col-xl-8">
      <table id="cadastros" class="table table-striped mt-5" v-if="users">
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
  </div>
</template>


<script>
import Vue from "vue";
import titleMixin from "./mixins/titleMixin";
import { getData, sendData, verifyEmail } from "../services/userData";
import Input from "./components/Input.vue";
import inputTemplate from "./utils/inputTemplate";

Vue.mixin(titleMixin);

export default {
  name: "App",
  title: "Criar minha conta na Memorar",
  components: {
    Input,
  },
  data: () => {
    return {
      showErrorMessage: false,
      loading: false,
      errorMessage: "",
      status: "",
      users: "",
      inputTemplate: inputTemplate,
    };
  },
  methods: {
    onSubmit: async function () {
      // Store typed data into an array and then ...
      const getDataFromTemplate = this.inputTemplate.map((item) => {
        return item.value.name;
      });

      // ... into an object
      const user = {
        name: getDataFromTemplate[0],
        phone: getDataFromTemplate[1],
        birthDate: getDataFromTemplate[2],
        email: getDataFromTemplate[3],
        password: getDataFromTemplate[4],
        confirmPassword: getDataFromTemplate[5],
        cpf: getDataFromTemplate[6],
      };

      // Verify pattern before continue...
      if (
        user.name.length < 3 ||
        !user.phone.match(/^(\d{2})\D*(\d{5}|\d{4})\D*(\d{4})$/gm) ||
        !user.birthDate.length ||
        !user.email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/) ||
        !user.password.match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$/
        ) ||
        !user.confirmPassword.match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$/
        ) ||
        !user.cpf.match(/\d{3}\.?\d{3}\.?\d{3}-?\d{2}/)
      ) {
        return;
      }

      // Set loading status
      this.loading = true;

      // Return if passwords dont match
      if (user.password != user.confirmPassword) {
        this.errorMessage = "As senhas não coincidem.";
        this.showErrorMessage = true;
        this.loading = false;
        return;
      }

      // Return if email already exists
      if (await verifyEmail(user.email)) {
        this.errorMessage = "Este email já esta em uso.";
        this.showErrorMessage = true;
        this.loading = false;
        return;
      }

      // Post to API with user data and imediatly get this data and store in users
      try {
        this.status = await sendData(
          `http://localhost:9090/user/create-user/name=${user.name}&phone=${user.phone}&birthDate=${user.birthDate}&email=${user.email}&password=${user.password}&cpf=${user.cpf}`
        );

        const getNewUser = await getData("/last-created-user");

        this.users = [...getNewUser, ...this.users];

        this.errorMessage = "";
        this.showErrorMessage = false;
        this.loading = false;
      } catch (error) {
        return error;
      }

      // Scroll down to see newly users
      const alertResponse = this.$refs.alertResponse;
      if (this.status === 200) {
        alertResponse.scrollIntoView({
          behavior: "smooth",
        });
      }

      // Timeout function to remove status alert
      setTimeout(() => {
        this.status = "";
      }, 5000);
    },
  },
  async created() {
    try {
      this.users = await getData("/all-users");
    } catch (e) {
      console.log(e);
    }
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

.table {
  overflow: auto;
}
</style>
