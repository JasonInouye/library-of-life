import React from "react";
import { useDispatch } from "react-redux";


/******* MUI card ********/
import { Radio, Typography, Card, FormControlLabel } from "@mui/material";



function BannerItem({ banner }) {

    const dispatch = useDispatch();

    const handleChange = () => {
        console.log('the banner picked is', event.target.value);
        // dispatch({ type: 'SELECT_BANNER', payload: event.target.value})
    }

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

                <FormControlLabel
                    control={<Radio />}
                    value={banner.url}
                    label={banner.name}
                    onChange={handleChange}
                />
                {/* <Radio
                    value={banner.url}
                    onChange={handleChange}
                /> */}
            </div>

        </Card>
    )
}

export default BannerItem;