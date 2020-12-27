import { request } from "./index";
import { to } from "../utils";

const doReq = async (url, method = "GET", datas = {}) => {
  let [err, data] = await to(request({ url, method, data: datas }));
  if (err) {
    console.log("error: 加载错误");
    return false;
  } else {
    return data;
  }
};

export default doReq;
