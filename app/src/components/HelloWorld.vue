<template>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button type="button" @click="count++">count is: {{ count * 2 }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
  <button @click.prevent="setLayout(LAYOUT.default)">Go to Home</button>
  <button @click.prevent="setLayout(LAYOUT.settings)">got to settiongs</button>
  <h1 class="text-4xl font-bold underline">Hello world!</h1>
</template>

<script>
import { ref } from "vue";
import { useLayout } from "@/composables/useLayout";

export default {
  props: {
    msg: String,
  },
  setup() {
    console.log(useLayout());
    const { LAYOUT, setLayout } = useLayout();
    console.log(LAYOUT);

    const count = ref(0);

    return {
      LAYOUT,
      setLayout,
    };
  },
};
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
