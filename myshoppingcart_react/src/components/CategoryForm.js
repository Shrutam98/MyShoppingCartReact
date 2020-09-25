import React, { useState, useEffect } from 'react'
import { Grid, TextField, withStyles, Button, Container,Paper } from '@material-ui/core'
import Axios from 'axios'
import {useToasts} from 'react-toast-notifications'

//Styles
const styles = theme => ({
    root: {
        "& .MuiGrid-grid-xs-10": {
            margin: "25px",
            marginLeft: "45px"
        }
    },
    smMargin: {
        margin: theme.spacing(1)
    },
    paper : {
        margin : theme.spacing(2),
        padding : theme.spacing(2)
    }
})

//Initial Values
const initialFieldValues = {
    categoryName: ''
}

//
const CategoryForm = ({ classes,...props }) => {
    const{addToast} = useToasts()
    const baseUrl = "https://localhost:44317/api/"
    
    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})
    const[category,setCategory] = useState(initialFieldValues)

    useEffect(() => {
        props.getCategory(props.category)
     }, [props.category])

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

        setCategory( e.target.value)
           
    }

    //Redset From
    const resetForm = () => {
        setValues({
            ...initialFieldValues
        })
        setErrors({})
        // setCurrentId(0)
    }
    const onSuccess = () => {
        resetForm()
       
    }

    //Handle submit
    const handleSubmit = async e => {    
        const body = {          
            'categoryName' : category
        }     
        e.preventDefault()
        console.log(e)
        if(validate()){     
            onSuccess()
            await Axios.post(baseUrl + 'Categories/',body)
            .then(res => res.json(), () => addToast("Category Added Successfully",{appearance : "success"}))
            .then(data =>{          
                setCategory({
                    category : data                
                })             
            })
            .catch(error => console.log(error))
           
            // if(props.currentId == 0)
            // props.createCategory(values , onSuccess,addToast("Category Added Successfully",{appearance : "success"}))
            // else
            // props.updateCategory(props.currentId , values ,onSuccess,addToast("Category Updated Successfully",{appearance : "success"}))
        }

    }

    return (
        <Container >
        <Paper className = {classes.paper} elevation ={3}  >
        <div>
            <div>
                <h1  className = "categoryTitle">Category Form</h1>
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
        </Paper>
        </Container>

    );
}

export default (withStyles(styles)(CategoryForm))