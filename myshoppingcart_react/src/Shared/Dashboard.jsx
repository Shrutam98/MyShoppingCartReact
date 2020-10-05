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
} from "@material-ui/core/";
import * as ProductService from "Services/ProductService";
import * as CategoryService from "Services/CategoryService";
import apple from "Images/apple.png";
import samsung from "Images/samsung.png";
import Search from "@material-ui/icons/Search";
import Common from "Shared/Common";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 50,
    width: 200,
    margin: 10,
  },
  formControl: {
    marginLeft: "120px",
    width: "21%",
  },
});
const initialFieldValues = {
  categoryId: "",
};

const Dashboard = () => {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  const [values, setValues] = useState(initialFieldValues);
  const [inputChange, setInputChange] = useState(false);

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const classes = useStyles();
  const getProductList = async () => {
    const products = await ProductService.getProducts();
    setProduct(products.data);
  };
  const getCategoriesList = async () => {
    const categories = await CategoryService.getCategories();
    setCategory(categories.data);
  };
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
    getCategoriesList();
    getProductList();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const fieldValue = { [name]: value };
    setValues({
      ...values,
      ...fieldValue,
    });
  };
  const searchResult = () => {
    return filterFn.fn(product);
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
  const handleCheckInput = (e) => {
    let target = e.target;
  };
  return (
    <div className="containerDashboard">
      <div className="d-flex containerDashboard">
        <FormControl variant="outlined" className={classes.formControl}>
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
        <FormControlLabel
          handleInputChange={handleCheckInput}
          control={<Checkbox color="primary" />}
          label="Available"
          labelPlacement="end"
          className="ml-5"
        />
        <Toolbar className="ml-0">
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
      </div>
      <div className="imageStyle">
        {searchResult().map((record, index) => {
          return (
            <div key={index}>
              <Container maxWidth="md" className="py-4">
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={samsung}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {record.productName}
                      </Typography>
                      <Typography variant="h5" component="h2">
                        $ {record.price}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h2">
                        {record.quantity}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              </Container>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
