import React from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, withStyles
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";

const styles = {
    root: {
        background: "#1f233f",
        // margin: "10px"
    },
    table: {
        minWidth: 700
    },
    tableCell: {
        color: "#dfe1f1",
    },
    tableHead: {
        borderBottom: "1px solid #e0e0e0"
    },
    removeIcon: {
        color: "#f44436",
        cursor: "pointer"
    },
    editIcon: {
        color: "#15edb1",
        marginRight: "20px",
        cursor: "pointer"
    }
};

const CurrencyTable = ({ classes, data, toggleDialog, setSelectedRow }) => {
    return (
        <TableContainer className={classes.root} component={Paper} >
            <Table className={classes.table}>
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell className={classes.tableCell}>ID</TableCell>
                        <TableCell className={classes.tableCell}>Currency Name</TableCell>
                        <TableCell className={classes.tableCell}>Rate (1$ = X rate)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell className={classes.tableCell}>{item.currencyId}</TableCell>
                            <TableCell className={classes.tableCell}>{item.name}</TableCell>
                            <TableCell className={classes.tableCell}>{item.rate}</TableCell>
                            <TableCell className={classes.tableCell} align="right">
                                <Edit
                                    className={classes.editIcon}
                                    onClick={() => {
                                        toggleDialog();
                                        setSelectedRow({ ...item, dialogType: "Edit" })
                                    }}
                                />
                                <Delete
                                    className={classes.removeIcon}
                                    onClick={() => {
                                        toggleDialog();
                                        setSelectedRow({ ...item, dialogType: "Remove" })
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

export default withStyles(styles)(CurrencyTable);