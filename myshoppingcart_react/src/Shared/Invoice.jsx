import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  withStyles,
  Button,
  Paper,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import "App.css";
import * as InvoiceService from "Services/InvoiceService";
import * as ProductService from "Services/ProductService";
import * as CommonStyles from "Shared/CommonStyle";
import Notification from "Shared/Notification";
import PDF from "Shared/PDF";

const headCells = [
  { id: "productName", label: "Product" },
  { id: "category", label: "Category", disableSorting: true },
  { id: "price", label: "Price(₹)" },
  { id: "quantity", label: "Quantity" },
  { id: "discount", label: "Discount(₹)" },
  { id: "gst", label: "GST(%)" },
];
const styles = CommonStyles.productFormstyles();
var currentdate = new Date();
var datetime =
  +currentdate.getFullYear() +
  "-" +
  (currentdate.getMonth() + 1) +
  "-" +
  currentdate.getDate() +
  " " +
  currentdate.getHours() +
  ":" +
  currentdate.getMinutes() +
  ":" +
  currentdate.getSeconds() +
  "." +
  currentdate.getMilliseconds();

const CHECKOUT_VIEW = "checkout";
const PDF_VIEW = "pdf";
const Invoice = ({ classes, ...props }) => {
  const { recordForEdit } = props;
  const initialFieldValues = {
    invoiceNumber: Math.floor(Math.random() * 1000 + 1),
    userName: "",
    phoneNumber: "",
    email: "",
    address: "",
    date: datetime,
    customerId: Math.floor(Math.random() * 100 + 1),
  };
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});
  const [invoice, setInvoice] = useState([]);
  const [view, setView] = useState(CHECKOUT_VIEW);

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
        ...initialFieldValues,
      });
  }, [recordForEdit]);
  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
        ...initialFieldValues,
      });
  }, [props.cart]);
  //Validation
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("userName" in fieldValues)
      temp.userName = fieldValues.userName ? "" : "This field is Required";
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
    if ("phoneNumber" in fieldValues)
      temp.phoneNumber =
        fieldValues.phoneNumber.length > 9 ? "" : "Minimum 10 digits required.";
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
  const renderPdf = () => {
    return (
      <div>
        <PDF
          cart={props.cart}
          setCart={props.setCart}
          product={props.product}
          setProduct={props.setProduct}
          setCart={props.setCart}
          getTotalPrice={props.getTotalPrice}
          recordForEdit={recordForEdit}
          clearCart={props.clearCart}
          addToCart={props.addToCart}
          setOpenPopup={props.setOpenPopup}
        />
      </div>
    );
  };

  const data = new FormData();
  debugger;
  data.append("productId", values.productId);
  data.append("userName", values.userName);
  data.append("customerId", values.customerId);
  data.append("totalPrice", values.price);
  data.append("email", values.email);
  data.append("phoneNumber", values.phoneNumber);
  data.append("address", values.address);
  data.append("date", values.date);
  data.append("invoiceNumber", values.invoiceNumber);

  const addInvoice = async () => {
    debugger;
    const result = await InvoiceService.addInvoice(data);
  };
  const updateProduct = async () => {
    debugger;
    const newProduct = [...props.product];
    const filteredProduct = newProduct.find(
      (x) => x.productId === recordForEdit.productId
    );
    props.setProduct(newProduct);
    const id = values.productId;
    const dataNew = new FormData();
    dataNew.append("productId", filteredProduct.productId);
    dataNew.append("productName", filteredProduct.productName);
    dataNew.append("categoryId", filteredProduct.categoryId);
    dataNew.append("price", filteredProduct.price);
    dataNew.append("quantity", filteredProduct.quantity);
    dataNew.append("discount", filteredProduct.discount);
    dataNew.append("gst", filteredProduct.gst);
    dataNew.append("image", filteredProduct.image);
    const result = await ProductService.editProduct(id, dataNew);
  };
  //Submit Event
  const handleSubmit = (e) => {
    debugger;
    e.preventDefault();
    if (validate()) {
      addInvoice();
      updateProduct();
      setView(PDF_VIEW);
    }
  };

  return (
    <div>
      {view === CHECKOUT_VIEW && (
        <div>
          <form
            autoComplete="off"
            noValidate
            className={classes.root}
            onSubmit={handleSubmit}
          >
            <Grid container>
              <Grid>
                <div>
                  <TextField
                    name="userName"
                    variant="outlined"
                    label="User Name"
                    value={values.userName}
                    onChange={handleInputChange}
                    {...(errors.userName && {
                      error: true,
                      helperText: errors.userName,
                    })}
                  />
                  <TextField
                    name="email"
                    variant="outlined"
                    label="Email"
                    value={values.email}
                    onChange={handleInputChange}
                    {...(errors.email && {
                      error: true,
                      helperText: errors.email,
                    })}
                  />
                  <TextField
                    name="phoneNumber"
                    variant="outlined"
                    label="Phone Number"
                    type="number"
                    value={values.phoneNumber}
                    onChange={handleInputChange}
                    {...(errors.phoneNumber && {
                      error: true,
                      helperText: errors.phoneNumber,
                    })}
                  />
                  <TextField
                    name="address"
                    variant="outlined"
                    label="Address"
                    value={values.address}
                    onChange={handleInputChange}
                  />
                  <TextField
                    name="invoiceNumber"
                    variant="outlined"
                    label="Invoice Number"
                    onChange={handleInputChange}
                    value={values.invoiceNumber}
                    hidden
                    disabled
                  />
                  <TextField
                    name="date"
                    variant="outlined"
                    label="Date"
                    value={values.date}
                    onChange={handleInputChange}
                    hidden
                    disabled
                  />
                  <TextField
                    name="customerId"
                    variant="outlined"
                    label="CustomerId"
                    value={values.customerId}
                    onChange={handleInputChange}
                    hidden
                    disabled
                  />
                  <div style={{ display: "none" }}>{props.getTotalPrice()}</div>
                  <TextField
                    name="productId"
                    variant="outlined"
                    label="Product Id"
                    type="number"
                    value={values.productId}
                    onChange={handleInputChange}
                    hidden
                    disabled
                  />
                </div>
                <hr />
                <div className="container">
                  <Container maxWidth="lg">
                    <Paper className={classes.paper} elevation={2}>
                      <Grid container>
                        <Grid item xs={12}>
                          <div className="p-3">
                            <TableContainer>
                              <Table>
                                <TableHead
                                  className={classes.root}
                                  style={{
                                    background: "#3f51b5",
                                  }}
                                >
                                  <TableRow>
                                    {headCells.map((headCell, id) => (
                                      <TableCell
                                        key={headCell.id}
                                        className="text-center text-light"
                                      >
                                        {headCell.label}
                                      </TableCell>
                                    ))}
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {props.cart.map((record, index) => {
                                    return (
                                      <TableRow key={index} hover>
                                        <TableCell className="text-center">
                                          {record.productName}
                                        </TableCell>
                                        <TableCell className="text-center">
                                          {record.category?.categoryName}
                                        </TableCell>
                                        <TableCell className="text-center">
                                          {record.price}
                                        </TableCell>
                                        <TableCell className="text-center">
                                          {record.quantity}
                                        </TableCell>
                                        <TableCell className="text-center">
                                          {record.discount}
                                        </TableCell>
                                        <TableCell className="text-center">
                                          {record.gst}
                                        </TableCell>
                                      </TableRow>
                                    );
                                  })}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </div>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Container>
                </div>
                <h2 className="mt-2 text-right mr-4">
                  Total Coast : ₹ {props.getTotalPrice()}
                </h2>
                <div className="buttonDivProduct mt-4 text-center">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className="p-3"
                  >
                    Submit
                  </Button>
                </div>
              </Grid>
            </Grid>
          </form>
        </div>
      )}
      {view === PDF_VIEW && renderPdf()}
    </div>
  );
};

export default withStyles(styles)(Invoice);
