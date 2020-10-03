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
  TableSortLabel,
  Toolbar,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Search from "@material-ui/icons/Search";
import { ToastProvider } from "react-toast-notifications";
import Common from "Shared/Common";
import * as ProductService from "Services/ProductService";
import * as CommonStyles from "Shared/CommonStyle";

const styles = CommonStyles.listStyles();
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

const ProductList = ({ classes }) => {
  const baseUrl = "https://localhost:44317/api/";
  const [product, setProduct] = useState([]);
  const [currentId, setCurrentId] = useState(0);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const getProductList = async () => {
    const products = await ProductService.getProducts();
    setProduct(products.data);
  };
  const {
    TblPagination,
    recordAftterPagingAndSorting,
    TblHead,
    emptyRows,
    dense,
  } = Common(product, headCells, filterFn);
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
  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.productName.toLowerCase().includes(target.value)
          );
      },
    });
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
                <Toolbar className={classes.searchtxtbox}>
                  <TextField
                    label="Search"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      ),
                    }}
                    onChange={handleSearch}
                  />
                </Toolbar>
                <TableContainer>
                  <Table>
                    <TblHead className={classes.root} />
                    <TableBody>
                      {recordAftterPagingAndSorting().map((record, index) => {
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
                      {emptyRows > 0 && (
                        <TableRow
                          style={{ height: (dense ? 33 : 53) * emptyRows }}
                        >
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TblPagination />
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default withStyles(styles)(ProductList);
