<template>
  <div class="row">
    <div class="col-md-12">
      <table class="table table-striped">
        <thead class="thead-dark">
          <tr>
            <th>Multiplicando</th>
            <th>Multiplicador</th>
            <th>Resultado</th>
            <th>Producto Correcto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="multiplicacion in Multiplicaciones" :key="multiplicacion._id">
            <td>{{ multiplicacion.multiplicando }}</td>
            <td>{{ multiplicacion.multiplicador }}</td>
            <td>{{ multiplicacion.resultado }}</td>
            <td>{{ multiplicacion.producto }}</td>
            <td>
              <router-link
                :to="{ name: 'edit', params: { id: multiplicacion._id } }"
                class="btn btn-success"
                >Edit
              </router-link>
              <button
                @click.prevent="deleteMultiplicacion(multiplicacion._id)"
                class="btn btn-danger"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      Multiplicaciones: [],
    };
  },
  created() {
    let apiURL = "https://secure-ocean-09967.herokuapp.com/api";
    axios
      .get(apiURL)
      .then((res) => {
        this.Multiplicaciones = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    deleteMultiplicacion(id) {
      let apiURL = `https://secure-ocean-09967.herokuapp.com/api/delete-multiplicacion/${id}`;
      let indexOfArrayItem = this.Multiplicaciones.findIndex((i) => i._id === id);

      if (window.confirm("Realmente quiere eliminar el registro?")) {
        axios
          .delete(apiURL)
          .then(() => {
            this.Multiplicaciones.splice(indexOfArrayItem, 1);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style>
.btn-success {
  margin-right: 10px;
}
</style>