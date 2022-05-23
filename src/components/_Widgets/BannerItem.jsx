import React from "react";
import { useSelector } from 'react-redux';

/******* buttons / dropdown menus  ********/


/******* MUI structure and media card ********/
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';



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
                    <Typography
                        style={{ margin: '.5em' }}
                        gutterBottom variant="h7"
                        component="div">
                        {banner.name}
                    </Typography>

                    <img 
                    src={banner.url} alt={`A picture of ${banner.name}`} />
                    <>
                        <CardActions style={{ display: 'contents' }}>
                           
                            <div style={{
                                marginBottom: '0.5em',
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'nowrap',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            </div>

                        </CardActions>
                    </>
                </Card>
            </Container>
        </>
    )
}

export default BannerItem;