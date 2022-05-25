import React from "react";
import { useSelector } from 'react-redux';
import '../../UserPage/UserPage.css'


/******* MUI card ********/
import { Radio, Typography, Card  } from "@mui/material";



function BannerItem({ banner }) {

    // check if user owns banners; don't render edit/delete buttons if not
    const user = useSelector((store) => store.user);

    const handleClickEdit = () => {
        console.log('clicked into dialog');
    };

    return (
            <Card >
                <img
                    src={banner.url}
                    alt={`A picture of ${banner.name}`}
                    className='bannerItemImg' 
                    />

              <div className="bannerCard">
                <Typography
                    style={{ margin: '.5em' }}
                    gutterBottom variant="h7"
                    component="div">
                    {banner.name}
                </Typography>
                {/* QUESTION how to use RadioGroup across components? */}

                <Radio value={banner.url} />
                </div>

                   

            </Card>
    )
}

export default BannerItem;