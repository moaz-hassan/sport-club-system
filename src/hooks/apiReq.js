import axios from "axios";
import store from "../components/store";
import {
  clearUserDataFromCookies,
  getDecryptedId,
  getUserDataFromCookies,
  storeEncryptedId,
  storeUserDataInCookies,
} from "../utils/storageUtils";

function ApiReq(
  endPoint,
  method = "GET",
  compoState = null,
  data = null,
  navigate = false
) {
  axios({
    method,
    url: `https://elkhazzansc.pythonanywhere.com/${endPoint}`,
    data,
  })
    .then((response) => {
      // if (endPoint === "api/login") {
      //   storeUserDataInCookies(response.data.data);
      // }
      compoState !== null ? compoState(response.data) : null;
      store.dispatch({ type: "resObj", payload: response.data });
      // response.data.status === "Success" ? alert("Success!") : null;
      console.log(store.getState());
      if (navigate) {
        navigate("/");
        response.data?.data.Member_ID !== undefined
          ? storeEncryptedId(response.data.data.Member_ID)
          : null;
        axios({
          method: "POST",
          url: `https://elkhazzansc.pythonanywhere.com/api/Get_UserData`,
          data: { id: Number(getDecryptedId()) },
        })
          .then((response) => {
            getUserDataFromCookies()
            clearUserDataFromCookies();
            storeUserDataInCookies(response.data.data);
          })
          .catch((error) => {
            console.error(
              "Error occurred:",
              error.response?.data || error.message
            );
          });
      }
      // location.reload();
      return response.data;
    })
    .catch((error) => {
      // alert("Failed!");
      console.error("Error occurred:", error.response?.data || error.message);
    });
}

export default ApiReq;
