import axios from "axios";

const baseLink = axios.create({
  baseURL: "https://abitus-api.geia.vip",
  headers: {
    "Content-Type": "application/json",
  },
});

export default baseLink;