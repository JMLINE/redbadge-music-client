import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import { TrackList, TrackResponse } from './MusicInterface';
import { Grid } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
export interface MusicDisplayProps {
  message : TrackResponse
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    cardspacing: {
      padding: "1%"
  }
  }),
);
function MusicDisplay(props: MusicDisplayProps) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div>
      <Grid container>
          {props.message.message.body.track_list.map((trackList: TrackList, index: number) => (
          <Grid item xs={4} sm={4} className={classes.cardspacing} key={index}>
    <Card className={classes.root} style={{backgroundColor: 'darksalmon'}}>
      <CardContent>
        <Typography variant="body2" color='textPrimary' component="p">
        {trackList.track.artist_name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
        {trackList.track.album_name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
        {trackList.track.track_name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
        <a href ={trackList.track.track_edit_url} target='blank'>Click here for Lyrics</a>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" style={{color: 'red'}}>
          <FavoriteIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>Ratings/Review:</Typography>
          <form className={classes.root} >
          <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
          </form>
          <form className={classes.root} noValidate autoComplete="off">
          <TextField id="outlined-basic" label="Write a Review" variant="outlined" />
          </form>
        </CardContent>
      </Collapse>
    </Card>
    </Grid>
          ))}
          </Grid>
    </div>
  );
}
export default MusicDisplay;