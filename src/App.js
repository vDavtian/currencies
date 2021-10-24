import "./App.css";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Grid, Typography, Box, withStyles } from "@material-ui/core";
import { getAllCurrencies } from "./store/actions/currencyActions"
import CurrencyTable from "./components/CurrencyTable";
import InputBox from "./components/InputBox";
import Dialog from "./components/Dialog";
import ButtonComponent from "./components/ButtonComponent";

const styles = {
  searchBlock: {
    marginTop: "15px"
  },
  tableContainer: {
    marginTop: "25px",
    backgroundColor: "#1f233f",
    padding: "20px",
    borderRadius: "3px"
  }
};

const App = ({ getAllCurrencies, currencies, classes }) => {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [searchText, setSearchText] = useState("");
  const lastId = Math.max(...currencies.data.map(item => item.currencyId)) | 0;

  useEffect(() => {
    getAllCurrencies()
  }, [getAllCurrencies]);

  const toggleDialog = () => setOpen(open => !open);

  const onCreate = () => {
    toggleDialog();
    setSelectedRow({ dialogType: "Create" });
  }

  const filterData = (searchText, data) => {
    if (!searchText.trim().length) {
      return data;
    }
    const searchBy = searchText.trim().toString().toLowerCase();
    const filteredData = data.filter(({ name }) =>
      name.toString().toLowerCase().indexOf(searchBy) !== -1)

    return filteredData;
  }

  return (
    <div className="App">
      <Grid container justifyContent={"space-between"}>
        <Typography variant={"h5"}>Custom Currencies</Typography>
        <ButtonComponent
          background="#02baff"
          textcolor="white"
          variant="contained"
          onClick={onCreate}
        >
          Add Currency
        </ButtonComponent>
      </Grid>
      <Grid container justifyContent={"flex-end"} className={classes.tableContainer}>
        <Box className={classes.searchBlock}>
          <InputBox
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search currency by Currency name" />
        </Box>
        <CurrencyTable
          data={filterData(searchText, currencies.data)}
          searchText={searchText}
          toggleDialog={toggleDialog}
          setSelectedRow={setSelectedRow}
        />
      </Grid >
      <Dialog
        open={open}
        toggleDialog={toggleDialog}
        selectedRow={selectedRow}
        lastId={lastId}
      />
    </div >
  );
}

const mapStateToProps = state => ({
  currencies: state.currencies
})

const mapDispatchToProps = {
  getAllCurrencies: getAllCurrencies
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));