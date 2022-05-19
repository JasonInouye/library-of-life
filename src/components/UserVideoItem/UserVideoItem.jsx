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

/******* general MUI structure  ********/
import Container from '@mui/material/Container';



function UserVideoItem({ video }) {

    // check if user owns videos; don't render edit/delete buttons if not
    const user = useSelector((store) => store.user);


    return (
        <>
            <Container>
                {/* the video */}
                <ReactPlayer
                    className='react-player'
                    width='100%'
                    height='100%'
                    url={video.url}
                    controls={true} />

                {/* if logged-in user, show permissions toggle, delete, and share options*/}
                {user.id == video.user_id ?
                    <>
                        <PermissionDropdown />

                        <ShareButton />

                        <DeleteButton 
                        video={video}/>
                    </>
                    :
                    null}

            </Container>
        </>
    )
}

export default UserVideoItem;