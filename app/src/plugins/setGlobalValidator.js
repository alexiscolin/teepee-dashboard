import { configure, defineRule } from "vee-validate";
import { localize, setLocale } from "@vee-validate/i18n";
import { required, email, min } from "@vee-validate/rules";

export default function setGlobalValidator() {
  defineRule("required", required);
  defineRule("email", email);
  defineRule("min", min);

  configure({
    generateMessage: localize({
      fr: {
        messages: {
          required: "Champs requis",
          email: "Email incorrect",
          min: "0:{min} caractères min",
        },
      },
    }),
  });

  setLocale("fr");

  console.log("vee loaded");
}
