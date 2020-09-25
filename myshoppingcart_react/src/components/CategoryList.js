import React, { useState, useEffect } from 'react'
import '../App.css';
import axios from 'axios'
import { Container, Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Category from '../components/Category';


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

const baseUrl = "https://localhost:44317/api/"

const CategoryList = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)
    useEffect(() => {
       props.getCategoryList(props.CategoryList)
    }, [props.CategoryListcategoryList])
   // useEffect( () => { fetchUsers(users) }, [ users ] );
    const onDelete = (categoryId) => {

    }

    return (
        <Container maxWidth="sm">
            <Paper className={classes.paper} elevation={3}  >
                <Grid container>
                    <Grid item xs={12}>
                        <h1 className="categoryTitle">List of Category</h1>
                        <hr></hr>
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
                                       props.categoryList.map((record, index) => {
                                            return (
                                                <TableRow key={index} hover>
                                                    <TableCell>{index + 1}</TableCell>
                                                    {/* <TableCell>{record.categoryId}</TableCell> */}
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
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default (withStyles(styles)(CategoryList))