import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup, Card, Tooltip } from '@material-ui/core';
import { Brightness7, Brightness3 } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    toolBarRoot: {
        padding: theme.spacing(1),
        width:"100%"
    },
    button: {
        margin: theme.spacing(1),
    },
    toolBarButtonGroup: {
        marginRight: theme.spacing(1),
    },
    selected: {
        background: "#0f0 !important"
    }
}));

export default function MainToolBar(props:any) {
    const classes = useStyles();

    return (
        <Card className={classes.toolBarRoot}>
            <ButtonGroup variant="outlined" color="default" className={classes.toolBarButtonGroup}>
                <Tooltip title="Go Dark" aria-label="Go Dark" placement="top">
                    <Button
                        onClick={() => props.toDark(true)}
                        className={ props.darkMode === true ? classes.selected : ""}>
                        <Brightness3 />
                    </Button>
                </Tooltip>
                <Tooltip title="Light Up" aria-label="Light Up" placement="top">
                    <Button
                        onClick={() => props.toDark(false)}
                        className={ props.darkMode === false ? classes.selected : ""}>
                        <Brightness7 />
                    </Button>
                </Tooltip>
            </ButtonGroup>
        </Card>
    );
}