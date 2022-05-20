import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames';

/******* needed to create shortened URL  ********/
import { useDispatch } from 'react-redux';


import SelectToShare from './SelectToShare';
import LinkShortener from './LinkShortener';

/******* icon  ********/
import { SiSlideshare } from "react-icons/si";

const useStyles = makeStyles({
    btn: {
        backgroundColor: "#F8D9D6",
        color: 'black',
        '&:hover': {
            backgroundColor: "#e75480"
        },
    },
    addTreat: {
        top: "10px",
    },
    cancel: {
        color: "grey"
    }
})

export default function ShareDialogBox({ title, children, component, callback, video }) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const url = video.url


    const handleClickOpen = () => {
        //CALL THE FUNCTION GIVEN, IF EXISTS:
        { callback ? callback() : null };
        setOpen(true);
        // dispatch({type: 'SET_VIDEO_URL', payload: url})
        console.log('video url is:', url);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const classes = useStyles();

    //establishing children as passed in Form (or other) components
    const InnerComponent = component || (() => children);


    return (


        <div>

            <Button
                size="small"
                variant='contained'
                style={{ backgroundColor: '#667b68', color: 'white' }}
                onClick={handleClickOpen}>
                Share
                <span style={{ paddingLeft: '5px' }}>
                    <SiSlideshare />
                </span>
            </Button>


            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogContent>
                    {/* InnerComponent:  */}
                    {/* {open && <InnerComponent />} */}
                    <SelectToShare
                        disableEnforceFocus />

                    <LinkShortener 
                    url={url}/>
                    {/* this passes the clicked video info so the URL can be created */}

                </DialogContent>
                <DialogActions>
                    <Button
                        // className={classes.btn} //more subtle non-button appearance
                        className={classes.cancel}
                        onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    {/* TODO make button work with callback passed prop? <Button onClick={handleClose} color="primary">
                        Add treat
                    </Button> */}
                </DialogActions>
            </Dialog>
        </div>
    );
}