import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#0fbfe6',
        },
        secondary: {
            main: '#0e6c81',
        },
        favorite: red[500]
    },
});

export default theme;
