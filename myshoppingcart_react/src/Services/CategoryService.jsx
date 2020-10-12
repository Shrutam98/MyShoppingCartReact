import { api } from "Services/api";

const baseUrl = "https://localhost:44317/api/" + "Categories/";

export const getCategories = () => {
  return api.actions(baseUrl).fetchAll();
};
export const addCategory = async (data) => {
  return api.actions(baseUrl).create(data);
};

export const editCategory = async (id, data) => {
  return api.actions(baseUrl).update(id, data);
};
export const deleteCategory = async (id) => {
  return api.actions(baseUrl).delete(id);
};
