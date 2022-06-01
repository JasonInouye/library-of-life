import React from "react";
import { useDispatch } from "react-redux";


/******* MUI card ********/
import { Radio, Card, FormControlLabel } from "@mui/material";


function BannerItem({ banner }) {

    const dispatch = useDispatch();

    const handleChange = () => {
        // console.log('the banner picked is', event.target.value);
        dispatch({ type: 'SET_BANNER_REDUCER', payload: event.target.value })
    }

    return (
        <Card >
            <img
                src={banner.url}
                alt={`A picture of ${banner.name}`}
                className='bannerItemImg'
            />

            <div className="bannerCard">

                <FormControlLabel
                    control={<Radio />}
                    value={banner.url}
                    label={banner.name}
                    onChange={handleChange}
                />

            </div>

        </Card>
    )
}

export default BannerItem;