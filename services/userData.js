import { baseUrl } from "./baseUrl";

const getData = async (url) => {
  try {
    const response = await baseUrl.get(url);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

const sendData = async (url) => {
  try {
    const response = await baseUrl.post(url);
    return response.status;
  } catch (e) {
    return e;
  }
};

const verifyEmail = async (email) => {
  try {
    const response = await baseUrl.get(`/email=${email}`);
    return response.data.length;
  } catch (e) {
    return e;
  }
};

export { getData, sendData, verifyEmail };
