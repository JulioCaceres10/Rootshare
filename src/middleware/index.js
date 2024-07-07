import store from "@/store";

const authToken = async (token) => {
  let error = false;
  await fetch("https://api-rootshare.up.railway.app/admin", {
    credentials: "include",
    headers: {
      "content-Type": "application/json",
      "authToken": token
    },
  })
    .then(async (response) => {
      const resDB = await response.json();
      if (resDB.error) {
        store.commit("setToken", null);
        error = resDB.error
        
      }
    })
    .catch((err) => console.log(err));
  return error;
};

export default authToken;
