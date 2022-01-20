import { defineAsyncComponent } from "vue";

export const registerBaseComponents = (vm) => {
  try {
    // Require base component context (in Vite style)
    const requireComponent = import.meta.glob(
      "../components/base/**/Base*.vue" // Base component must start with "Base"
    );

    // Loop over base component and register them
    for (let component in requireComponent) {
      // remove path around the filename
      const componentName = component.slice(0, component.length - 4).slice(19);
      // rec in async way
      vm.component(
        componentName,
        defineAsyncComponent(requireComponent[component])
      );
    }
  } catch (err) {
    console.log("Base component registration failed");
    console.error(err);
  }
};
