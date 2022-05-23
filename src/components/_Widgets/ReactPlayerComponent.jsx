import React from 'react';

/******* video player  ********/
import ReactPlayer from 'react-player';


function ReactPlayerComponent({videoURL}) {
    
    return (
        <ReactPlayer
            className='react-player'
            width='100%'
            height='100%'
            url={videoURL}
            controls={true} />
    );
}

export default ReactPlayerComponent;