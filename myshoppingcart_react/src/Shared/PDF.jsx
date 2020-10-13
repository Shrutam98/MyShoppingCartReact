import React from "react";
import Pdf from "react-to-pdf";
import {
  Grid,
  withStyles,
  Paper,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@material-ui/core";
import * as CommonStyles from "Shared/CommonStyle";

const headCells = [
  { id: "productName", label: "Product" },
  { id: "category", label: "Category", disableSorting: true },
  { id: "price", label: "Price(₹)" },
  { id: "quantity", label: "Quantity" },
  { id: "discount", label: "Discount(₹)" },
  { id: "gst", label: "GST(%)" },
];
const ref = React.createRef();
const styles = CommonStyles.listStyles();

function PDF({ classes, ...props }) {
  return (
    <div>
      <div ref={ref}>
        <h1>My Shopping Cart</h1>
        <div>{props.userName}</div>
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
          <h2 className="mt-2 text-right mr-4">
            Total Coast : ₹ {props.getTotalPrice()}
          </h2>
        </div>
        <h1>Thank you for shopping with us</h1>
      </div>
      <div className="text-center">
        <Pdf targetRef={ref} filename="invoice.pdf">
          {({ toPdf }) => (
            <Button color="primary" variant="contained" onClick={toPdf}>
              Download PDF
            </Button>
          )}
        </Pdf>
      </div>
    </div>
  );
}

export default withStyles(styles)(PDF);
