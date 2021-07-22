
import React, { useEffect, useMemo } from 'react'
import Link from 'next/link';
import statusEnum from '../utils/advertsEnum';
import { connect } from 'react-redux';
import { getIsLogged, getAdverts, getIsLoading, getError } from '../store/selectors';
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
import Alert from '../components/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { FormControl, Select, MenuItem, InputLabel, FormLabel, FormGroup, FormControlLabel, Checkbox, Slider  } from '@material-ui/core';
import provinces from '../utils/spainProvinces';

const useStyles = makeStyles((theme) => ({
    item: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },

}));


const Adverts = ({ isLogged, adverts, isLoading, error }) => {
    const classes = useStyles();

    const [searchValue, setSearchValue] = React.useState("");
    const adsFilteredBySearch = useMemo(() =>{
        if (!searchValue){
            return adverts.result
        }
        return adverts.result.filter(ad => {
            return ad.name.toLowerCase().includes(searchValue.toLowerCase())
        })
    }, [searchValue, adverts.result])

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(advertsGetAction())
    }, [])

    const tags =["mobile", "software", "tech"];

    const [filters, setFilters] = React.useState({
        //search: adsFilteredBySearch(),
        priceRange: [0,10000],
        tags:[],
        province:"",
        statusEnum: "",
    })

    // Crearme un estado local para los filtros (un objeto) inputSearch, arrayTags, province, priceMin (0), priceMax(100.000.000 || dinamico llamando al back)
    // Conseguir los tags (ahora hardcodeado) array con los tags. Por cada elemento de este array renderizo un checkbox que se pueda marcar y desmarcar. Cada checkbox tiene un value correspondiente a cada tag. 
    // Al hacer clic en el checkbox, tiene que añadir ese valor en el array de tags del opbjeto de filtros
    // Select mostrando todas las provincias disponibles y al marcar una provincia se añade al objeto de filtros
    // 

    const handleFilterChange= (event) => {
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
    
    return (
        <div className="adverts-container">
            <h1>Página de Anuncios</h1>
            {adverts.result && 

           
            
            <div style={{ width: 300 }}>

                <div className={classes.root}>
                    <Typography id="range-slider" gutterBottom>
                        Rango de precios
                    </Typography>
                    <Slider
                        value={filters.priceRange}
                        onChange={handleChangePrice}
                        min={0}
                        max={10000}
                        step={50}
                        valueLabelDisplay="on"
                        aria-labelledby="range-slider"
                        getAriaValueText={valuetext}
                        name="priceRange"
                    />
                    </div>

            <FormControl style={{ margin: 8 }}  className={classes.margin}>
                <Select style={{ margin: 8 }} required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filters.statusEnum}
                    onChange={handleFilterChange}
                    name= "statusEnum"
                    >
                        <MenuItem value={0}>Vendo</MenuItem>
                        <MenuItem value={1}>Compro</MenuItem>
                        
                    </Select>
                </FormControl>
                <InputLabel id="demo-simple-select-label">¿Venta o compra?</InputLabel>

                <FormControl style={{ margin: 8 }}  className={classes.margin}>
                    <Select style={{ margin: 8 }} required
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filters.province}
                        onChange={handleFilterChange}
                        name= "province"
                        >
                            {provinces.map(province => <MenuItem value={province.nombre}>{province.nombre}</MenuItem> )}
                        
                        
                    </Select>
                </FormControl>
                <InputLabel id="demo-simple-select-label">Provincia</InputLabel>

                <FormControl  component="fieldset" className={classes.formControl}>
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
                            control={<Checkbox checked={filters.tags.includes("mobile")}  onChange={handleChangeCheck} name="mobile" />}
                            label="mobile"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={filters.tags.includes("tech")} onChange={handleChangeCheck} name="tech" />}
                            label="tech"
                        />
                    </FormGroup>
                   
                </FormControl >
                
                <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    options={adverts.result.map((option) => option.name)}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search input"
                        margin="normal"
                        variant="outlined"
                        InputProps={{ ...params.InputProps, type: 'search' }}
                        onChange ={e => setSearchValue(e.target.value)}
                        value= {searchValue}
                    />
                    )}
                />
            </div>

            }
            <div>
            {error && <Alert/> }
            </div>
            

            <section className="adverts-section">
                {isLoading ? <Loading align="center" /> :
                    adverts.result
                        ?
                        <Box pl={1} pr={1}>
                            <Grid container spacing={2}>
                                {adsFilteredBySearch.map(advert => {
                                    const { name, price, onSale } = advert;
                                    return (
                                        <Grid item xs={6} sm={4} md={3} key={advert.id}>
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
                                                                return <Chip variant="outlined" size="small" label={tag} key={tag} />
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
    error:getError(state),
})



export default connect(mapStateToProps)(Adverts)
