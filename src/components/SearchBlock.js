import React from 'react';
import { TextField } from '@material-ui/core';

export default function SearchBlock({ onInputChange }) {
    return (
        <TextField
            onChange={onInputChange}
            id="outlined-basic"
            placeholder="searchchch"
            variant="outlined"
        />
    );
}
