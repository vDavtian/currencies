import { getData, editData, addData, deleteData } from '../../service';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const CREATE_CURRENCY = 'CREATE_CURRENCY';
export const EDIT_CURRENCY = 'EDIT_CURRENCY';
export const DELETE_CURRENCY = 'DELETE_CURRENCY';

export const getAllCurrencies = () =>
    async (dispatch, getState) => {
        await getData('currency')
            .then(data => {
                dispatch({ type: GET_CURRENCIES, payload: data })
            })
            .catch(err => console.log(err)); // TODO
    };

export const addCurrency = (data) =>
    async (dispatch, getState) => {
        await addData(data, 'currency')
            .then(({ id }) => {
                dispatch({ type: CREATE_CURRENCY, payload: { ...data, id } })
            })
            .catch(err => console.log(err)); // TODO
    };

export const editCurrency = (data) =>
    async (dispatch, getState) => {
        await editData(data, 'currency')
            .then(data => {
                dispatch({ type: EDIT_CURRENCY, payload: data })
            })
            .catch(err => console.log(err)); // TODO
    };

export const deleteCurrency = (id) =>
    async (dispatch, getState) => {
        await deleteData(id, 'currency')
            .then(id => {
                dispatch({ type: DELETE_CURRENCY, payload: { id } })
            })
            .catch(err => console.log(err)); // TODO
    };