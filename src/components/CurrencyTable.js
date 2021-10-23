import React from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';

export default function CurrencyTable({ data, toggleDialog, setSelectedRow }) {
    return (
        <TableContainer style={{ border: '1px solid pink', margin: '10px' }} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Currency Name</TableCell>
                        <TableCell>Rate (1$ = X rate)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.currencyId}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.rate}</TableCell>
                            <TableCell align="right">
                                <Edit
                                    onClick={() => {
                                        toggleDialog();
                                        setSelectedRow({ ...item, dialogType: 'Edit' })
                                    }}
                                />
                                <Delete
                                    color='secondary'
                                    onClick={() => {
                                        toggleDialog();
                                        setSelectedRow({ ...item, dialogType: 'Remove' })
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}