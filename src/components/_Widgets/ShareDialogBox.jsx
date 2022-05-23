import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames';


/******* needed to create shortened URL  ********/
import { useDispatch } from 'react-redux';
import axios from 'axios';



import SelectToShare from './SelectToShare';
import CopyToClipboard from './CopyToClipboard';

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
    const url = video.url
    const [showShortLink, setShowShortLink] = React.useState(false);
    const dispatch = useDispatch();



    const handleClickOpen = () => {
        //CALL THE FUNCTION GIVEN, IF EXISTS:
        { callback ? callback() : null };
        setOpen(true);
        console.log('video url is:', url);
        shortenURL();
        getConnections();
    };

    // move into shortenURL function
    const urlObj = {
        url: url,
        domain: 'tiny.one'
    }

    const [shortenedURL, setShortenedURL] = React.useState('');

    const getConnections = () => {
        // console.log('clicked getConnections');
        dispatch({ type: 'GET_CONNECTIONS' })
    }

    const shortenURL = () => {
        console.log('INSIDE shortenURL, url before shortening:', url);
        axios.post(`/api/link`, urlObj)
            .then(response => {
                console.log('the shortened URL on CLIENT side should be:', response);
                setShortenedURL(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const handleSubmit = () => {
        console.log('clicked Submit for Share Dialog');
        // add sweetalert in promise
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
        setShowShortLink(false);
    };

    const classes = useStyles();

    //establishing children as passed in Form (or other) components
    const InnerComponent = component || (() => children);


    return (


        <div>

            <Button
                size="small"
                variant='contained'
                color='primary'
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

                    {/* passes the URL so it can be copied to clipboard */}
                    {showShortLink ?

                        <CopyToClipboard
                            url={shortenedURL} />
                        :
                        <>
                            <p>Or, to send a video link by text or email:</p>
                            <Button
                                variant='outlined'
                                style={{color:'#667b68'}}
                                onClick={() => { setShowShortLink(true) }}>
                                Give me a link</Button>
                        </>
                    }

                </DialogContent>

                <DialogActions>

                    <Button
                        // className={classes.btn} //more subtle non-button appearance
                        className={classes.cancel}
                        onClick={handleClose} color="primary">
                        Cancel
                    </Button>

                    {/* TODO disable button if no one selected? disable if showing tiny link??*/}
                    <Button
                        variant='contained'
                        onClick={handleSubmit} color="primary">
                        Send video
                    </Button>


                </DialogActions>
            </Dialog>
        </div>
    );
}