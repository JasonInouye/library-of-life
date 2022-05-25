import React from 'react';
import BannerItem from './BannerItem';
import '../../UserPage/UserPage.css'

import {Dialog, DialogActions, DialogContent } from '@mui/material';

import { VscEdit } from 'react-icons/vsc';
import { Button, Container, Grid, RadioGroup } from '@mui/material';


/******* for sending selected banner  ********/
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const banners = [
    { name: 'Flowers', url: '/images/banners/yellowwall.png' },
    { name: 'Clouds', url: '/images/banners/clouds.png' },
    { name: 'Balloons', url: '/images/banners/hotairballoons.png' },
    { name: 'Ripple', url: '/images/banners/ripple.png' },
    { name: 'Lemons', url: '/images/banners/lemons.png' },
    { name: 'River', url: '/images/banners/mountainriver.png' },
    { name: 'Canoe', url: '/images/banners/canoe.png' },
    { name: 'Canyon', url: '/images/banners/canyon.png' },
    { name: 'Mountains', url: '/images/banners/mountainsunset.png' },
    { name: 'Rainbow', url: '/images/banners/rainbowsmoke.png' },
    { name: 'Yarn', url: '/images/banners/yarn.png' },
    { name: 'Pier', url: '/images/banners/pier.png' }
]

function BannerDialog({ title, children, component, callback, banner }) {

    // const banners = useSelector((store) => store.bannerReducer);
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

    const handleSubmit = () => {
        // console.log('clicked "save changes" for banner');
        // TODO dispatch
        // TODO put in the promise: swal("Good job!", "You clicked the button!", "success");
        setOpen(false);
    }


    //establishing children as passed in Form (or other) components
    const InnerComponent = component || (() => children);


    return (


        <div>

            <Button
                onClick={handleClickOpen}
                id="bannerButton"
                color="primary"
                size="small"
                variant="contained"
                startIcon={<VscEdit />}>
                Edit Banner Image
            </Button>


            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                fullWidth
                maxWidth="sm"
            >

                <DialogContent>
                    <Container>
                        <Grid
                            container
                            spacing={5}
                            className="bannerTileGrid">
                            <RadioGroup>
                                {banners?.map((banner, i) => {
                                    return ( //loops thru array of banners to create each banner item
                                        < Grid
                                            item xs={12} md={8}
                                            key={banner.id}>

                                            <BannerItem
                                                key={i}
                                                banner={banner} />

                                        </Grid>)
                                })}
                            </RadioGroup>
                        </Grid>
                    </Container>
                </DialogContent>

                <DialogActions>

                    <Button
                        onClick={handleClose} color="primary">
                        Cancel
                    </Button>

                    <Button
                        onClick={handleSubmit} color="primary"
                        variant='contained'>
                        Save Changes
                    </Button>



                </DialogActions>

            </Dialog>
        </div >
    );
}

export default BannerDialog;