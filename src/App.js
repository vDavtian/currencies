import './App.css';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, Typography } from '@material-ui/core';
import { getAllCurrencies } from './store/actions/currencyActions'
import CurrencyTable from './components/CurrencyTable';
import SearchBlock from './components/SearchBlock';
import Dialog from './components/Dialog';

const App = ({ getAllCurrencies, currencies }) => {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [searchText, setSearchText] = useState('');
  const lastId = Math.max(...currencies.data.map(item => item.currencyId));
  const data = currencies.data.map(item => ({ ...item, searchText: item.name }));

  useEffect(() => {
    getAllCurrencies()
  }, [getAllCurrencies]);

  const toggleDialog = () => setOpen(open => !open);

  const onCreate = () => {
    toggleDialog();
    setSelectedRow({ dialogType: 'Create' });
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
      <Grid container spacing={2} justifyContent={'space-between'} style={{ border: '1px solid red' }}>
        <Typography variant={'h6'}>Custom Currencies</Typography>
        <Button variant="contained" color="primary" onClick={onCreate}>Add Currency</Button>
      </Grid>
      <Grid container spacing={2} style={{ border: '2px solid blue', marginTop: '20px' }}>
        <SearchBlock onInputChange={(e) => setSearchText(e.target.value)} />
        <CurrencyTable
          data={filterData(searchText, data)}
          searchText={searchText}
          toggleDialog={toggleDialog}
          setSelectedRow={setSelectedRow}
        />
      </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);