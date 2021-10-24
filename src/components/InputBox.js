import React from "react";
import { TextField, withStyles } from "@material-ui/core";

const styles = {
    input: {
        color: "#dfe1f1",
        backgroundColor: "#1b1e37",
        width: "400px",
    }
};

const InputBox = React.memo(({ onChange, classes, defaultValue, placeholder }) => {
    return (
        <TextField
            InputProps={{ className: classes.input }}
            size="small"
            defaultValue={defaultValue}
            onChange={onChange}
            placeholder={placeholder}
            variant="outlined"
        />
    );
}, (_prevProps, _nextProps) => {
    return true;
});

export default withStyles(styles)(InputBox);