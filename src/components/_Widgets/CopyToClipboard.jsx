import React, { useState } from 'react'
import useCopy from "use-copy";
import Button from '@material-ui/core/Button';


/* ******* useCopy: https://www.npmjs.com/package/use-copy ******** */



function CopyToClipboard({ url }) {

    const textToCopy = `Here's a video I'd like to share with you: `+ url;

    const [copied, copy, setCopied] = useCopy(textToCopy);

    const copyShortURL = () => {
        copy();

        setTimeout(() => {
            setCopied(false);
        }, 8000);
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