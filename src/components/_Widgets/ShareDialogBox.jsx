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



    const handleClickOpen = () => {
        //CALL THE FUNCTION GIVEN, IF EXISTS:
        { callback ? callback() : null };
        setOpen(true);
        console.log('video url is:', url);
        shortenURL();
    };

    const urlObj = {
        url: url,
        domain: 'tiny.one'
    }

    const [shortenedURL, setShortenedURL] = React.useState('');


    const shortenURL = () => {
        console.log('INSIDE shortenURL, url before shortening:', url);
        axios.post(`/api/link`, urlObj)
            .then(response => {
                console.log('the shortened URL on CLIENT side should be:', response.data.data.tiny_url);
                setShortenedURL(response.data.data.tiny_url);
            })
            .catch(error => {
                console.log(error);
            });
    }

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

                    {/* passes the URL so it can be copied to clipboard */}
                    {showShortLink ?

                        <CopyToClipboard
                            url={shortenedURL} />
                        :
                        <>
                            <p>or</p>
                            <p onClick={()=>{setShowShortLink(true)}}>
                                Give me a link to send by text or email</p>
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
                    {/* TODO make button work with callback passed prop? <Button onClick={handleClose} color="primary">
                        Add treat
                    </Button> */}
                </DialogActions>
            </Dialog>
        </div>
    );
}