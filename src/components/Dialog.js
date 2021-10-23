import React, { useState } from 'react';
import { connect } from 'react-redux';
import { editCurrency, addCurrency, deleteCurrency } from '../store/actions/currencyActions';
import {
    Dialog,
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from '@material-ui/core';

function ResponsiveDialog({ lastId, open, selectedRow, toggleDialog, editCurrency, addCurrency, deleteCurrency }) {
    const [name, setName] = useState('');
    const [rate, setRate] = useState();

    const onConfirm = (selectedRow) => {
        const { dialogType, rate: selectedRowRate, id: selectedRowId } = selectedRow;

        switch (dialogType) {
            case 'Create':
                return addCurrency({
                    name,
                    currencyId: lastId + 1,
                    rate: parseInt(rate)
                });
            case 'Edit':
                return editCurrency({
                    name,
                    currencyId: 12,
                    rate: parseInt(rate || selectedRowRate),
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
                <DialogTitle id="responsive-dialog-title">
                    {`${selectedRow.dialogType} Currency`}
                </DialogTitle>
                {selectedRow.dialogType !== 'Remove'
                    ? <DialogContent>
                        <TextField
                            variant="outlined"
                            defaultValue={selectedRow.name || ''}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <br />
                        <TextField
                            variant="outlined"
                            defaultValue={selectedRow.rate || ''}
                            onChange={(e) => setRate(e.target.value)}
                        />
                    </DialogContent>
                    : <DialogContent>
                        <DialogContentText>
                            Are you sure you want to remove this Currency
                        </DialogContentText>
                    </DialogContent>}
                <DialogActions>
                    <Button onClick={toggleDialog}>Cancel</Button>
                    <Button onClick={() => {
                        toggleDialog();
                        onConfirm(selectedRow)
                    }}>Confirm</Button>
                </DialogActions>
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

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveDialog);
