<template>
  <div
    class="relative bg-white rounded-full mt-6 p-2 pt-5 pl-14 flex after:block after:absolute after:h-4/6 after:border-l after:border-solid after:border-current after:top-1/2 after:left-10 after:-translate-y-1/2"
  >
    <div
      class="codec-y-center absolute flex items-center top-1/2 origin-left transition-transform -translate-y-1/2 pointer-events-none"
      :class="{
        'is-up': value || focused,
      }"
    >
      <label :for="name" class="">{{ placeholder }}</label>
      <span class="pl-2 text-12 text-red-700">{{ errorMessage }}</span>
    </div>

    <input
      :id="name"
      v-model="value"
      :as="display"
      :type="type"
      class="codec-y-center w-full h-[2ch] outline-none"
      @focus="focused = true"
      @blur="focused = false"
    />
  </div>
</template>

<script>
import { useField } from "vee-validate";
import { ref } from "vue";

export default {
  props: {
    placeholder: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      default: "text",
    },
    name: {
      type: String,
    },
    display: {
      type: String,
    },
    rules: [Object, String],
  },
  setup(props) {
    const focused = ref(false);

    const { errorMessage, value } = useField(props.name, props.rules);

    return { focused, value, errorMessage };
  },
};
</script>
<style scoped>
.is-up {
  transform: translateY(-100%) scale(0.6);
}
</style>
