import { ref } from "vue";

// constants layout (symbol to avoid rewritting on assigment)
export const LAYOUT = {
  default: Symbol("default"),
  settings: Symbol("settings"),
};

// reactive data
const layout = ref(LAYOUT.default);

// set layout function
const setLayout = (layoutType) => {
  console.log(layoutType);
  layout.value = layoutType;
};

export const useLayout = () => {
  console.log(LAYOUT);
  return {
    LAYOUT,
    layout,
    setLayout,
  };
};
