<template>
  <div id="app">
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
          Criar conta
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
            <td v-if="user.phone">{{ user.phone }}</td>
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
import { getData, sendData } from "../services/userData";
import Input from "./components/Input.vue";

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
      errorMessage: "",
      status: "",
      users: "",
      inputTemplate: [
        {
          htmlClass: "form-floating mb-3",
          id: "name",
          type: "string",
          value: { name: "" },
          placeholder: "Conte-nos seu nome",
          errorMessage: "O campo deve ter no mínimo 3 caracteres.",
        },
        {
          htmlClass: "form-floating mb-3",
          id: "phone",
          type: "number",
          value: { name: "" },
          placeholder: "Precisamos de seu telefone",
          errorMessage: "Insira um telefone válido.",
        },
        {
          htmlClass: "form-floating mb-3 col-sm-6",
          id: "birthDate",
          type: "date",
          value: { name: "" },
          placeholder: "Data de nascimento",
          errorMessage: "Insira uma data válida.",
        },
        {
          htmlClass: "form-floating mb-3 col-sm-6",
          id: "email",
          type: "email",
          value: { name: "" },
          placeholder: "Digite seu e-mail",
          errorMessage: "Insira um e-mail válido.",
        },
        {
          htmlClass: "form-floating col-sm-6",
          id: "password",
          type: "password",
          value: { name: "" },
          placeholder: "Digite uma senha",
          errorMessage: "O formato da senha está inválido.",
        },
        {
          htmlClass: "form-floating col-sm-6",
          id: "confirm-password",
          type: "password",
          value: { name: "" },
          placeholder: "Confirme sua senha",
          errorMessage: "O formato da senha está inválido.",
        },
        {
          htmlClass: "form-floating my-3",
          id: "cpf",
          type: "text",
          value: { name: "" },
          placeholder: "Digite seu CPF",
          errorMessage: "Insira um CPF válido.",
        },
      ],
    };
  },
  methods: {
    onSubmit: async function () {
      const getDataFromTemplate = this.inputTemplate.map((item) => {
        return item.value.name;
      });

      const user = {
        name: getDataFromTemplate[0],
        phone: getDataFromTemplate[1],
        birthDate: getDataFromTemplate[2],
        email: getDataFromTemplate[3],
        password: getDataFromTemplate[4],
        confirmPassword: getDataFromTemplate[5],
        cpf: getDataFromTemplate[6],
      };

      if (user.password != user.confirmPassword) {
        this.errorMessage = "As senhas não coincidem.";
        this.showErrorMessage = true;
        return;
      }

      try {
        this.status = await sendData(
          `http://localhost:9090/user/create-user/name=${user.name}&phone=${user.phone}&birthDate=${user.birthDate}&email=${user.email}&password=${user.password}&cpf=${user.cpf}`
        );

        this.users = await getData("/all-users");

        this.errorMessage = "";
        this.showErrorMessage = false;
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
