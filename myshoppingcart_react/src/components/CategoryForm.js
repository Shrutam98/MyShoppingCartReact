import React, { useState, useEffect } from 'react'
import { Grid, TextField, withStyles, Button, Container, Paper } from '@material-ui/core'
import axios from 'axios'
import { useToasts } from 'react-toast-notifications'
import * as CategoryService from '../Services/CategoryService';


//Styles
const styles = theme => ({
    root: {
        "& .MuiGrid-grid-xs-10": {
            margin: "25px"
        }
    },
    smMargin: {
        margin: theme.spacing(1)
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

//Initial Values
const initialFieldValues = {
    categoryId: 0,
    categoryName: ''
}

//
const CategoryForm = ({ classes, ...props }) => {
    const { addToast } = useToasts()
    const baseUrl = "https://localhost:44317/api/"
    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (props.currentId != 0)
            setValues({
                ...props.category.find(x => x.categoryId == props.currentId),
            })
        else {
            setValues({
                ...initialFieldValues,

            })

        }

    }, [props.currentId, props.category])


    //Validation
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('categoryName' in fieldValues)
            temp.categoryName = fieldValues.categoryName ? "" : "This field is Required"
        setErrors({
            ...temp
        })
        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    //Handle Input
    const handleInputChange = e => {
        const { name, value } = e.target
        const fieldValue = { [name]: value }
        console.log(fieldValue)
        setValues({
            ...values,
            ...fieldValue
        })
        validate(fieldValue)
    }

    //Reset From
    const resetForm = () => {
        setValues({
            ...initialFieldValues
        })
        setErrors({})
        props.setCurrentId = 0
    }

    //Handle submit
    const handleSubmit = async e => {
        const id = props.currentId

        const body = {
            'categoryId': props.currentId,
            'categoryName': values.categoryName
        }
        const getCategoriesList =async () => {
            const categories = await CategoryService.getCategories()
            props.setCategory(categories.data)
        }
        const addCategory = async () => {
            const x = await CategoryService.addCategory(body)
            props.setCategory([...props.category, x.data])
            resetForm()
        }
        const updateCategory = async () => {
            const x = await CategoryService.editCategory(id, body)
            getCategoriesList()
            resetForm()
            // props.setCategory([  ...props.category.find(x => x.categoryId == props.currentId) , data.data]  )   
        }
        e.preventDefault()
        console.log(e)
        if (validate()) {

            if (props.currentId == 0) {
                addCategory()
            }
            else {
                updateCategory()
            }
        }

    }

    return (

        <div>
            <div>
                <h1 className="categoryTitle">Category Form</h1>
                <hr></hr>
            </div>
            <div>
                <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
                    <Grid container >
                        <Grid item xs={10}>
                            <TextField
                                name="categoryName"
                                variant="outlined"
                                label="Category"
                                fullWidth
                                value={values.categoryName}
                                onChange={handleInputChange}
                                {...(errors.categoryName && { error: true, helperText: errors.categoryName })}
                            />

                            <div className="buttonDivCategory">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="Submit"
                                >Submit
                         </Button>
                                <Button
                                    variant="contained"
                                    className={classes.smMargin}
                                    onClick={resetForm}
                                > Reset
                        </Button>
                            </div>
                        </Grid>
                    </Grid>
                </form>
            </div>

        </div>


    );
}

export default (withStyles(styles)(CategoryForm))