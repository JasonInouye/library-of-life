import { React, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Uploader from './Uploader';

function VideoUploadPage() {
    return (
        <main>
            <div className="videoWatch">
                <Uploader />
            </div>
        </main>
    );
}


export default VideoUploadPage;