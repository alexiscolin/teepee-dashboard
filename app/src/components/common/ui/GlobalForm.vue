<template>
  <form class="w-1/2" @submit="onSubmit">
    <div>
      <slot name="header"></slot>
      <slot name="inputs"></slot>

      <button
        class="bg-black w-full rounded-full mt-8 font-geo font-bold p-3.5 text-gray-50 cursor-pointer"
      >
        Continuer
      </button>
    </div>
  </form>
</template>

<script>
import { useForm } from "vee-validate";

export default {
  emits: {
    formSubmit: null,
  },
  setup(props, { emit }) {
    const { handleSubmit } = useForm();
    const onSubmit = handleSubmit((values) => {
      emit("formSubmit", values);
    });

    return {
      onSubmit,
    };
  },
};
</script>
