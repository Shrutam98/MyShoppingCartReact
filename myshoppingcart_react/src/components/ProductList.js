import React, { useState, useEffect } from 'react';
import ProductForm from './ProductForm'
import { Container, Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from '@material-ui/core';
import axios from 'axios'
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { ToastProvider } from 'react-toast-notifications'

const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem",
            color: 'white',
            background: '#3f51b5'
        },
        "& .MuiTableContainer-root": {
            marginTop: "15px"
        },
        "& .MuiTable-root": {
            marginTop: "30px"
        },
        " &.ProductForm-root-15 .MuiGrid-grid-xs-10 ": {
            marginTop: "25px"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})


const ProductList = ({ classes, props }) => {
    const baseUrl = "https://localhost:44317/api/"
    const [product, setProduct] = useState([])
    const [currentId, setCurrentId] = useState(0)
    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        const result = await axios.get(baseUrl + 'Products/')
        setProduct(result.data)
    }
    const DeleteRecord = id => {
        if (window.confirm("Are you sure to delete this record?"))

            axios.delete(baseUrl + `Products/${id}`)
                .then(data => {
                    getProducts()
                })
                .catch(error => console.log(error))

    }

    return (
        <div>
            <Container maxWidth="md">
                <Paper className={classes.paper} elevation={3}>
                    <Grid container >
                        <Grid item xs={6}>
                            <ToastProvider autoDismiss={true}>
                                <ProductForm product={product} setProduct={setProduct} getProducts={getProducts} currentId={currentId} />
                            </ToastProvider>
                        </Grid>

                        <Grid item xs={6}>
                            <h1 className="categoryTitle">List of Products</h1>
                            <hr />
                            <div className="tableMargin">
                                <TableContainer>
                                    <Table>
                                        <TableHead className={classes.root}>
                                            <TableRow>
                                                <TableCell>Id</TableCell>
                                                <TableCell>Product</TableCell>
                                                <TableCell>Category</TableCell>
                                                <TableCell>Price</TableCell>
                                                <TableCell>Quantity</TableCell>
                                                <TableCell>Discount</TableCell>
                                                <TableCell>GST</TableCell>
                                                <TableCell>Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                product.map((record, index) => {

                                                    return (
                                                        <TableRow key={index} hover>
                                                            <TableCell>{index + 1}</TableCell>
                                                            <TableCell>{record.productName}</TableCell>
                                                            <TableCell>{record.categoryId}</TableCell>
                                                            <TableCell>{record.price}</TableCell>
                                                            <TableCell>{record.quantity}</TableCell>
                                                            <TableCell>{record.discount}</TableCell>
                                                            <TableCell>{record.gst}</TableCell>
                                                            <TableCell>
                                                                <ButtonGroup variant="text">
                                                                    <Button onClick={() => setCurrentId(record.productId)}><EditIcon color="primary" /></Button>
                                                                    <Button onClick={() => DeleteRecord(record.productId)}><DeleteIcon color="secondary" /></Button>
                                                                </ButtonGroup>
                                                            </TableCell>

                                                        </TableRow>
                                                    )
                                                })
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                            {/* <TablePagination /> */}
                        </Grid>
                    </Grid>

                </Paper>
            </Container>
        </div>
    )
}

export default (withStyles(styles)(ProductList))

