import axios from "axios";

export function request(config) {
  const baseURL = "http://localhost:8080/ssm_project_war_exploded";
  const instance = axios.create({
    baseURL,
    timeout: 10000,
  });

  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      const { response } = error;
      if (!response) {
        error = { response: { statusText: "网络错误，请检查您的网络连接！" } };
      }
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const { response } = error;
      if (!response) {
        error = { response: { statusText: "网络错误，请检查您的网络连接！" } };
      }
      return Promise.reject(error);
    }
  );

  return instance(config); //  Promise
}
