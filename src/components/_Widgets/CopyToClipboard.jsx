import React, { useState } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import useCopy from "use-copy";

/* ******* useCopy: https://www.npmjs.com/package/use-copy ******** */ 





function CopyToClipboard({ url }) {

    const [copied, copy, setCopied] = useCopy(url);

    const copyShortURL = () => {
        copy();

        setTimeout(() => {
            setCopied(false);
        }, 8000);
    };

    return (
        <>
            <div>
                <h3>{url}</h3>
                {copied ? (
                    <p>Link copied! You can now paste it in an email or text message</p>
                ) : (
                    <button onClick={copyShortURL}>Copy video link</button>
                )}
                <br />
            </div>
        </>
    )
}

export default CopyToClipboard