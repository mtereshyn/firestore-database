<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <add-form />
</template>

<script>
import AddForm from "@/components/AddForm";

export default {
  name: "App",
  components: {
    AddForm,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
