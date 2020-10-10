import React, { useEffect } from "react";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import { Link } from "react-router-dom";
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

const headCells = [
  { id: "productName", label: "Product" },
  { id: "category", label: "Category", disableSorting: true },
  { id: "price", label: "Price(₹)" },
  { id: "quantity", label: "Quantity" },
  { id: "discount", label: "Discount(₹)" },
  { id: "gst", label: "GST(%)" },
  { id: "image", label: "Image", disableSorting: true },
  { id: "actions", label: "Actions", disableSorting: true },
];
const styles = CommonStyles.listStyles();
const Cart = ({ classes, ...props }) => {
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
              <LocalMallIcon className="ml-1 pl-1" />
            </Button>
          </div>
          <div className="container">
            <Container maxWidth="lg">
              <Paper className={classes.paper} elevation={3}>
                <Grid container className="mt-4">
                  <Grid item xs={12}>
                    <div className="p-3">
                      <TableContainer>
                        <Table>
                          <TableHead className={classes.root}>
                            <TableRow>
                              {headCells.map((headCell, id) => (
                                <TableCell key={headCell.id}>
                                  {headCell.label}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {props.cart.map((record, index) => {
                              return (
                                <TableRow key={index} hover>
                                  <TableCell>{record.productName}</TableCell>
                                  <TableCell>
                                    {record.category?.categoryName}
                                  </TableCell>
                                  <TableCell>{record.price}</TableCell>
                                  <TableCell>{record.quantity}</TableCell>
                                  <TableCell>{record.discount}</TableCell>
                                  <TableCell>{record.gst}</TableCell>
                                  <TableCell>{record.image}</TableCell>
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
            <Button
              variant="contained"
              color="primary"
              size="small"
              className="ml-5 mt-1"
              style={{ height: "56px", outline: "none" }}
            >
              Checkout
            </Button>
          </div>
        </div>
      }
    </>
  );
};
export default withStyles(styles)(Cart);
