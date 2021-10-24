import React from "react";
import { Button, withStyles } from "@material-ui/core";

const styles = {
    createButton: {
        backgroundColor: '#02baff',
        color: '#e0e0e0'
    },
};

const ButtonComponent = ({ variant, onClick, classes, children, disabled }) => {
    return (
        <Button
            disabled={disabled}
            variant={variant}
            onClick={onClick}
            className={classes.createButton}
        >
            {children}
        </Button>
    );
}

export default withStyles(styles)(ButtonComponent);