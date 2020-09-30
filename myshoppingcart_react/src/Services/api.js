import axios from 'axios';

const baseUrl = "https://localhost:44317/api/"

export const categoryApi = {
    categoryActions(url = baseUrl + 'Categories/') { 
       return{
        fetchAll : () => axios.get(url),
        fetchById : id => axios.get(url + id),
        create : newRecord => axios.post(url,newRecord),
        update : (id,updateRecord) => axios.put(url + id , updateRecord),
        delete : id => axios.delete(url + id)
       } 
    }
}

export const productApi = {
    productActions(url = baseUrl + 'Products/') {    
       return{
        fetchAll : () => axios.get(url),
        fetchById : id => axios.get(url + id),
        create : newRecord => axios.post(url,newRecord),
        update : (id,updateRecord) => axios.put(url + id , updateRecord),
        delete : id => axios.delete(url + id),
        fetchAllCategory : () => axios.get(baseUrl + 'Categories/')
       } 
    }
}

