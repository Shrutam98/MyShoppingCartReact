import React, { useState, useEffect } from 'react'
import '../App.css'
import axios from 'axios'
import { Container, Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CategoryForm from './CategoryForm';
import { ToastProvider } from 'react-toast-notifications'
import * as CategoryService from '../Services/CategoryService';

const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem",
            color: 'white',
            background: '#3f51b5'
        },
        "& .MuiTableContainer-root": {
            marginTop: "15px"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

const CategoryList = ({ classes }) => {
    const baseUrl = "https://localhost:44317/api/"
    const [category, setCategory] = useState([])
    const [currentId, setCurrentId] = useState(0)
    const getCategoriesList = async () => {
        const categories = await CategoryService.getCategories()
        setCategory(categories.data)
    }
    useEffect(() => {
        getCategoriesList()
    }, [])
    const onDelete = id => {
        if (window.confirm("Are you sure to delete this record?")){
             CategoryService.deleteCategory(id)
            .then(data => {
                getCategoriesList()
            })
            .catch(error => console.log(error))
        }
    }
    return (
        <Container maxWidth="md">
            <Paper className={classes.paper} elevation={3}  >
                <Grid container>
                    <Grid item xs={6}>
                        <ToastProvider autoDismiss={true}>
                            <CategoryForm category={category} setCategory={setCategory} getCategoriesList={getCategoriesList} currentId={currentId} setCurrentId= {setCurrentId} />
                        </ToastProvider>
                    </Grid>
                    <Grid item xs={6}>
                        <h1 className="categoryTitle">List of Category</h1>
                        <hr></hr>
                        <div className="tableMargin">
                            <TableContainer>
                                <Table>
                                    <TableHead className={classes.root}>
                                        <TableRow>
                                            <TableCell>Id</TableCell>
                                            <TableCell>Category</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            category.map((record, index) => {
                                                return (

                                                    <TableRow key={index} hover>
                                                        <TableCell>{index + 1}</TableCell>
                                                        <TableCell>{record.categoryName}</TableCell>
                                                        <TableCell>
                                                            <ButtonGroup variant="text">
                                                                <Button onClick={() => setCurrentId(record.categoryId)}><EditIcon color="primary" /></Button>
                                                                <Button onClick={() => onDelete(record.categoryId)}><DeleteIcon color="secondary" /></Button>
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
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default (withStyles(styles)(CategoryList))