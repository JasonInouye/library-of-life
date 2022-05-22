import { React, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Uploader from './Uploader';

function VideoUploadPage() {
    return (
        <main 
        // className="sageBackground"
        >
            <div className="videoWatch">
                <h2 
                // className="border sage"
                // ****TODO add dropdown for prompts****
                >If you could do something to change humanity, what would it be?</h2>
                <Uploader />
                <Button variant='outlined' sx={{ margin: '20px' }}>Back</Button>
                <Button variant='contained' sx={{ margin: '20px' }}>Save</Button>
                {/* TODO fix so that customTheme styles components */}
            </div>
        </main>
    );
}


export default VideoUploadPage;