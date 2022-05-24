import React, { useEffect, useState } from "react";
import './UserVideoItem.css';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayerComponent from "../_Widgets/ReactPlayerComponent";

/******* buttons / dropdown menus  ********/
import PermissionDropdown from "../_Widgets/PermissionDropdown";
import DeleteButton from "../_Widgets/DeleteButton";

/******* MUI structure and media card ********/
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import ShareDialogBox from "../_Widgets/ShareDialogBox";



function UserVideoItem({ video, relationship }) {

    const dispatch = useDispatch();

    // check if user owns videos; don't render edit/delete buttons if not
    const user = useSelector((store) => store.user);

    const handleClickEdit = () => {
        console.log('clicked into dialog');
    };


    return (
        <>
            {relationship == video.permission || relationship == 'self' &&
                <Container >

                    <Card sx={{ minHeight: '18.5em' }}>
                        <Typography
                            style={{ margin: '.5em' }}
                            gutterBottom variant="h7"
                            component="div">
                            {video.prompt}
                        </Typography>

                        <ReactPlayerComponent
                            videoURL={video.url}
                        />

                        {/* if logged-in user, show permissions toggle, delete, and share options*/}
                        {user.id == video.user_id ?
                            <>
                                <CardActions style={{ display: 'contents' }}>
                                    <PermissionDropdown video={video} />

                                    <div style={{
                                        marginBottom: '0.5em',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        flexWrap: 'nowrap',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <DeleteButton
                                            video={video.id} />
                                        <ShareDialogBox
                                            open={open}
                                            onClose={() => setOpen(false)}
                                            aria-labelledby="confirm-dialog"
                                            title="Share"
                                            callback={handleClickEdit}
                                            disableEnforceFocus={true}
                                            video={video} />
                                    </div>

                                </CardActions>
                            </>
                            :
                            null}

                    </Card>
                </Container>
            }
        </>
    )
}

export default UserVideoItem;