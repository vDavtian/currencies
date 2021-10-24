import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { editCurrency, addCurrency, deleteCurrency } from '../store/actions/currencyActions';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';
import SearchBlock from './SearchBlock';
import ButtonComponent from './ButtonComponent';

const DialogComponent = ({
    lastId, open, selectedRow, toggleDialog, editCurrency, addCurrency, deleteCurrency, classes
}) => {
    const [name, setName] = useState('');
    const [rate, setRate] = useState('');
    const [isRateError, setIsRateError] = useState(false);

    useEffect(() => {
        setName(selectedRow.name);
        setRate(selectedRow.rate);
    }, [selectedRow.name, selectedRow.rate]);

    const handleNameChange = (value) => setName(value);

    const handleRateChange = (value) => {
        const isValueContainsOnlyNumbers = /^\d+$/.test(value);

        if (!isValueContainsOnlyNumbers) {
            setIsRateError(true);
        } else {
            setIsRateError(false);
        }

        setRate(value);
    }

    const isConfirmActive = () => {
        const isNotFilled = !name || !rate;
        const isSameValue = selectedRow.name === name?.trim() && selectedRow.rate === rate?.trim();

        return isNotFilled || isSameValue || isRateError;
    }

    const onClose = () => {
        setName('');
        setRate('');
        setIsRateError(false);
        onConfirm(selectedRow)
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
                            <SearchBlock
                                defaultValue={name}
                                placeholder="Enter name"
                                onChange={(e) => handleNameChange(e.target.value)}
                            />
                            <br />
                            Rate
                            <br />
                            <SearchBlock
                                error={isRateError}
                                defaultValue={rate}
                                placeholder="Enter rate"
                                onChange={(e) => { handleRateChange(e.target.value) }}
                            />
                        </DialogContent>
                        : <DialogContent>
                            <DialogContentText>
                                Are you sure you want to remove this Currency
                            </DialogContentText>
                        </DialogContent>
                    }
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
                            disabled={selectedRow.dialogType !== "Remove" ? isConfirmActive() : false}
                            onClick={onClose}
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