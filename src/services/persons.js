import axios from "axios";

const baseurl = "http://localhost:3001/api/persons";

const getAll = () => {
  const request = axios.get(baseurl);
  return request.then((res) => res.data);
};

const create = (newObj) => {
  const request = axios.post(baseurl, newObj);
  return request.then((response) => response.data);
};

const destroy = (id) => {
  const request = axios.delete(`${baseurl}/${id}`);
  return request;
};

const update = (id, updatedPerson) => {
  const request = axios.put(`${baseurl}/${id}`, updatedPerson);
  return request.then((res) => res.data);
};

const exportedObj = { getAll, create, destroy, update };

export default exportedObj;
