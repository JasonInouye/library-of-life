import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

// import { Container, Grid } from '@mui/material';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (

    <div>
       <h1 className="centerAbout">About Us</h1>
    
  
    <Card variant="outlined">
        
         
          <p>It is the wealth of emotions, the moments of love and affections cherished over a lifetime
            and the sharing of knowledge that becomes an invaluable asset of one’s life that is passed over from generation to generation.
            What if you can preserve these moments forever?  With a desire to answer the above question, we worked toward this unique concept
            that we came to call-Library of Life. We help preserve your emotions, messages, and more. This service is jointly promoted by
            Freddy Hutt, an enterprising innovator, and Ember that is the technology/solutions partner for putting his dreams into action.
            Leveraging the latest platforms and technologies combined with a humanistic passion as envisioned by our promoter, you can relive
            your memories, share emotions, and of course remain cherished forever in the hearts of your loved ones. Let’s make a difference in
            how we view our relationships in this materialistic world and showcase the power of emotions - an eternal wealth that shall last forever.</p>
       </Card>
       </div>
       
   
  );
}

export default AboutPage;
