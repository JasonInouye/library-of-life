import { React, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';

function VideoWatchPage() {
   
  
   
  
    return (
      <main className="sageBackground">
      <div className="videoWatch">
        <h2 className="border sage">If you could do something to change humanity, what would it be?</h2>
        <h5 className="sage">--video goes here--</h5>
        <Button variant='outlined' sx={{ margin: '20px', color: 'white', backgroundColor: '#667b68' }}>Delete</Button>
        <Button variant='outlined' sx={{ margin: '20px', color: 'white', backgroundColor: '#667b68' }}>Share</Button>
        <Button variant='outlined' sx={{ margin: '20px', color: 'white', backgroundColor: '#667b68' }}>Back</Button>
      </div>
      </main>
    );
  }







export default VideoWatchPage;