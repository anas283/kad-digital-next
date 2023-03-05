import axios from "axios";
let url;
if(typeof window !== "undefined") {
  url = window.location.origin;
}
const local = "http://localhost:8080";
const production = "https://kad-digital.up.railway.app/";
let api_url = "";

if(url === "http://localhost:3000") {
  api_url = local;
} 
else {
  api_url = production;
}

const api = axios.create({
  baseURL: api_url,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
