import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { editCurrency, addCurrency, deleteCurrency } from '../store/actions/currencyActions';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@material-ui/core';
import InputBox from './InputBox';
import ButtonComponent from './ButtonComponent';

const DialogComponent = ({
    lastId, open, selectedRow, toggleDialog, editCurrency, addCurrency, deleteCurrency, classes
}) => {
    const [name, setName] = useState('');
    const [rate, setRate] = useState('');

    useEffect(() => {
        setName(selectedRow.name);
        setRate(selectedRow.rate);
    }, [selectedRow.name, selectedRow.rate]);

    const handleNameChange = (value) => setName(value);

    const isConfirmActive = () => {
        const isNotFilled = !name || !rate;
        const isSameValue = selectedRow.name === name?.trim() && selectedRow.rate === rate?.trim();
        const isContainsOnlyNumbers = !(/^\d+$/.test(rate));

        return isNotFilled || isSameValue || isContainsOnlyNumbers;
    }

    const onClose = () => {
        setName('');
        setRate('');
        toggleDialog();
    }

    const onConfirm = (selectedRow) => {
        const { dialogType, rate: selectedRowRate, id: selectedRowId, currencyId } = selectedRow;

        switch (dialogType) {
            case 'Create':
                return addCurrency({
                    name,
                    currencyId: lastId + 1,
                    rate
                });
            case 'Edit':
                return editCurrency({
                    name,
                    currencyId,
                    rate: rate || selectedRowRate,
                    id: selectedRowId
                });
            case "Remove":
                return deleteCurrency(selectedRowId);
            default:
                return void 0;
        }
    }

    return (
        <div>
            <Dialog open={open} onClose={toggleDialog}>
                <div style={{ backgroundColor: '#1f233d', color: 'white' }}>
                    <DialogTitle id="responsive-dialog-title">
                        {`${selectedRow.dialogType} Currency`}
                    </DialogTitle>
                    {selectedRow.dialogType !== 'Remove'
                        ? <DialogContent>
                            Name
                            <br />
                            <InputBox
                                defaultValue={name}
                                placeholder="Enter name"
                                onChange={(e) => handleNameChange(e.target.value)}
                            />
                            <br />
                            Rate
                            <br />
                            <InputBox
                                defaultValue={rate}
                                placeholder="Enter rate"
                                onChange={(e) => { setRate(e.target.value) }}
                            />
                        </DialogContent>
                        : <DialogContent>
                            Are you sure you want to remove this Currency
                        </DialogContent>}
                    <DialogActions>
                        <ButtonComponent
                            variant="text"
                            textcolor="#02baff"
                            onClick={toggleDialog}
                        >
                            Cancel
                        </ButtonComponent>
                        <ButtonComponent
                            background="#02baff"
                            variant="contained"
                            textcolor="white"
                            disabled={selectedRow.dialogType !== "Remove" ? isConfirmActive() : false}
                            onClick={() => { onClose(); onConfirm(selectedRow) }}
                        >
                            Confirm
                        </ButtonComponent>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    );
}

const mapStateToProps = state => ({
    currencies: state.currencies
})

const mapDispatchToProps = {
    editCurrency: editCurrency,
    addCurrency: addCurrency,
    deleteCurrency: deleteCurrency
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogComponent);