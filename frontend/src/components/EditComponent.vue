<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h3 class="text-center">Actualizar Multiplicación</h3>
      <form @submit.prevent="handleUpdateForm">
        <div class="form-group">
          <label>Multiplicando</label>
          <input
            type="number"
            class="form-control"
            v-model="multiplicacion.multiplicando"
            required
          />
        </div>

        <div class="form-group">
          <label>Multiplicador</label>
          <input
            type="number"
            class="form-control"
            v-model="multiplicacion.multiplicador"
            required
          />
        </div>

        <div class="form-group">
          <label>Resultado</label>
          <input
            type="text"
            class="form-control"
            v-model="multiplicacion.resultado"
            required
          />
        </div>

        <div class="form-group">
          <label>Producto</label>
          <input
            type="number"
            class="form-control"
            v-model="multiplicacion.producto"
            required
          />
        </div>

        <div class="form-group">
          <button class="btn btn-danger btn-block">Actualizar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      multiplicacion: {},
    };
  },
  created() {
    let apiURL = `https://multiplicando-com.herokuapp.com/api/edit-multiplicacion/${this.$route.params.id}`;

    axios.get(apiURL).then((res) => {
      this.multiplicacion = res.data;
    });
  },
  methods: {
    handleUpdateForm() {
      let apiURL = `https://multiplicando-com.herokuapp.com/api/update-multiplicacion/${this.$route.params.id}`;

      axios
        .put(apiURL, this.multiplicacion)
        .then((res) => {
          console.log(res);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
