import React, { useState, useEffect } from "react";
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
  TextField,
  Toolbar,
  InputAdornment,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Search from "@material-ui/icons/Search";
import CategoryForm from "components/Category/CategoryForm";
import { ToastProvider } from "react-toast-notifications";
import * as CategoryService from "Services/CategoryService";
import Common from "Shared/Common";
import * as CommonStyles from "Shared/CommonStyle";
import Notification from "Shared/Notification";
import ConfirmDialog from "Shared/ConfirmDialog";

const styles = CommonStyles.listStyles();
const headCells = [
  { id: "categoryName", label: "Category" },
  { id: "actions", label: "Actions", disableSorting: true },
];
const CategoryList = ({ classes }) => {
  const [category, setCategory] = useState([]);
  const [currentId, setCurrentId] = useState(0);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const {
    TblPagination,
    recordAftterPagingAndSorting,
    TblHead,
    emptyRows,
    dense,
  } = Common(category, headCells, filterFn);
  const getCategoriesList = async () => {
    const categories = await CategoryService.getCategories();
    setCategory(categories.data);
  };
  useEffect(() => {
    getCategoriesList();
  }, []);
  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    CategoryService.deleteCategory(id)
      .then((data) => {
        getCategoriesList();
        setNotify({
          isOpen: true,
          message: "Category Deleted Successfully",
          type: "error",
        });
      })
      .catch((error) => console.log(error));
  };
  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.categoryName.toLowerCase().includes(target.value)
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
                <CategoryForm
                  category={category}
                  setCategory={setCategory}
                  getCategoriesList={getCategoriesList}
                  currentId={currentId}
                  setCurrentId={setCurrentId}
                />
              </ToastProvider>
            </Grid>
            <Grid item xs={6}>
              <h1 className="categoryTitle">List of Category</h1>
              <hr></hr>
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
                            <TableCell>{record.categoryName}</TableCell>
                            <TableCell>
                              <ButtonGroup variant="text">
                                <Button
                                  onClick={() =>
                                    setCurrentId(record.categoryId)
                                  }
                                >
                                  <EditIcon color="primary" />
                                </Button>
                                <Button
                                  onClick={() => {
                                    setConfirmDialog({
                                      isOpen: true,
                                      title:
                                        "Are you sure to delete this record?",
                                      onConfirm: () => {
                                        onDelete(record.categoryId);
                                      },
                                    });
                                  }}
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
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
  );
};
export default withStyles(styles)(CategoryList);
