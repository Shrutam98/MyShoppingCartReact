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
    height: 95,
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
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const imagePath = "https://localhost:44317/Images";
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
    console.log(e);
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
  useEffect(() => {
    let dataAfterFilter = inputChange
      ? product.filter(
          (x) =>
            x.quantity > 0 &&
            x.productName.toLowerCase().includes(searchInput.toLowerCase())
        )
      : product.filter((x) =>
          x.productName.toLowerCase().includes(searchInput.toLowerCase())
        );
    if (categoryId !== 0) {
      dataAfterFilter = dataAfterFilter.filter(
        (x) => x.categoryId === categoryId
      );
    }
    setSearchResult(dataAfterFilter);
  }, [inputChange, searchInput, categoryId, product]);

  return (
    <div className="containerDashboard">
      <div className="d-flex containerDashboard">
        <FormControl
          variant="outlined"
          className={classes.formControl}
          value={product.categoryId}
        >
          <InputLabel ref={inputLabel}>Category</InputLabel>
          <Select onChange={handleInputChange} labelWidth={labelWidth}>
            <MenuItem value={0}>--Slect Category--</MenuItem>
            {category.map((item) => (
              <MenuItem key={item.categoryId} value={item.categoryId}>
                {item.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          value={values.categoryId}
          onChange={handleCheckInput}
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
        {searchResult.map((record, index) => {
          return (
            <div key={index}>
              <Container maxWidth="md" className="py-4">
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      // image={samsung}
                      image={`https://localhost:44317/Images/${record.image}`}
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
