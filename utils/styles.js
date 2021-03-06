import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  navbar: {
    backgroundColor: "#803080",
    "& a": {
      color: "#ffffff",
      marginLeft: 10,
    },
  },

  brand: {
    fontWeight: "bold",
    fontSize: "2rem",
  },
  grow: {
    flexGrow: 1,
  },
  main: {
    minHeight: "80vh",
  },
  footer: {
    marginTop: 10,
    textAlign: "center",
  },
  section: {
    marginTop: 10,
    margingBottom: 10,
  },
  form: {
    maxWidth: 800,
    margin: '0 auto',
  },
  navbarButton: {
    color: '#ffffff',
    textTransform: 'initial',
  }

});
export default useStyles;
