import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import { VscEdit } from 'react-icons/vsc';


/******* for sending selected banner  ********/
import { useDispatch } from 'react-redux';
import axios from 'axios';


function BannerDialog({ title, children, component, callback, video }) {

    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();



    const handleClickOpen = () => {
        // //CALL THE FUNCTION GIVEN, IF EXISTS:
        // { callback ? callback() : null };
        setOpen(true);
        console.log();
    };


    const handleClose = () => {
        setOpen(false);
    };

    const handleBannerPic = () => {
        console.log('clicked handleBannerPic');
        // TODO need single select modal, with cards of available banners
    }


    //establishing children as passed in Form (or other) components
    const InnerComponent = component || (() => children);


    return (

        
        <div>

            <Button
                onClick={handleClickOpen}
                style={{
                    position: 'absolute',
                    right: '0.5em',
                    top: '13em',
                    // color: 'ghostwhite',
                    // textShadow: '2 2 1 black',
                }}
                color="primary"
                size="small"
                variant="contained"
                startIcon={<VscEdit />}>
                Edit Banner Image
            </Button>


            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">

                <DialogContent>
                   
                   <h1>banner dialog</h1>
                    
                </DialogContent>

                <DialogActions>

                    <Button
                        onClick={handleClose} color="primary">
                        Cancel
                    </Button>

                </DialogActions>
            </Dialog>
        </div>
    );
}

export default BannerDialog;