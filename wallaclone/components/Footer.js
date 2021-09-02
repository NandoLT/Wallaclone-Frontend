import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    footer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderTop: '1px solid'
    }
}))

const Footer = () => {

    const classes = useStyles()

    return (
        <div className={classes.footer}>
            <p>KeepCoding ®  2021 JS Bandits</p>
        </div>
    )
}


export default Footer;