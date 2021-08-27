import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { connect } from 'react-redux';
import { getIsLogged, getAdverts, getIsLoading, getError } from '../store/selectors';
import { useDispatch } from 'react-redux';
import { advertsGetAction } from '../store/actions';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import styles from '../styles/Home.module.css'
import Alert from '../components/Alert';
import WithAuth from '../components/hocs/WithAuth'
import AdvertCard from '../components/Card';
import Loading from '../components/Loading';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useRouter } from 'next/router'
import statusEnum from '../utils/advertsEnum'
import Slider from '@material-ui/core/Slider';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Provinces from '../utils/spainProvinces';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    filter: {
        color: '#fff',
        marginTop: 10
    }
}));


const Adverts = ({ isLogged, adverts, isLoading, error }) => {
    const router = useRouter()
    const queryParams = router.query
    const dispatch = useDispatch()

    console.log(adverts)

    const classes = useStyles();

    const maxPrice = 200;

    const [filters, setFilters] = useState({
        status: [],
        price: [0, maxPrice],
        tags: [],
        province: ''

    });

    const [hiddenMenu, setHiddenMenu] = useState(true);

    const handleChangeCheck = ev => {
        setFilters(oldFilters => {
            const newArray = oldFilters[ev.target.name];
            if (newArray.includes(ev.target.value)) {
                newArray.splice(newArray.indexOf(ev.target.value), 1);
            } else {
                newArray.push(ev.target.value);
            }
            const newFilters = {
                ...oldFilters,
                [ev.target.name]: newArray
            }
            return newFilters;
        });
    };


    const handleChangePrice = (event, newValue) => {
        setFilters(oldFilters => {
            const newFilters = {
                ...oldFilters,
                price: newValue
            }
            return newFilters
        });
    };

    const handleChange = ev => {
        setFilters(oldFilters => {

            const newFilters = {
                ...oldFilters,
                [ev.target.name]: ev.target.value,
            }
            return newFilters
        });

    }

    const toogleMenu = () => {
        setHiddenMenu(!hiddenMenu);
    }

    const filter = () => {
        var params = '?';
        if (queryParams.name) {
            params += `name=${queryParams.name}&`
        } if (filters.status) {
            filters.status.forEach(status => {
                params += `status=${status}&`
            })
        } if (filters.tags) {
            filters.tags.forEach(tag => {
                params += `tags=${tag}&`
            })
        }
        if (filters.province) {
            params += `province=${filters.province}&`
        }
        params += `minPrice=${filters.price[0]}&`
        params += `maxPrice=${filters.price[1]}&`

        router.push(`/adverts${params}`)
    }

    useEffect(() => {
        if (queryParams) {
            dispatch(advertsGetAction(queryParams))
        }
    }, [queryParams])


    return (
        <div className="adverts-container">
            <div className={hiddenMenu ? "filters-container hidden" : "filters-container"}>
                <div className="filters-button" onClick={() => { toogleMenu() }}>
                    <FilterListIcon />
                    Filters
                </div>
                <div className={hiddenMenu ? "filters hidden" : "filters"}>
                    <div>
                        <p>Status:</p>
                        <div>
                            <input type="checkbox" name="status" value="0" id="statusSale" checked={filters.status.includes("0")} onClick={handleChangeCheck} /> <label for="statusSale">On Sale</label>
                            <input type="checkbox" name="status" value="1" id="statusWanted" checked={filters.status.includes("1")} onClick={handleChangeCheck} /> <label for="statusWanted">Wanted</label>
                        </div>
                        <p>Price:</p>
                        <Slider
                            onChange={handleChangePrice}
                            value={filters.price}
                            valueLabelDisplay="auto"
                            max={maxPrice}
                        />
                        <p>Tags:</p>
                        <div>
                            <input type="checkbox" /> <label>Tecnología</label>
                            <input type="checkbox" /> <label>Móvil</label>
                        </div>
                        <p>Province:</p>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Province</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                value={filters.province}
                                name="province"
                                onChange={handleChange}
                            >
                                {Provinces.map(Province => <MenuItem value={Province.nombre}>{Province.nombre}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </div>
                    <Button variant="contained" color="primary" className={classes.filter} onClick={() => filter()}>Filter</Button>
                </div>
            </div>
            <div>
                {error && <Alert />}
            </div>


            <section className="adverts-section">
                {queryParams.name ? <h2> Resultados para: {queryParams.name}</h2> : ''}
                {isLoading ? <Loading align="center" /> :

                    adverts
                        ?
                        <Box pl={1} pr={1}>
                            <Grid container spacing={1} className="adverts">
                                {adverts.map(advert => {
                                    const { name, price, status, _id, photo, description, tags, userId } = advert;

                                    return (
                                        <Grid container item xs={12} sm={6} md={4} lg={3} key={_id}>

                                            <AdvertCard name={name} price={price} status={status} photo={photo} description={description} tags={tags} id={_id} userId={userId} />

                                        </Grid>

                                    )
                                })}
                            </Grid>
                        </Box>

                        :
                        <h2> No hay anuncios que mostrar</h2>}




            </section>

        </div >
    )
}
const mapStateToProps = state => ({
    isLogged: getIsLogged(state),
    adverts: getAdverts(state),
    isLoading: getIsLoading(state),
    error: getError(state),
})



export default connect(mapStateToProps)(Adverts)
