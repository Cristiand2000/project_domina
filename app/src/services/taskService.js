import axios from 'axios';

const API_URL = 'http://localhost:3000/api/tasks'; 

export const getTasks = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createTask = async (task) => {
  return await axios.post(API_URL, task);
};

export const deleteTask = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
