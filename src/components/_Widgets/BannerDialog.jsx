import React from 'react';
import BannerItem from './BannerItem';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import Button from '@material-ui/core/Button';
import { VscEdit } from 'react-icons/vsc';
import { Container, Grid } from '@mui/material';


/******* for sending selected banner  ********/
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const banners = [
    {name: 'Flowers', url: '/images/banners/flowers.png'},
    {name: 'Clouds', url: '/images/banners/clouds.png'},
    {name: 'Balloons', url: '/images/banners/hotairballoons.png'},
    {name: 'Ripple', url: '/images/banners/ripple.png'},
    {name: 'Lemons', url: '/images/banners/lemons.png'},
    {name: 'River', url: '/images/banners/mountainriver.png'},
    {name: 'Canoe', url: '/images/banners/canoe.png'},
    {name: 'Canyon', url: '/images/banners/canyon.png'},
    {name: 'Mountains', url: '/images/banners/mountainsunset.png'},
    {name: 'Rainbow', url: '/images/banners/rainbowsmoke.png'},
    {name: 'Yarn', url: '/images/banners/yarn.png'},
    {name: 'Pier', url: '/images/banners/pier.png'}
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
                    <Container>
                        <Grid
                            container
                            style={{ padding: '1em', textAlign: 'center' }}
                            spacing={1}>

                            {banners?.map((banner, i) => {
                                return ( //loops thru array of banners to create each banner item
                                    < Grid
                                        item xs={12} md={4}
                                        key={banner.id}>

                                        <BannerItem
                                            key={i}
                                            banner={banner} />
                                    </Grid>)
                            })}
                        </Grid>
                    </Container>
                </DialogContent>

                <DialogActions>

                    <Button
                        onClick={handleClose} color="primary">
                        Cancel
                    </Button>

                </DialogActions>

            </Dialog>
        </div >
    );
}

export default BannerDialog;