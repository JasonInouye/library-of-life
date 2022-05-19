import React from "react";
import './UserVideoItem.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';

/******* video player  ********/
import ReactPlayer from 'react-player';

/******* icons  ********/
import { VscTrash } from "react-icons/vsc";
import { SiSlideshare } from "react-icons/si";

/******* buttons / dropdown menus  ********/
import ShareButton from "../_Widgets/ShareButton";
import PermissionDropdown from "../_Widgets/PermissionDropdown";
import DeleteButton from "../_Widgets/DeleteButton";

/******* MUI structure and media card ********/
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function UserVideoItem({ video }) {

    // check if user owns videos; don't render edit/delete buttons if not
    const user = useSelector((store) => store.user);


    return (
        <>
            <Container>
                {/* the video */}
                <h5>{video.prompt}</h5>
                {/* <ReactPlayer
                    className='react-player'
                    width='100%'
                    height='100%'
                    url={video.url}
                    controls={true} /> */}
                <Card sx={{ height: 350, maxWidth: 450}}>
                    <CardMedia
                        component="iframe"
                        src="https://d2qw0j2prooaok.cloudfront.net/1315907.mp4"
                    // image="/https://d2qw0j2prooaok.cloudfront.net/1315907.mp4"
                    />

                    {/* if logged-in user, show permissions toggle, delete, and share options*/}
                    {user.id == video.user_id ?
                        <>
                            <CardActions style={{display:'flex', flexDirection:'column'}}>
                                <PermissionDropdown />

                                <ShareButton />

                                <DeleteButton
                                    video={video} />
                            </CardActions>
                        </>
                        :
                        null}

                </Card>
            </Container>
        </>
    )
}

export default UserVideoItem;