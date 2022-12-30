import React, { useState, useEffect } from "react";
import alanBtn from '@alan-ai/alan-sdk-web';
import wordsToNumbers from "words-to-numbers";   //kuki kahi bar boleneg hum 4 aur vo sunega for ,to work ni karega isliye wordstonumbers usekiya
import { Typography } from '@material-ui/core';
import NewsCards from "./components/NewsCards/NewsCards";
// import {  Modal } from './components/Modal';
import Modal from "./components/Modal/Modal";
import logo from './images/logo4.jpg';
import useStyles from './styles.js'


const alankey = '8fe5885b3c3c299c48ab335b029c5fee2e956eca572e1d8b807a3e2338fdd0dc/stage';
// const alankey='1d0745612f6ff88b48ab335b029c5fee2e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1); //index of the artivle it is currently reading,taki shuru se rahve 
    const [isOpen, setIsOpen] = useState(false);
    const classes = useStyles(); //now we are able to call usestules as a hook
    useEffect(() => {

        // window.open(articles[number].url,'_blank');   //this is going to open the new website

        alanBtn({
            key: alankey,//this key allows to use allen,iski madath se allen particular things kai liye respond karega
            onCommand: ({ command, articles, number }) => {
                if (command === 'newHeadlines') {
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                } else if (command === 'highlight') {
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                } else if (command === 'open') {
                    // three=>3
                    // four ,twenty(defnintely larger than 2 and are string,so we need to parse them)
                    // for=>four=>4
                    const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];

                    if (parsedNumber > articles.length) {
                        alanBtn().playText('Please try that again...');
                    } else if (article) {
                        window.open(article.url, '_blank');
                        alanBtn().playText('Opening...');
                    } else {
                        alanBtn().playText('Please try that again...');
                    }
                }
            },
        });
    }, [])
    return (
        <div>
            <div className={classes.logoContainer}>
                {newsArticles.length ? (
                    <div className={classes.infoContainer}>
                        <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
                        <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
                    </div>
                ) : null}
                <img src="https://voicebot.ai/wp-content/uploads/2019/10/alan.jpg" className={classes.alanLogo} alt="logo" />
                {/* <img src="https://voicebot.ai/wp-content/uploads/2019/10/alan.jpg" className={classes.alanLogo} alt="logo" /> */}
            </div>
            {/* <NewsCards articles={newsArticles} activeArticle={activeArticle} />
            activeArticle={activeArticle}
            {!newsArticles.length ? (
                <div className={classes.footer}>
                    <Typography variant="body1" component="h2">
                        @2022
                        <a className={classes.link} href="https://www.linkedin.com/in/ayush-sharma-31250420a">@2022 MADE WITH ❤️ BY AYUSH</a> -
                        <a className={classes.link} href="https://www.youtube.com/channel/UCkIOgPSWCDN4zFJGA7pOLPA"> NEWS APP</a>
                    </Typography>
                    <img className={classes.image} src={logo} height="50px" alt="JSMastery logo" />
                </div>
            ) : null} */}
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
            {!newsArticles.length ? (
                <div className={classes.footer}>
                    <Typography variant="body1" component="h2">
                        Created by
                        {/* @2022 MADE WITH ❤️ BY */}
                        <a className={classes.link} href="https://www.linkedin.com/in/ayush-sharma-31250420a"> AAYUSHARMA</a> -
                        <a className={classes.link} href="https://www.youtube.com/channel/UCkIOgPSWCDN4zFJGA7pOLPA"> NEWS APP</a>
                    </Typography>
                    <img className={classes.image} src={logo} height="45px"  alt="Aayusharma logo" />
                </div>
            ) : null}
        </div>
        // </div >
    )
}

export default App;
