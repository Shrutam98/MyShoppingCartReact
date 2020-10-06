import React from "react";
import { Button } from "@material-ui/core";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import { Link } from "react-router-dom";
import { Container } from "@material-ui/core/";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CategoryList from "components/Category/CategoryList";

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

const Cart = (props) => {
  debugger;
  const classes = useStyles();
  console.log(props.location.cart);
  return (
    <>
      {
        <div>
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
          <div className="imageStyle">
            {props.location.cart.cart.map((record, index) => {
              return (
                <div key={index}>
                  <Container maxWidth="md" className="py-4">
                    <Card className={classes.root}>
                      <CardActionArea style={{ cursor: "auto" }}>
                        <CardMedia
                          className={classes.media}
                          image={`https://localhost:44317/Images/${record.image}`}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            Name :{record.productName}
                          </Typography>
                          <Typography
                            variant="h5"
                            component="h2"
                            className="font-weigh-bold"
                          >
                            ₹ {record.price}
                          </Typography>
                          <Typography gutterBottom variant="h5" component="h2">
                            Quantity :{record.quantity}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions></CardActions>
                    </Card>
                  </Container>
                </div>
              );
            })}
          </div>
        </div>
      }
    </>
  );
};
export default Cart;
