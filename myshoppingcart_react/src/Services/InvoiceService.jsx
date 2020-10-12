import { api } from "Services/api";

const baseUrl = "https://localhost:44317/api/" + "Invoices/";

export const addInvoice = (data) => {
  return api.actions(baseUrl).create(data);
};
