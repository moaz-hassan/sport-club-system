import axios from "axios";
import store from "../components/store";
import { storeEncryptedId } from "../utils/storageUtils";

function ApiReq(
  endPoint,
  method = "GET",
  compoState,
  data = null,
  navigate = false
) {
  axios({
    method,
    url: `https://elkhazzansc.pythonanywhere.com/${endPoint}`,
    data,
  })
    .then((response) => {
      compoState && compoState(response.data);
      store.dispatch({ type: "resObj", payload: response.data });
      response.data.status === "Success" ? alert("Success!") : null;
      console.log(store.getState());
      if (navigate) {
        navigate("/");
        response.data?.data.Member_ID !== undefined
          ? storeEncryptedId(response.data.data.Member_ID)
          : null;
      }
      return response.data;
    })
    .catch((error) => {
      // alert("Failed!");
      console.error("Error occurred:", error.response?.data || error.message);
    });
}

export default ApiReq;
