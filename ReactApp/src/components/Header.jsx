import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ backgroundColor: "#66bb6a", marginBottom: "25px" }}
      >
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            学習記録アプリ
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
