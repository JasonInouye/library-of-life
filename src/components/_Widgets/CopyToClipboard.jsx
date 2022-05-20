import React, { useState } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import useCopy from "use-copy";






function CopyToClipboard({url}) {

    const [longURL, setLongURL] = useState('');

    /******* start useCopy  ********/

    const [shortURL, setShortURL] = useState('(this is where the tinyURL will go)');
    const [copied, copy, setCopied] = useCopy(url);

    const copyShortURL = () => {
        copy();

        setTimeout(() => {
            setCopied(false);
        }, 8000);
    };

    /******* end useCopy  ********/


    const shortenURL = (event) => {
        event.preventDefault();
        console.log('url/input shortURL on client side is:', longURL);
        axios.post(`/link`, longURL)
            .then(response => {
                console.log(response.data);
                setShortURL(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }


    return (
        <>


            {/* ******* this is useCopy: https://www.npmjs.com/package/use-copy ******** */}
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