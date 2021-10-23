import {
    GET_CURRENCIES, CREATE_CURRENCY, EDIT_CURRENCY, DELETE_CURRENCY
} from "../actions/currencyActions";

const initialState = {
    isLoading: false,
    data: []
};

const currencies = (state = initialState, action) => {
    switch (action.type) {
        case GET_CURRENCIES:
            return {
                ...state,
                data: action.payload
            };
        case CREATE_CURRENCY:
            return {
                ...state,
                data: [...state.data, action.payload]
            };
        case EDIT_CURRENCY: {
            const { payload: editedItem } = action;
            return {
                ...state,
                data: state.data.map(item => editedItem.id === item.id ? editedItem : item)
            };
        }
        case DELETE_CURRENCY:
            return {
                ...state,
                data: state.data.filter(({ id }) => id !== action.payload.id)
            };
        default:
            return state;
    }
}

export default currencies;