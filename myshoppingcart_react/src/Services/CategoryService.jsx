
import axios from 'axios'
import {categoryApi} from './api'

export const getCategories = () => {
    return categoryApi.categoryActions().fetchAll()
}

export const addCategory = async (data) => {
    return categoryApi.categoryActions().create(data)
} 

export const editCategory = async (id,data) => {
    return categoryApi.categoryActions().update(id,data)
} 
export const deleteCategory = async id => {
    return categoryApi.categoryActions().delete(id)
} 