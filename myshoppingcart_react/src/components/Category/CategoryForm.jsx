import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  withStyles,
  Button,
  Container,
  Paper,
} from "@material-ui/core";
import { useToasts } from "react-toast-notifications";
import * as CategoryService from "Services/CategoryService";
import * as CommonStyles from "Shared/CommonStyle";
import Notification from "Shared/Notification";

const styles = CommonStyles.categoryFormstyles();

//Initial Values
const initialFieldValues = {
  categoryId: 0,
  categoryName: "",
};

const CategoryForm = ({ classes, ...props }) => {
  const { addToast } = useToasts();
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});
  const id = props.currentId;
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    if (props.currentId != 0)
      setValues({
        ...props.category.find((x) => x.categoryId == props.currentId),
      });
    else {
      setValues({
        ...initialFieldValues,
      });
    }
  }, [props.currentId, props.category]);

  //Validation
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("categoryName" in fieldValues)
      temp.categoryName = fieldValues.categoryName
        ? ""
        : "This field is Required";
    setErrors({
      ...temp,
    });
    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  //Handle Input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const fieldValue = { [name]: value };
    setValues({
      ...values,
      ...fieldValue,
    });
    validate(fieldValue);
  };

  //Reset From
  const resetForm = () => {
    setValues({
      ...initialFieldValues,
    });
    setErrors({});
    props.setCurrentId = 0;
  };
  const body = {
    categoryId: props.currentId,
    categoryName: values.categoryName,
  };
  const addCategory = async () => {
    const result = await CategoryService.addCategory(body);
    props.setCategory([...props.category, result.data]);
    resetForm();
    setNotify({
      isOpen: true,
      message: "Category Added Successfully",
      type: "success",
    });
  };
  const updateCategory = async () => {
    const result = await CategoryService.editCategory(id, body).then((data) => {
      props.setCurrentId(0);
      props.getCategoriesList();
      resetForm();
      setNotify({
        isOpen: true,
        message: "Category Updated Successfully",
        type: "success",
      });
    });
  };
  //Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      if (props.currentId == 0) {
        addCategory();
      } else {
        updateCategory();
      }
    }
  };
  return (
    <div>
      <div>
        <h1 className="categoryTitle">Category Form</h1>
        <hr></hr>
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
                name="categoryName"
                variant="outlined"
                label="Category"
                fullWidth
                value={values.categoryName}
                onChange={handleInputChange}
                {...(errors.categoryName && {
                  error: true,
                  helperText: errors.categoryName,
                })}
              />

              <div className="buttonDivCategory">
                <Button variant="contained" color="primary" type="Submit">
                  Submit
                </Button>
                <Button
                  variant="contained"
                  className={classes.smMargin}
                  onClick={resetForm}
                >
                  Reset
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default withStyles(styles)(CategoryForm);
