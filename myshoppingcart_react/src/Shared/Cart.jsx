import React from "react";
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
  { id: "price", label: "Price" },
  { id: "quantity", label: "Quantity" },
  { id: "discount", label: "Discount" },
  { id: "gst", label: "GST" },
  { id: "image", label: "Product Image", disableSorting: true },
  { id: "actions", label: "Actions", disableSorting: true },
];
const styles = CommonStyles.listStyles();
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 95,
    width: 200,
    margin: 10,
  },
});
const Cart = (props) => {
  const { TblHead } = Common(props.location.product, headCells);
  const classes = useStyles();
  return (
    <>
      {
        <div>
          <div className="d-flex justify-content-end backToDashboard">
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "black",
                justifyContent: "end",
              }}
              className="pt-1 ml-4"
            >
              <Button variant="contained" color="primary" className="p-3">
                Back to Products
                <LocalMallIcon className="ml-1 pl-1" />
              </Button>
            </Link>
          </div>
          <div className="container">
            <Container maxWidth="lg">
              <Paper className={classes.paper} elevation={3}>
                <Grid container className="mt-4">
                  <Grid item xs={12}>
                    <div className="p-3">
                      <TableContainer>
                        <Table>
                          <TblHead className={classes.root} />
                          <TableBody>
                            {props.location.cart.cart.map((record, index) => {
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
                                    <Button
                                    //   onClick={() => {
                                    //     setConfirmDialog({
                                    //       isOpen: true,
                                    //       title:
                                    //         "Are you sure to delete this record?",
                                    //       onConfirm: () => {
                                    //         onDelete(record.productId);
                                    //       },
                                    //     });
                                    //   }}
                                    >
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
        </div>
      }
    </>
  );
};
export default withStyles(styles)(Cart);
