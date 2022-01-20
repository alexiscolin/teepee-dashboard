<template>
  <div
    class="relative overflow-hidden max-w-screen-2xl w-full bg-white rounded-50 px-12 py-9"
  >
    <div class="absolute left-0 top-0 w-1/2 h-full bg-gray-100"></div>
    <header class="relative border-b-2 border-gray-300 pb-5">
      <img src="@/assets/img/logo.svg" class="w-[10vw]" />
    </header>
    <main class="relative grid grid-cols-4">
      <div
        class="col-start-1 col-span-2 row-start-1 flex justify-center items-center"
      >
        <global-form @form-submit="formAction">
          <template #header>
            <div class="flex justify-between items-center px-2">
              <h2 class="font-geo font-bold text-40">Contenu</h2>
              <div class="text-"><span>1 </span>—<span> 4</span></div>
            </div>
          </template>
          <template #inputs>
            <div
              v-for="(
                { placeholder, type, name, display, rules }, key
              ) in forms"
              :key="key"
            >
              <input-text
                :placeholder="placeholder"
                :type="type"
                :name="name"
                :rules="rules"
                :display="display"
              />
            </div>
          </template>
        </global-form>
      </div>
      <div
        class="col-start-2 col-span-3 row-start-1 flex justify-end pointer-events-none"
      >
        <img
          src="@/assets/img/illustration.png"
          srcset="../../assets/img/illustration@2x.png 2x"
          alt="Photo illustrant la tranquilité"
          class="w-4/5 pt-2"
        />
      </div>
    </main>
  </div>
</template>

<script>
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";

import InputText from "@/components/common/ui/InputText.vue";
import GlobalForm from "../../components/common/ui/GlobalForm.vue";

import { createPermission } from "@/composables/useAuthUser";

export default {
  name: "InputName",
  components: { InputText, GlobalForm },

  setup() {
    // fields needed for the form
    const forms = [
      {
        type: "text",
        name: "username",
        display: "input",
        rules: "required",
        placeholder: "Nom d'utilisateur",
      },
      {
        type: "email",
        display: "input",
        name: "email",
        rules: "required|email",
        placeholder: "Adresse email",
      },
      {
        type: "password",
        name: "password",
        display: "input",
        rules: "required|min:8",
        placeholder: "Mot de passe",
      },
    ];

    // dynamic reactive fields for the form
    // -> "name" fields become reactives to bind them to the graphQL req
    const fields = forms.reduce(
      (prev, field) => ({
        ...prev,
        [field.name]: ref(""),
      }),
      {}
    );

    // GraphQL Mutation signin req schema
    const { mutate: createUser } = useMutation(
      gql`
        mutation CreateUser(
          $password: String!
          $username: String
          $email: String!
        ) {
          createUser(password: $password, username: $username, email: $email) {
            token
            user {
              id
            }
          }
        }
      `,
      // reactive application of Fields (above)
      () => ({
        variables: {
          ...Object.entries(fields).reduce(
            (prev, field) => ({
              ...prev,
              [field[0]]: field[1].value,
            }),
            {}
          ),
        },
      })
    );

    // createUser().then(({ data: { createUser: user } }) =>
    //   createPermission(user)
    // );

    // Methods handled when the form is submited (-> $event)
    const formAction = (values) => {
      // bind formAction values to the graphQL thanks to fields reactive array
      for (const [key, val] of Object.entries(values)) {
        fields[key].value = val;
      }

      return createUser().then(({ data: { createUser: user } }) => {
        return createPermission(user);
      });

      //   $auth.create();
    };

    return {
      forms,
      formAction,
    };
  },
};
</script>

<style></style>
