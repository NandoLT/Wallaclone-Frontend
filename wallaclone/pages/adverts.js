import React, { useEffect, useMemo } from 'react'
import Link from 'next/link';
import statusEnum from '../utils/advertsEnum';
import { connect } from 'react-redux';
import { getIsLogged, getAdverts, getIsLoading, getError, getFavoritesAdverts } from '../store/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { advertsGetAction, advertGetFavoritesAction, advertAddFavoritesAction, advertDeleteFavoritesAction } from '../store/actions';
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
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Loading from '../components/Loading';
import styles from '../styles/Home.module.css'
import Alert from '../components/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { FormControl, Select, MenuItem, InputLabel, FormLabel, FormGroup, FormControlLabel, Checkbox, Slider } from '@material-ui/core';
import provinces from '../utils/spainProvinces';
import WithAuth from '../components/hocs/WithAuth'

const useStyles = makeStyles((theme) => ({
    item: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },

}));


const Adverts = ({ isLogged, adverts, isLoading, error, favoriteAdverts }) => {
    const classes = useStyles();

    const [searchValue, setSearchValue] = React.useState("");
    const adsFilteredBySearch = useMemo(() => {
        if (!searchValue) {
            return adverts
        }
        return adverts.filter(ad => {
            return ad.name.toLowerCase().includes(searchValue.toLowerCase())
        })
    }, [searchValue, adverts])

    const dispatch = useDispatch()

    useEffect(async () => {
        // if (isLogged) {
        //     await dispatch(advertGetFavoritesAction())
        // }
        
        await dispatch(advertsGetAction())
    }, [])

    const tags = ["mobile", "software", "tech"];

    const [filters, setFilters] = React.useState({
        //search: adsFilteredBySearch(),
        priceRange: [0, 1000],
        tags: [],
        province: "",
        statusEnum: "",
    })

    const [filteredAdverts, setFilteredAdverts] = React.useState([]);

    // React.useEffect(() => {

    //     setFilteredAdverts(adverts.filter(advert => advert.province.toLowerCase().includes(filters.province.toLowerCase()) && advert.statusEnum.includes(filters.statusEnum) && advert.priceRange[0] >= filters.priceRange[0] && advert.price <= filters.priceRange[1]  && (filters.tags.length > 0 ? advert.tags.some(function (e) {
    //         return filters.tags.includes(e);
    //     }) : true)))

    // }, [filters]);

    const handleFilterChange = (event) => {
        setFilters(oldFilters => {
            const newFilters = {
                ...oldFilters,
                [event.target.name]: event.target.value,
            }
            return newFilters
        })
    }

    const handleChangePrice = (event, newValue) => {

        setFilters(oldFilters => {
            const newFilters = {
                ...oldFilters,
                ["priceRange"]: newValue,
            }
            return newFilters
        })


    };

    const handleChangeCheck = ev => {
        const clickedTag = ev.target.name
        setFilters(oldAdDetails => {
            const newTags = oldAdDetails.tags;

            if (newTags.includes(clickedTag)) {
                newTags.splice(newTags.indexOf(clickedTag), 1);
            } else {
                newTags.push(clickedTag);
            }

            const newAdDetails = {
                ...oldAdDetails,
                'tags': newTags
            }
            return newAdDetails;
        }
        );
    };

    function valuetext(value) {
        return `${value}€`;
    }

    const handleFavoriteCheck = ev => {
        if (!favoriteAdverts.includes(ev.target.id)) {
            dispatch(advertAddFavoritesAction(ev.target.id));
        } else {
            dispatch(advertDeleteFavoritesAction(ev.target.id));
        }
    }

    return (
        <div className="adverts-container">
            <h1>Página de Anuncios</h1>
            {adsFilteredBySearch &&



                <div style={{ width: 300 }}>

                    {/* <div className={classes.root}>
                        <Typography id="range-slider" gutterBottom>
                            Rango de precios
                        </Typography>
                        <Slider
                            value={filters.priceRange}
                            onChange={handleChangePrice}
                            min={0}
                            max={1000}
                            step={50}
                            valueLabelDisplay="on"
                            aria-labelledby="range-slider"
                            getAriaValueText={valuetext}
                            name="priceRange"
                        />
                    </div>

                    <FormControl style={{ margin: 8 }} className={classes.margin}>
                        <Select style={{ margin: 8 }} required
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filters.statusEnum}
                            onChange={handleFilterChange}
                            name="statusEnum"
                        >
                            <MenuItem value={0}>Vendo</MenuItem>
                            <MenuItem value={1}>Compro</MenuItem>

                        </Select>
                    </FormControl>
                    <InputLabel id="demo-simple-select-label">¿Venta o compra?</InputLabel>

                    <FormControl style={{ margin: 8 }} className={classes.margin}>
                        <Select style={{ margin: 8 }} required
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filters.province}
                            onChange={handleFilterChange}
                            name="province"
                        >
                            {provinces.map(province => <MenuItem value={province.nombre}>{province.nombre}</MenuItem>)}


                        </Select>
                    </FormControl>
                    <InputLabel id="demo-simple-select-label">Provincia</InputLabel>

                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel style={{ margin: 8 }} component="legend">Tags</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox
                                    checked={filters.tags.includes("software")}
                                    onChange={handleChangeCheck}
                                    name="software" />}
                                label="software"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={filters.tags.includes("mobile")} onChange={handleChangeCheck} name="mobile" />}
                                label="mobile"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={filters.tags.includes("tech")} onChange={handleChangeCheck} name="tech" />}
                                label="tech"
                            />
                        </FormGroup>

                    </FormControl > */}

                    <Autocomplete
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        options={adverts.map((option) => option.name)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search input"
                                margin="normal"
                                variant="outlined"
                                InputProps={{ ...params.InputProps, type: 'search' }}
                                onChange={e => setSearchValue(e.target.value)}
                                value={searchValue}
                            />
                        )}
                    />
                </div>

            }
            
           


            <section className="adverts-section">
                {isLoading ? <Loading align="center" /> :
                    adverts
                        ?
                        <Box pl={1} pr={1}>
                            <Grid container spacing={2}>
                                {adsFilteredBySearch.slice(0).reverse().map(advert => {
                                    const { name, price, onSale, _id, photo, description } = advert;
                                    console.log(price)
                                    
                                    return (
                                        <Grid item xs={6} sm={4} md={3} key={_id}>
                                            <Card className={classes.root}>
                                                <Link href={`/adverts/${_id}`} passHref>
                                                    <CardActionArea>
                                                        <CardMedia
                                                            component="img"
                                                            alt="Contemplative Reptile"
                                                            height="200"
                                                            image= {photo ?  `https://pruebas-wallaclone.s3.eu-west-3.amazonaws.com/${advert.userId}/${advert.photo[0]}` : '/img/image-not-available.png'}
                                                            title="no image available"
                                                        />
                                                        <CardContent>
                                                            <Typography gutterBottom variant="h5" component="h2">
                                                                {name}
                                                            </Typography>
                                                            <div className="tags">
                                                                {advert.tags.map(tag => {
                                                                    return <Chip variant="outlined" size="small" label={tag} key={tag} />
                                                                })}
                                                            </div>
                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                               {description}
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
                                                </Link>
                                                <CardActions>
                                                    <Button size="small" color="primary">
                                                        Share
                                                    </Button>
                                                    <Button size="small" color="primary">
                                                        Learn More
                                                    </Button>
                                                    { 
                                                        isLogged &&
                                                        <Button size="small" onClick={handleFavoriteCheck}>
                                                            { favoriteAdverts && favoriteAdverts.includes(_id) ? <StarIcon id={_id}/> : <StarBorderIcon id={_id}/>}
                                                        </Button>
                                                    }
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
            {
                error &&  <div> {error && <Alert />} </div>

            }
            <Link className={styles.card} href='/' passHref>
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
    isLoading: getIsLoading(state),
    error: getError(state),
    favoriteAdverts: getFavoritesAdverts(state)
})



export default connect(mapStateToProps)(Adverts)
