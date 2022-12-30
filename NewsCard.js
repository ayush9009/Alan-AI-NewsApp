import React, { useState, useEffect, createRef } from 'react'
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import classNames from 'classnames';

import useStyles from './styles.js';


// Typography is a Material-UI component used to standardize the text and its related CSS properties
//  without worrying about browser compatibility issues
// gutter bottom some margin or paddding at the bottom

const NewsCard = ({ article: { description, publishedAt, source, title, url, urlToImage }, i, activeArticle }) => {
  const classes = useStyles();
  const [elRefs, setElRefs] = useState([]);
  const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);

  useEffect(() => {
    setElRefs((refs) => Array(20).fill().map((_, j) => refs[j] || createRef()));
    // iski madath se using voice scroll hove
  }, []);

  useEffect(() => {
    if (i === activeArticle && elRefs[activeArticle]) {
      scrollToRef(elRefs[activeArticle]);
    }
  }, [i, activeArticle, elRefs])
  return (

    // <Card className={classNames(classes.card,activeArticle === i ? classes.activeCard:null)}>
    <Card ref={elRefs[i]} className={classNames(classes.card, activeArticle === i ? classes.activeCard : null)}>
      {/* target blacnk ka mtlb website is going to open on the other page not on our page */}
      <CardActionArea href={url} target="_blank">

        {/* agr image milgyi to theek nhi to ye url valli image show ho ja jani chaiye */}
        <CardMedia className={classes.media} image={urlToImage || 'https://t3.ftcdn.net/jpg/03/07/93/88/360_F_307938835_NChzYE26DIyfzHdAdW722BTaOnjaHSqV.jpg'} />
        <div className={classes.details}>
          {/* to date string kuki humbe sirf date chaiye time vagera kuch ni choauye */}
          <Typography variant="body2" color="textSecondary" component="h2">{(new Date(publishedAt)).toDateString()}</Typography>
          <Typography variant="body2" color="textSecondary" component="h2">{source.name}</Typography>
        </div>

        <Typography className={classes.title} gutterBottom variant="h5">{title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
        </CardContent>
      </CardActionArea>
      {/* className={classes.cardActions} */}
      <CardActions className={classes.cardActions} >
        <Button size="small" color="primary">Learn More</Button>
        <Typography variant="h5" color="textSecondary">{i + 1}</Typography>
      </CardActions>

    </Card>
  )
}

export default NewsCard;

