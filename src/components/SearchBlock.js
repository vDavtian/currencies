import React from "react";
import { TextField, withStyles } from "@material-ui/core";

const styles = {
    input: {
        color: "#dfe1f1",
        backgroundColor: "#1b1e37",
        width: "400px",
    }
};

function SearchBlock({ onInputChange, classes }) {
    return (
        <TextField
            InputProps={{ className: classes.input }}
            size="small"
            onChange={onInputChange}
            placeholder="Search currency by Currency name"
            variant="outlined"
        />
    );
}

export default withStyles(styles)(SearchBlock);