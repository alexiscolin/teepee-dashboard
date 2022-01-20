export const postUser = () => {
  return setTimeout(
    () => ({
      // shitty mock
      name: "Alexis Colin",
      token: "123456789",
    }),
    1000
  );
};
