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

        <button
          type="submit"
          class="btn btn-primary p-3 px-5 w-auto m-auto bg-gradient mt-5"
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
import Input from "./components/Input.vue";

export default {
  name: "App",
  components: {
    Input,
  },
  data: () => {
    return {
      showErrorMessage: false,
      errorMessage: "",
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
      inputTemplate: [
        {
          htmlClass: "form-floating mb-3",
          id: "name",
          type: "string",
          value: { name: "" },
          placeholder: "Conte-nos seu nome",
          errorMessage: "O campo não pode estar vazio.",
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
    onSubmit: function () {
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

      this.errorMessage = "";
      this.showErrorMessage = false;
      console.log(user);
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
