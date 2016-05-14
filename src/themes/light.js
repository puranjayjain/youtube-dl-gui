// import the base theme
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  red500, red700,
} from 'material-ui/styles/colors';

export default function light() {
  return getMuiTheme({
    palette: {
      primary1Color: red500,
      primary2Color: red700,
      accent1Color: red500,
      pickerHeaderColor: red500,
    },
  });
};
