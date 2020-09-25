import React from 'react'
import ProductForm from './ProductForm'
import ProductList from './ProductList'
import { Grid } from '@material-ui/core'

function Product() {
    return (
        <div>
            <Grid container>
                <Grid item xs={6}>
                    <ProductForm />
                </Grid>
                <Grid item xs={6}>
                    <ProductList />
                </Grid>
            </Grid>
        </div>
    )
}

export default Product
