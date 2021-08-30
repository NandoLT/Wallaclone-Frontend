import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Chip, Link } from '@material-ui/core';
import statusEnum from '../utils/advertsEnum';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { getFavoritesAdverts } from '../store/selectors';
import { advertAddFavoritesAction, advertDeleteFavoritesAction } from '../store/actions'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: 'fit-content',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
    },
    media: {
        height: 200,
    },
    tagContainer: {
        display: 'flex'
    },
    tag: {
        marginBottom: 5
    },
    cardContent: {
        position: "relative",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    status: {
        position: "absolute",
        top: 10,
        right: 5,
        fontSize: 12
    },
    favorite: {
        cursor: 'pointer',
        color: theme.palette.favorite,
        alignSelf: 'flex-end',
        margin: 10
    },
    link: {
        textDecoration: 'none',
        color: 'black',
        '&:hover': {
            textDecoration: 'none'
        },
    },
    description: {
        height: 30,
        marginTop: 30
    }
}));

export default function AdvertCard({ advert }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const favorites = useSelector(getFavoritesAdverts)

    const handleFavoriteCheck = ev => {
        if (!favorites.includes(advert._id)) {
            dispatch(advertAddFavoritesAction(advert._id));
        } else {
            dispatch(advertDeleteFavoritesAction(advert._id));
        }
    }

    const { price, name, photo, status, description, tags, _id, userId } = advert;
    const urlName = name.replace(/\s+/g, '-').toLowerCase();

    return (
        <Card className={classes.root}>

            <Link href={`/adverts/${name}/${_id}`} passHref className={classes.link}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={photo ? `${process.env.REACT_APP_BASE_URL_IMAGES_DIRECTORY}${userId}/${photo}` : '/img/image-not-available.png'}
                        title="Product image"
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {`${price}€`}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="h3">
                            {name}
                        </Typography>
                        <Typography color="textSecondary" className={classes.status}>
                            {statusEnum[status]}
                        </Typography>
                        <div className={classes.tagContainer}>
                            {tags.map(tag => {
                                return <Chip variant="outlined" color="primary" size="small" label={tag} key={tag} className={classes.tag} />
                            })}
                        </div>
                        <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
                            {description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
            {favorites.includes(_id) ? <FavoriteIcon className={classes.favorite} onClick={handleFavoriteCheck} /> : <FavoriteBorderIcon className={classes.favorite} onClick={handleFavoriteCheck} />}
        </Card >
    );
}