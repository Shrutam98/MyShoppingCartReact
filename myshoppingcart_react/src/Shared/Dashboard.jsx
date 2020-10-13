import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Toolbar,
  TextField,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  TablePagination,
} from "@material-ui/core/";
import * as ProductService from "Services/ProductService";
import * as CategoryService from "Services/CategoryService";
import Search from "@material-ui/icons/Search";
import Common from "Shared/Common";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import LocalGroceryStoreIcon from "@material-ui/icons/LocalGroceryStore";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import Cart from "Shared/Cart";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 95,
    width: 200,
    margin: 10,
  },
  formControl: {
    width: "19%",
  },
});
const imagePath = "https://localhost:44317/Images/";
const PRODUCT_VIEW = "product";
const CART_VIEW = "cart";
const Dashboard = () => {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  const [inputChange, setInputChange] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [cart, setCart] = useState([]);
  const [view, setView] = useState(PRODUCT_VIEW);
  const classes = useStyles();
  const { TblPagination, recordAftterPaging, page, rowsPerPage } = Common(
    product
  );
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
    getCategoriesList();
    getProductList();
  }, []);

  useEffect(() => {
    let dataAfterFilter = inputChange
      ? recordAftterPaging().filter(
          (x) =>
            x.quantity > 0 &&
            x.productName.toLowerCase().includes(searchInput.toLowerCase())
        )
      : recordAftterPaging().filter((x) =>
          x.productName.toLowerCase().includes(searchInput.toLowerCase())
        );
    if (categoryId !== 0 && categoryId !== "") {
      dataAfterFilter = dataAfterFilter.filter(
        (x) => x.categoryId === categoryId
      );
    }
    setSearchResult(dataAfterFilter);
  }, [inputChange, searchInput, categoryId, page, rowsPerPage, product]);
  useEffect(() => {
    getTotalPrice();
  }, [cart]);
  const getProductList = async () => {
    const products = await ProductService.getProducts();
    setProduct(products.data);
  };
  const getCategoriesList = async () => {
    const categories = await CategoryService.getCategories();
    setCategory(categories.data);
  };
  const handleInputChange = (e) => {
    setCategoryId(e.target.value);
  };
  const handleSearch = (e) => {
    let target = e.target;
    setSearchInput(target.value);
  };
  const handleCheckInput = (e) => {
    let target = e.target.checked;
    setInputChange(target);
  };
  const addToCart = (record) => {
    let newCart = [...cart];
    let itemInCart = newCart.find((x) => x.productId === record.productId);
    if (itemInCart) {
      itemInCart.quantity++;
      record.quantity--;
    } else {
      itemInCart = {
        ...record,
        ...record.quantity--,
        quantity: 1,
      };
      newCart.push(itemInCart);
    }
    setCart(newCart, { ...record });
  };
  const removeFromCart = (record) => {
    let newCart = [...product];
    let item = newCart.find((x) => x.productId === record.productId);
    if (item) {
      item.quantity++;
    }
    setProduct(newCart);
  };
  const renderCart = () => {
    return (
      <div>
        <Cart
          cart={cart}
          product={product}
          setProduct={setProduct}
          setCart={setCart}
          view={view}
          setView={setView}
          PRODUCT_VIEW={PRODUCT_VIEW}
          getTotalPrice={getTotalPrice}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          addToCart={addToCart}
          getProductList={getProductList}
        />
      </div>
    );
  };
  const navigateToCart = (cartPage) => {
    setView(cartPage);
  };
  const clearCart = (record) => {
    setCart([]);
    getProductList();
  };
  const getCartTotal = () => {
    return cart.reduce((sum, { quantity }) => sum + quantity, 0);
  };
  const getTotalPrice = () => {
    let priceTotal = 0;
    for (let i = 0; i < cart.length; i++) {
      const product = cart[i];
      priceTotal =
        priceTotal +
        product.quantity *
          (product.price +
            (product.price * product.gst) / 100 -
            product.discount);
    }
    return parseFloat(priceTotal).toFixed(2);
  };
  return (
    <>
      <div>
        {view === PRODUCT_VIEW && (
          <div>
            <div className="d-flex justify-content-center">
              <FormControl
                variant="outlined"
                className={classes.formControl}
                value={categoryId}
              >
                <InputLabel ref={inputLabel}>Category</InputLabel>
                <Select
                  onChange={handleInputChange}
                  value={categoryId}
                  label="Catrgory"
                  labelWidth={labelWidth}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem aria-label="None" value={0}>
                    ----Select Category----
                  </MenuItem>
                  {category.map((item) => (
                    <MenuItem key={item.categoryId} value={item.categoryId}>
                      {item.categoryName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControlLabel
                onChange={handleCheckInput}
                control={<Checkbox color="primary" />}
                label="Available"
                labelPlacement="end"
                className="ml-5"
              />
              <Toolbar className="ml-1">
                <TextField
                  label="Search"
                  variant="outlined"
                  fullWidth
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
              <Button
                variant="contained"
                color="primary"
                size="small"
                className="ml-4 mt-1 px-5"
                style={{ height: "56px", outline: "none" }}
                onClick={() => navigateToCart(CART_VIEW)}
              >
                Go to Cart({getCartTotal()})
                <LocalGroceryStoreIcon className="ml-1 pl-1" />
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className="ml-5 mt-1 px-5"
                style={{ height: "56px", outline: "none" }}
                onClick={() => clearCart(product)}
              >
                Clear Cart
                <RemoveShoppingCartIcon className="ml-1 pl-1" />
              </Button>
            </div>
            <hr />
            <h2
              className="productTitle"
              style={{ color: "#3f51b5", margin: "0" }}
            >
              Products
            </h2>
            <div className="imageStyle">
              {searchResult.map((record, index) => {
                return (
                  <div key={index}>
                    <Container maxWidth="md" className="py-3">
                      <Card className={classes.root}>
                        <CardActionArea style={{ cursor: "auto" }}>
                          <CardMedia
                            className={classes.media}
                            image={`${imagePath}${record.image}`}
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {record.productName}
                            </Typography>
                            <Typography
                              variant="h5"
                              component="h2"
                              className="font-weigh-bold"
                            >
                              ₹ {record.price}
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              Quantity :{record.quantity}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions
                          style={{
                            background: "#3f51b5",
                            justifyContent: "center",
                          }}
                        >
                          <div>
                            <div>
                              {record.quantity > 0 ? (
                                <Button
                                  size="large"
                                  style={{ color: "white", outline: "none" }}
                                  endIcon={
                                    <AddShoppingCartIcon className="ml-1" />
                                  }
                                  className="px-4"
                                  onClick={() => addToCart(record)}
                                >
                                  Add to Cart
                                </Button>
                              ) : (
                                <h6
                                  style={{ color: "white" }}
                                  className="py-2 my-1 m-0"
                                >
                                  Not in stock
                                </h6>
                              )}
                            </div>
                          </div>
                        </CardActions>
                      </Card>
                    </Container>
                  </div>
                );
              })}
            </div>
            <TblPagination />
          </div>
        )}
        {view === CART_VIEW && renderCart()}
      </div>
    </>
  );
};
export default Dashboard;
