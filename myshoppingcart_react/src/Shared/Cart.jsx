import React, { useEffect, useState } from "react";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  withStyles,
  Button,
} from "@material-ui/core";
import Common from "Shared/Common";
import * as ProductService from "Services/ProductService";
import * as CommonStyles from "Shared/CommonStyle";
import Notification from "Shared/Notification";
import ConfirmDialog from "Shared/ConfirmDialog";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import BeenhereIcon from "@material-ui/icons/Beenhere";
import ModalPopup from "Shared/ModalPopup";
import Invoice from "Shared/Invoice";

const headCells = [
  { id: "productName", label: "Product" },
  { id: "category", label: "Category" },
  { id: "price", label: "Price(₹)" },
  { id: "quantity", label: "Quantity" },
  { id: "discount", label: "Discount(₹)" },
  { id: "gst", label: "GST(%)" },
  { id: "image", label: " Image " },
  { id: "actions", label: "Actions" },
];
const styles = CommonStyles.listStyles();
const imagePath = "https://localhost:44317/Images/";

const Cart = ({ classes, ...props }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };
  const onDelete = (productToRemove) => {
    let test = props.cart.find((x) => x.productId == productToRemove.productId);
    if (test.quantity > 1) {
      test.quantity--;
      props.removeFromCart(productToRemove);
      props.setCart([...props.cart]);
    } else {
      let newCart = props.cart.filter(
        (product) => product.productId !== productToRemove.productId
      );
      props.removeFromCart(productToRemove);
      props.setCart([...newCart]);
    }
  };
  const navigateToProduct = (productPage) => {
    props.setView(productPage);
  };
  return (
    <>
      {
        <div>
          <div className="d-flex justify-content-end backToDashboard">
            <Button
              variant="contained"
              color="primary"
              className="p-3"
              onClick={() => navigateToProduct(props.PRODUCT_VIEW)}
            >
              Back to Products
              <LocalMallIcon className="ml-1 pl-1 pb-1" />
            </Button>
          </div>
          <div className="container">
            <Container maxWidth="lg">
              <Paper className={classes.paper} elevation={3}>
                <Grid container>
                  <Grid item xs={12}>
                    <div className="p-3">
                      <TableContainer>
                        <Table>
                          <TableHead className={classes.root}>
                            <TableRow>
                              {headCells.map((headCell, id) => (
                                <TableCell
                                  key={headCell.id}
                                  className="text-center"
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
                                  <TableCell>
                                    <div>
                                      <img
                                        src={`${imagePath}${record.image}`}
                                        alt={`${record.productName} image`}
                                        style={{
                                          height: "50px",
                                          width: "130px",
                                          backgroundPosition: "top",
                                        }}
                                      />
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <Button onClick={() => onDelete(record)}>
                                      <RemoveShoppingCartIcon color="secondary" />
                                    </Button>
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
          <h2 className="mt-2">Total Coast : ₹ {props.getTotalPrice()} </h2>
          <div>
            {props.cart.map((record, index) => {
              return (
                <div key={index}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className="ml-5 mt-1"
                    style={{ height: "56px", outline: "none" }}
                    onClick={() => {
                      openInPopup(record);
                    }}
                  >
                    Checkout
                    <BeenhereIcon className="ml-1" />
                  </Button>
                </div>
              );
            })}
          </div>
          <ModalPopup
            title="Checkout"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            <Invoice
              cart={props.cart}
              setCart={props.setCart}
              product={props.product}
              setProduct={props.setProduct}
              setCart={props.setCart}
              getTotalPrice={props.getTotalPrice}
              recordForEdit={recordForEdit}
              setOpenPopup={setOpenPopup}
              clearCart={props.clearCart}
              addToCart={props.addToCart}
              getProductList={props.getProductList}
            />
          </ModalPopup>
        </div>
      }
    </>
  );
};
export default withStyles(styles)(Cart);
