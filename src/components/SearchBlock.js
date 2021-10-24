import React from "react";
import { TextField, withStyles } from "@material-ui/core";

const styles = {
    input: {
        color: "#dfe1f1",
        backgroundColor: "#1b1e37",
        width: "400px",
    }
};

const InputBox = ({ onChange, classes, defaultValue, placeholder, error }) => {
    return (
        <TextField
            InputProps={{ className: classes.input }}
            size="small"
            error={error}
            defaultValue={defaultValue}
            onChange={onChange}
            placeholder={placeholder}
            variant="outlined"
        />
    );
}

export default withStyles(styles)(InputBox);