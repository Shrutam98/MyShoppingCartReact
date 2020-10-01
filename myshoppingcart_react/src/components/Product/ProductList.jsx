import React, { useState, useEffect } from "react";
import ProductForm from "components/Product/ProductForm";
import "App.css";
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
  ButtonGroup,
  Button,
  TablePagination,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { ToastProvider } from "react-toast-notifications";
import Common from "Shared/Common";
import * as ProductService from "Services/ProductService";
import * as CommonStyles from "Shared/CommonStyle";

const styles = CommonStyles.listStyles();
const ProductList = ({ classes, props }) => {
  const baseUrl = "https://localhost:44317/api/";
  const [product, setProduct] = useState([]);
  const [currentId, setCurrentId] = useState(0);
  const getProductList = async () => {
    const products = await ProductService.getProducts();
    setProduct(products.data);
  };
  const { TblPagination } = Common(product);

  useEffect(() => {
    getProductList();
  }, []);
  const onDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      ProductService.deleteProduct(id)
        .then((data) => {
          getProductList();
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="container">
      <Container maxWidth="md">
        <Paper className={classes.paper} elevation={3}>
          <Grid container>
            <Grid item xs={6}>
              <ToastProvider autoDismiss={true}>
                <ProductForm
                  product={product}
                  setProduct={setProduct}
                  getProductList={getProductList}
                  currentId={currentId}
                  setCurrentId={setCurrentId}
                />
              </ToastProvider>
            </Grid>

            <Grid item xs={6}>
              <h1 className="categoryTitle">List of Products</h1>
              <hr />
              <div className="tableMargin">
                <TableContainer>
                  <Table>
                    <TableHead className={classes.root}>
                      <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Product</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Discount</TableCell>
                        <TableCell>GST</TableCell>
                        <TableCell>Image</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {product.map((record, index) => {
                        return (
                          <TableRow key={index} hover>
                            <TableCell>{index + 1}</TableCell>
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
                              <ButtonGroup variant="text">
                                <Button
                                  onClick={() => setCurrentId(record.productId)}
                                >
                                  <EditIcon color="primary" />
                                </Button>
                                <Button
                                  onClick={() => onDelete(record.productId)}
                                >
                                  <DeleteIcon color="secondary" />
                                </Button>
                              </ButtonGroup>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
                {/* <TblPagination /> */}
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default withStyles(styles)(ProductList);
