import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import AppsIcon from "@material-ui/icons/Apps";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import { NavLink } from "react-router-dom";
import LocalGroceryStoreIcon from "@material-ui/icons/LocalGroceryStore";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& .makeStyles-content-9": {
      padding: "10px",
    },
    "&.MuiListItemIcon-root": {
      minWidth: "45px",
    },
    "& .MuiListItemIcon-root": {
      marginLeft: "38px",
      minWidth: "45px",
    },
    "& .MuiListItemText-root": {
      textDecoration: "none",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "35px",
    },
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  navlink: {
    color: "white",
    textDecoration: "none",
  },
  decoration: {
    textDecoration: "none",
  },
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            <div className="d-flex linkMain">
              <NavLink
                className="ml-2 mt-1"
                to="/"
                exact
                style={{ textDecoration: "none", color: "white" }}
                activeStyle={{
                  color: "white",
                  textDecoration: "none",
                }}
                className={classes.navlink}
              >
                <LocalGroceryStoreIcon className="mr-2" />
                My Shopping Cart
              </NavLink>
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <NavLink
            to="/"
            exact
            style={{ textDecoration: "none" }}
            className={classes.link}
            activeStyle={{
              color: "#f50057",
              textDecoration: "none",
            }}
          >
            <ListItem button>
              <ListItemIcon>
                <HomeIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </ListItem>
          </NavLink>

          <NavLink
            to="/Category"
            style={{ textDecoration: "none" }}
            activeStyle={{
              color: "#f50057",
              textDecoration: "none",
            }}
            className={classes.link}
          >
            <ListItem button>
              <ListItemIcon>
                <AppsIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={"Categories"} />
            </ListItem>
          </NavLink>

          <NavLink
            to="/Product"
            style={{ textDecoration: "none" }}
            activeStyle={{
              color: "#f50057",
              textDecoration: "none",
            }}
            className={classes.link}
          >
            <ListItem button>
              <ListItemIcon>
                <LocalMallIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                className={classes.decoration}
                primary={"Products"}
              />
            </ListItem>
          </NavLink>
        </List>

        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
  );
}
