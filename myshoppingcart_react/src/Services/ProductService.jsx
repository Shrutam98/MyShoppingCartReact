
import axios from 'axios'
import { productApi } from './api'

export const getCategories = () => {
    return productApi.productActions().fetchAllCategory()
}

export const getProducts = () => {
    return productApi.productActions().fetchAll()
}

export const addProduct = async (data) => {
    return productApi.productActions().create(data)
}

export const editProduct = async (id, data) => {
    return productApi.productActions().update(id, data)
}
export const deleteProduct = async id => {
    return productApi.productActions().delete(id)
} 