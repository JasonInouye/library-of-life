import React from "react";
import { useSelector } from 'react-redux';

/******* buttons / dropdown menus  ********/


/******* MUI structure and media card ********/
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Radio, RadioGroup } from "@mui/material";



function BannerItem({ banner }) {

    // check if user owns banners; don't render edit/delete buttons if not
    const user = useSelector((store) => store.user);

    const handleClickEdit = () => {
        console.log('clicked into dialog');
    };

    return (
        <>
            <Container>

                <Card>
                    <img
                        src={banner.url}
                        alt={`A picture of ${banner.name}`} 
                        style={{height:'2em', width:'100%'}}/>
                    <div
                        style={{
                            marginBottom: '0.5em',
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'nowrap',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Typography
                            style={{ margin: '.5em' }}
                            gutterBottom variant="h7"
                            component="div">
                            {banner.name}
                        </Typography>
                        {/* QUESTION how to use RadioGroup across components? */}
                        <RadioGroup>
                            <Radio value={banner.url} />
                        </RadioGroup>
                    </div>

                    {/* <div style={{
                        marginBottom: '0.5em',
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'nowrap',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}> 

                    </div>
                    */}

                </Card>
            </Container>
        </>
    )
}

export default BannerItem;