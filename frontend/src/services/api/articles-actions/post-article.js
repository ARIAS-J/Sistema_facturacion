import axios from "../../../axios-config";

export function postArticle(data) {
  return axios.post('/api/v1/articulos', data);
}