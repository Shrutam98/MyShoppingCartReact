import React, { useState, useEffect } from 'react';
import CategoryForm from './CategoryForm'
import CategoryList from './CategoryList'
import { Grid, Paper, withStyles, Container } from '@material-ui/core'
import axios from 'axios'
import { ToastProvider } from 'react-toast-notifications'

const styles = theme => ({
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

const Category = ({ classes, props }) => {
    const baseUrl = "https://localhost:44317/api/"
    const [category, setCategory] = useState([])
    const [currentId, setCurrentId] = useState(0)
    useEffect(() => {
        getCategories();
    }, [])

    const getCategories = async () => {
        const result = await axios.get(baseUrl + 'Categories/')
        setCategory(result.data)
    }

    return (
        <div>
            <Container maxWidth="md">
                <Paper className={classes.paper} elevation={3}>
                    <Grid container >
                        <Grid item xs={6}>
                            <ToastProvider autoDismiss={true}>
                                <CategoryForm category={category} setCategory={setCategory} getCategory={getCategories} currentId={currentId} />
                            </ToastProvider>
                        </Grid>
                        <Grid item xs={6}>
                            <CategoryList categoryList={category} setCategory={setCategory} getCategoryList={getCategories} setCurrentId={setCurrentId} currentId={currentId} />
                        </Grid>
                    </Grid>

                </Paper>
            </Container>
        </div>
    )
}

export default (withStyles(styles)(Category))
