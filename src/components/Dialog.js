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
    //TODO fix initial state value
    const [name, setName] = useState(''); // selectedRow.name || ""
    const [rate, setRate] = useState(''); // selectedRow.rate || ""

    useEffect(() => {
        //TODO remove this part & fix initial state value
        setName(selectedRow.name);
        setRate(selectedRow.rate);
    }, [selectedRow.name, selectedRow.rate]);

    const isConfirmActive = () => {
        const isNotFilled = !name || !rate;
        const isSameValue = selectedRow.name === name?.trim() && selectedRow.rate === rate?.trim();
        const isContainsOnlyNumbers = !(/^\d+$/.test(rate?.trim()));

        return isNotFilled || isSameValue || isContainsOnlyNumbers;
    }

    const onClose = () => {
        // TODO fix state changin
        setName('');
        setRate('');
        toggleDialog();
    }

    const onConfirm = (selectedRow) => {
        const { dialogType, rate: selectedRowRate, id: selectedRowId, currencyId } = selectedRow;
        const newName = name.trim();
        const newRate = rate.trim();

        switch (dialogType) {
            case 'Create':
                return addCurrency({
                    name: newName,
                    currencyId: lastId + 1,
                    rate: newRate
                });
            case 'Edit':
                return editCurrency({
                    name: newName,
                    currencyId,
                    rate: newRate || selectedRowRate,
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
            <Dialog open={open} onClose={onClose}>
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
                                onChange={(e) => setName(e.target.value)}
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