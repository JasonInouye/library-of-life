import React, { useState } from 'react'
import Button from '@mui/material/Button';


function CopyToClipboard({ url }) {

    const textToCopy = `Here's a video I'd like to share with you: ` + url;

    const [copied, setCopied] = useState(false)

    const copyShortURL = () => {

        navigator.clipboard.writeText(textToCopy)

        setTimeout(() => {
            setCopied(false);
        }, 8000);

        setCopied(true);
    };

    return (
        <>
            <div>
                <p>Here's a video I'd like to share with you:
                    <br />
                    <span><h5>{url}</h5></span>
                </p>
                {copied ? (
                    <p>Link copied! <br />
                        You can now paste it in an email or text message.</p>
                ) : (
                    <Button
                        variant='contained'
                        style={{ backgroundColor: '#667b68', color: 'white' }}
                        onClick={copyShortURL}>
                        Click to Copy Link
                    </Button>
                )}
                <br />
            </div>
        </>
    )
}

export default CopyToClipboard