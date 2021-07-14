
import React, { useEffect } from 'react'
import Link from 'next/link';
import statusEnum from '../utils/advertsEnum';
import { connect } from 'react-redux';
import { getIsLogged, getAdverts, getIsLoading } from '../store/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { advertsGetAction } from '../store/actions';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Loading from '../components/Loading';
import styles from '../styles/Home.module.css'


const useStyles = makeStyles((theme) => ({
    item: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },

}));


const Adverts = ({ isLogged, adverts, isLoading }) => {
    const classes = useStyles();

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(advertsGetAction())
    }, [])



    return (
        <div className="adverts-container">
            <h1>Página de Anuncios</h1>

            <section className="adverts-section">
                {isLoading ? <Loading align="center" /> :
                    adverts.result
                        ?
                        <Box pl={1} pr={1}>
                            <Grid container spacing={2}>
                                {adverts.result.map(advert => {
                                    const { name, price, onSale } = advert;
                                    return (
                                        <Grid item xs={6} sm={4} md={3} >
                                            <Card className={classes.root}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        alt="Contemplative Reptile"
                                                        height="200"
                                                        image="/img/image-not-available.png"
                                                        title="no image available"
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="h2">
                                                            {name}
                                                        </Typography>
                                                        <div className="tags">
                                                            {advert.tags.map(tag => {
                                                                return <Chip variant="outlined" size="small" label={tag} />
                                                            })}
                                                        </div>

                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vulputate eget mauris vel sodales.
                                                            Integer magna sapien, varius id quam in, dignissim iaculis leo. Sed efficitur mauris rutrum magna vehicula.
                                                        </Typography>
                                                        <Box mt={2} mb={2}>
                                                            <Divider />
                                                        </Box>
                                                        <Typography variant="body3" color="textSecondary" component="p" align="right">
                                                            {statusEnum[advert.status]}
                                                        </Typography>
                                                        <Typography variant="body3" color="Secondary" component="p" align="right">
                                                            {price}€
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                                <CardActions>
                                                    <Button size="small" color="primary">
                                                        Share
                                                    </Button>
                                                    <Button size="small" color="primary">
                                                        Learn More
                                                    </Button>
                                                </CardActions>
                                            </Card>

                                        </Grid>



                                    )
                                })}
                            </Grid>
                        </Box>




                        :
                        <h2> No hay anuncios que mostrar</h2>
                }



            </section>
            <Link className={styles.card} href='/'>
                <div className={styles.card} >
                    <h3>  Go Back Home &rarr; </h3>
                </div>
            </Link>

        </div>
    )
}
const mapStateToProps = state => ({
    isLogged: getIsLogged(state),
    adverts: getAdverts(state),
    isLoading: getIsLoading(state)
})



export default connect(mapStateToProps)(Adverts)
