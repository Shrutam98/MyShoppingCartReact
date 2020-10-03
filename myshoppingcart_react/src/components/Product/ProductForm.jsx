import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  withStyles,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from "@material-ui/core";
import "App.css";
import { useToasts } from "react-toast-notifications";
import Common from "Shared/Common";
import * as CategoryService from "Services/CategoryService";
import * as ProductService from "Services/ProductService";
import * as CommonStyles from "Shared/CommonStyle";

const styles = CommonStyles.productFormstyles();
const initialFieldValues = {
  productName: "",
  categoryId: "",
  price: "",
  quantity: "",
  discount: "",
  gst: "",
  categoryName: "",
  image: "",
  imageFile: null,
};

const ProductForm = ({ classes, ...props }) => {
  const { addToast } = useToasts();
  const baseUrl = "https://localhost:44317/api/";
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});
  const [category, setCategory] = useState([]);
  const id = props.currentId;

  //material-ui select
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  const getCategoriesList = async () => {
    const categories = await CategoryService.getCategories();
    setCategory(categories.data);
  };

  useEffect(() => {
    getCategoriesList();
    setLabelWidth(inputLabel.current.offsetWidth);
    if (props.currentId !== 0)
      setValues({
        ...props.product.find((x) => x.productId === props.currentId),
      });
    else
      setValues({
        ...initialFieldValues,
      });
  }, [props.currentId, props.product]);

  //Validation
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("productName" in fieldValues)
      temp.productName = fieldValues.productName
        ? ""
        : "This field is Required";
    if ("price" in fieldValues)
      temp.price = fieldValues.price ? "" : "This field is Required";
    if ("categoryId" in fieldValues)
      temp.categoryId =
        fieldValues.categoryId.length != 0 ? "" : "This field is Required";
    setErrors({
      ...temp,
    });
    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const fieldValue = { [name]: value };
    setValues({
      ...values,
      ...fieldValue,
    });
    validate(fieldValue);
  };

  const saveImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      console.log(e);
      setValues({
        ...values,
        imageFile: imageFile,
      });
    } else {
      setValues({
        ...values,
        imageFile: null,
      });
    }
  };

  //Reset From
  const resetForm = () => {
    setValues({
      ...initialFieldValues,
    });
    document.getElementById("image-uploader").value = null;
    setErrors({});
    props.setCurrentId = 0;
  };
  const data = new FormData();
  data.append("productId", props.currentId);
  data.append("productName", values.productName);
  data.append("categoryId", values.categoryId);
  data.append("price", values.price);
  data.append("quantity", values.quantity);
  data.append("discount", values.discount);
  data.append("gst", values.gst);
  data.append("image", values.image);
  data.append("imageFile", values.imageFile);

  const addProduct = async () => {
    const result = await ProductService.addProduct(data);
    props.setProduct([...props.product, result.data]);
    props.getProductList();
    resetForm();
  };

  const updateProduct = async () => {
    const result = await ProductService.editProduct(id, data).then((data) => {
      props.setCurrentId(0);
      props.getProductList();
      resetForm();
    });
  };

  //Submit Event
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (props.currentId == 0) {
        addProduct();
      } else {
        updateProduct();
      }
    }
  };

  return (
    <div>
      <div>
        <h1 className="categoryTitle">Product Form</h1>
        <hr />
      </div>
      <div>
        <form
          autoComplete="off"
          noValidate
          className={classes.root}
          onSubmit={handleSubmit}
        >
          <Grid container>
            <Grid item xs={10}>
              <TextField
                name="productName"
                variant="outlined"
                label="Product"
                fullWidth
                value={values.productName}
                onChange={handleInputChange}
                {...(errors.productName && {
                  error: true,
                  helperText: errors.productName,
                })}
              />
              <FormControl
                variant="outlined"
                className={classes.formControl}
                {...(errors.categoryId && {
                  error: true,
                  helperText: errors.categoryId,
                })}
              >
                <InputLabel ref={inputLabel}>Category</InputLabel>
                <Select
                  name="categoryId"
                  value={values.categoryId}
                  onChange={handleInputChange}
                  labelWidth={labelWidth}
                >
                  {category.map((item) => (
                    <MenuItem key={item.categoryId} value={item.categoryId}>
                      {item.categoryName}
                    </MenuItem>
                  ))}
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
              />{" "}
              <TextField
                name="discount"
                variant="outlined"
                label="Discount"
                type="number"
                fullWidth
                value={values.discount}
                onChange={handleInputChange}
              />{" "}
              <TextField
                name="gst"
                variant="outlined"
                label="Gst"
                type="number"
                fullWidth
                value={values.gst}
                onChange={handleInputChange}
              />
              <TextField
                name="image"
                variant="outlined"
                id="image-uploader"
                label="Image"
                InputLabelProps={{
                  shrink: true,
                }}
                type="file"
                accept="image/*"
                fullWidth
                onChange={saveImage}
              />
              <div className="buttonDivProduct">
                <Button variant="contained" color="primary" type="Submit">
                  Submit
                </Button>
                <Button
                  variant="contained"
                  className={classes.smMargin}
                  onClick={resetForm}
                >
                  {" "}
                  Reset
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default withStyles(styles)(ProductForm);
