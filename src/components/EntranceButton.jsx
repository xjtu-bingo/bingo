import * as React from "react";
import {ButtonBase, Typography, withStyles} from "material-ui";

const styles = theme => ({
    image: {
        position: 'relative',
        height: 200,
        margin: 20,
        [theme.breakpoints.down('sm')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover': {
            zIndex: 1,
        },
        '&:hover $imageBackdrop': {
            opacity: 0.15,
        },
        '&:hover $imageMarked': {
            opacity: 0,
        },
        '&:hover $imageTitle': {
            border: '4px solid currentColor',
        },
    },
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        background: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    imageMarked: {
        height: 3,
        width: 18,
        background: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    }
});

const EntranceButton = ({classes, title, width, imageUrl, onClick}) => (
    <ButtonBase
        focusRipple
        className={classes.image}
        onClick={onClick}
        style={{width}}
    >
        <div
            className={classes.imageSrc}
            style={{
                backgroundImage: `url(${imageUrl})`,
            }}
        />
        <div className={classes.imageBackdrop}/>
        <div className={classes.imageButton}>
            <Typography
                component="h3"
                variant="title"
                color="inherit"
                className={classes.imageTitle}
            >
                {title}
                <div className={classes.imageMarked}/>
            </Typography>
        </div>
    </ButtonBase>
);

export default withStyles(styles)(EntranceButton);