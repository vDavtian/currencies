import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
        background: ({ background }) => background,
        color: ({ textcolor }) => textcolor,
    },
});

const ButtonComponent = memo((props) => {
    const classes = useStyles(props);

    return <Button className={classes.root} {...props} />;
},
    // TODO
    // (prevProps, nextProps) => {
    //     if (prevProps.disabled !== nextProps.disabled
    //     ) {
    //         return false;
    //     } else {
    //         return true;
    //     }
    // }
);

export default ButtonComponent;