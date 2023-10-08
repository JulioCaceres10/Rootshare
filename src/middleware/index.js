import store from "@/store";

const authToken = async (token) => {
  let error = false;
  await fetch("https://api-rootshare.onrender.com/admin", {
    credentials: "include",
    headers: {
      "content-Type": "application/json",
      "authToken": token
    },
  })
    .then(async (response) => {
      const resDB = await response.json();
      if (resDB.error) {
        store.commit("setToken", false);
        error = resDB.error
        
      }
    })
    .catch((err) => console.log(err));
  return error;
};

export default authToken;
