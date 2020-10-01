import { api } from "./api";

const baseUrl = "https://localhost:44317/api/" + "Products/";
const baseUrlCategory = "https://localhost:44317/api/" + "Categories/";

export const getCategories = () => {
  return api.actions(baseUrlCategory).fetchAllCategory();
};

export const getProducts = () => {
  return api.actions(baseUrl).fetchAll();
};

export const addProduct = async (data) => {
  return api.actions(baseUrl).create(data);
};

export const editProduct = async (id, data) => {
  return api.actions(baseUrl).update(id, data);
};
export const deleteProduct = async (id) => {
  return api.actions(baseUrl).delete(id);
};
