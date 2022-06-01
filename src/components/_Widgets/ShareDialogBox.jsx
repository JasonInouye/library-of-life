import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';


/******* needed to create shortened URL  ********/
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';



import SelectToShare from './SelectToShare';
import CopyToClipboard from './CopyToClipboard';

/******* icon  ********/
import { SiSlideshare } from "react-icons/si";



function ShareDialogBox({ title, children, component, callback, video }) {

    const url = video.url
    const shareData = useSelector((store) => store.shareReducer.shareReducer);

    const [open, setOpen] = React.useState(false);

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

    // for shortenURL function
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
        // console.log('INSIDE shortenURL, url before shortening:', url);
        axios.post(`/api/link`, urlObj)
            .then(response => {
                // console.log('the shortened URL on CLIENT side should be:', response);
                setShortenedURL(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const handleSubmit = () => {
        // console.log('clicked Submit for Share Dialog:', shareData);
        setOpen(false);
        dispatch({ type: 'POST_SHARE', payload: shareData });
    };

    const handleClose = () => {
        setOpen(false);
        setShowShortLink(false);
    };


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


            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title">

                <DialogContent>
                    {/* InnerComponent:  */}
                    {/* {open && <InnerComponent />} */}
                    <SelectToShare
                        disableEnforceFocus
                        video={video} />

                    {/* passes the URL so it can be copied to clipboard */}
                    {showShortLink ?

                        <CopyToClipboard
                            url={shortenedURL} />
                        :
                        <>
                            <p>Or, to send a video link by text or email:</p>
                            <Button
                                variant='outlined'
                                style={{ color: '#667b68' }}
                                onClick={() => { setShowShortLink(true) }}>
                                Give me a link</Button>
                        </>
                    }

                </DialogContent>

                <DialogActions>

                    <Button
                        onClick={handleClose} color="primary">
                        Cancel
                    </Button>

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

export default ShareDialogBox;