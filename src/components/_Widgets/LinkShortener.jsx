import React, { useState } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import useCopy from "use-copy";






function LinkShortener({url}) {

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
                // dispatch({ type: 'SET_URL', payload: response.data })
                setShortURL(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }


    return (
        <>
            {/* <div>Link Shortener</div>
            <form onSubmit={shortenURL}>
                <input 
                value={longURL} 
                style={{width:'300px'}}
                placeholder='paste long URL here and hit enter'
                type="shortURL" 
                onChange={(event) => setLongURL(event.target.value)} />
            </form> */}

            {/* ******* useCopy https://www.npmjs.com/package/use-copy ******** */}
            <div>
                <p>This will copy to the clipboard:</p>
                <h3>{shortURL}</h3>
                {copied ? (
                    <p>Link copied! You can now paste it in an email or shortURL</p>
                ) : (
                    <button onClick={copyShortURL}>Copy shortURL</button>
                )}
                <br />
            </div>
            {/* ******* useCopy  ******** */}


        </>
    )
}

export default LinkShortener