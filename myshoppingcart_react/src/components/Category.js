import React, { useState, useEffect } from 'react';
import CategoryForm from './CategoryForm'
import CategoryList from './CategoryList'
import { Grid } from '@material-ui/core'
import axios from 'axios'
import { ToastProvider } from 'react-toast-notifications'

const Category = (props) => {
    const baseUrl = "https://localhost:44317/api/"
    const [category, setCategory] = useState([])
    useEffect(() => {
        getCategories();
    }, [])
    // const refresh = useEffect(() => {
    //     getCategories()
    //  }, [])
    const getCategories = async () => {
        const result = await axios.get(baseUrl + 'Categories/')
        setCategory(result.data)
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={6}>
                    <ToastProvider autoDismiss={true}>
                        <CategoryForm category={category} setCategory={setCategory} getCategory={getCategories} />
                    </ToastProvider>
                </Grid>
                <Grid item xs={6}>
                    <CategoryList categoryList={category} getCategoryList={getCategories} />
                </Grid>
            </Grid>
        </div>
    )
}

export default Category
