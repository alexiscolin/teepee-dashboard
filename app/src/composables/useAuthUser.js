import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

export const createPermission = (userInfos) => {
  // JWT added on request auth bearer by APOLLO setContext on api.js

  // 2/ rec info user + JWT dans persistant STORE ou sessions ou cookie
  cookies.set("token", userInfos.token);
  return new Promise((res) => {
    cookies.set("token", userInfos.token);
    res();
  });
  // 3/ redirection rooter sur la homepage "/"
};

export const checkPermission = () => {
  return new Promise((res, reject) => {
    if (cookies.isKey("token"))
      if (cookies.get("token")) {
        // access granted
        res();
      } else {
        reject(new Error("Then Token id wrong: Access denied."));
      }
  });
};

export const deletePersmision = () => {
  cookies.remove("token");
};
