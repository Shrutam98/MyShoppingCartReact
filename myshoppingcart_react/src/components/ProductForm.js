import React, { useState, useEffect } from 'react'
import { Grid, TextField, withStyles, Button, FormControl, InputLabel, Select, MenuItem, Paper } from '@material-ui/core'
import '../App.css';
import axios from 'axios'
import { useToasts } from 'react-toast-notifications'
import Category from './Category';

const styles = theme => ({
    root: {
        "& .MuiGrid-grid-xs-10": {
            marginTop: "18px",
            marginLeft: "20px"
        },
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
        "& .MuiSelect-outlined.MuiSelect-outlined": {
            textAlign: "left"
        }
    },
    formControl: {
        margin: theme.spacing(1),
        width: "100%"
    },

    smMargin: {
        margin: theme.spacing(1)
    }
})

const initialFieldValues = {
    productName: '',
    categoryId: '',
    price: '',
    quantity: '',
    discount: '',
    gst: '',
    categoryName: ''
}

const ProductForm = ({ classes, ...props }) => {
    const { addToast } = useToasts()
    const baseUrl = "https://localhost:44317/api/"
    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})
    const [category, setCategory] = useState([])

    //material-ui select
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const getCategories = async () => {
        const result = await axios.get(baseUrl + 'Categories/')
        setCategory(result.data)
    }

    useEffect(() => {
        getCategories()
        if (props.currentId != 0)
            setValues({
                ...props.product.find(x => x.productId == props.currentId),

            })
        else
            setValues({
                ...initialFieldValues,
            })

    }, [props.currentId, props.product])

    //Validation
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('productName' in fieldValues)
            temp.productName = fieldValues.productName ? "" : "This field is Required"
        if ('price' in fieldValues)
            temp.price = fieldValues.price ? "" : "This field is Required"
        if ('categoryId' in fieldValues)
            temp.categoryId = fieldValues.categoryId ? "" : "This field is Required"
        setErrors({
            ...temp
        })
        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")

    }
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

    //Submit Event
    const handleSubmit = e => {
        const formatData = data => ({
            ...data,
            categoryId: parseInt(data.categoryId ? data.categoryId : 0),
            price: parseFloat(data.price ? data.price : 0.0),
            quantity: parseInt(data.quantity ? data.quantity : 0),
            discount: parseFloat(data.discount ? data.discount : 0.0),
            gst: parseFloat(data.gst ? data.gst : 0.0)
        })
        const id = props.currentId
        const body = {
            productId: props.currentId,
            'productName': values.productName,
            'categoryId': values.categoryId,
            'price': values.price,
            'quantity': values.quantity,
            'discount': values.discount,
            'gst': values.gst,
        }
        e.preventDefault()
        if (validate()) {
            if (props.currentId == 0)
                axios.post(baseUrl + 'Products/', formatData(body))
                    .then(data => {
                        props.setProduct([...props.product, data.data]
                        )
                        resetForm()
                    })
                    .catch(error => console.log(error))
            else
                axios.put(baseUrl + `Products/${props.currentId}`, (id, formatData(body)))
                    .then(data => {
                        props.setProduct([...props.product.find(x => x.productId == props.currentId), data.data])
                        resetForm()
                    })
                    .catch(error => console.log(error))
            resetForm()
        }
    }

    return (
        <div>
            <div>
                <h1 className="categoryTitle">Product Form</h1>
                <hr />
            </div>
            <div>
                <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
                    <Grid container >
                        <Grid item xs={10}>
                            <TextField
                                name="productName"
                                variant="outlined"
                                label="Product"
                                fullWidth
                                value={values.productName}
                                onChange={handleInputChange}
                                {...(errors.productName && { error: true, helperText: errors.productName })}
                            />
                            <FormControl variant="outlined"
                                className={classes.formControl}
                                {...(errors.categoryId && { error: true, helperText: errors.categoryId })}
                            >
                                <InputLabel ref={inputLabel}>Category</InputLabel>
                                <Select
                                    name="categoryId"
                                    value={values.categoryId}
                                    onChange={handleInputChange}
                                    labelWidth={labelWidth}
                                >
                                    {
                                        category.map(item => (
                                            <MenuItem
                                                key={item.categoryId}
                                                value={item.categoryId}
                                            >   {item.categoryName}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                            <TextField
                                name="price"
                                variant="outlined"
                                label="Price"
                                type="number"
                                fullWidth
                                value={values.price}
                                onChange={handleInputChange}
                                {...(errors.price && { error: true, helperText: errors.price })}
                            />
                            <TextField
                                name="quantity"
                                variant="outlined"
                                label="Quantity"
                                type="number"
                                fullWidth
                                value={values.quantity}
                                onChange={handleInputChange}

                            /> <TextField
                                name="discount"
                                variant="outlined"
                                label="Discount"
                                type="number"
                                fullWidth
                                value={values.discount}
                                onChange={handleInputChange}
                            /> <TextField
                                name="gst"
                                variant="outlined"
                                label="Gst"
                                type="number"
                                fullWidth
                                value={values.gst}
                                onChange={handleInputChange}
                            />
                            <div className="buttonDivProduct">
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

export default (withStyles(styles)(ProductForm));


