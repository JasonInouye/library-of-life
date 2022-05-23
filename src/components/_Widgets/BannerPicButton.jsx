import React from 'react'
import { useDispatch } from 'react-redux';

import { Button } from '@mui/material';
import { VscEdit } from 'react-icons/vsc';


function BannerPicButton() {

    const handleBannerPic = () => {
        console.log('clicked handleBannerPic');
        // TODO connect with dropzone? or other means of upload
    }

    return (
        <Button
            onClick={handleBannerPic}
            style={{
                position: 'absolute',
                right: '0.5em',
                top: '13em',
                color: 'ghostwhite',
                textShadow: '2 2 1 black',
            }}
            size="small"
            variant="contained"
            startIcon={<VscEdit />}>
            Edit Banner Image
        </Button>
    )
}

export default BannerPicButton




