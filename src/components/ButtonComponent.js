import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
        background: ({ background }) => background,
        color: ({ textcolor }) => textcolor,
    },
});

const ButtonComponent = (props) => {
    const classes = useStyles(props);

    return <Button className={classes.root} {...props} />;
}

export default ButtonComponent;