// import the base theme
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {
  red500,
  red700,
  red900,
  deepPurpleA200,
  deepPurpleA400,
  deepPurpleA100
} from 'material-ui/styles/colors'

export default function dark() {
  return getMuiTheme(darkBaseTheme, {
    palette: {
      primary1Color: red500,
      primary2Color: red700,
      primary9Color: red900,
      accent1Color: deepPurpleA200,
      accent2Color: deepPurpleA400,
      accent3Color: deepPurpleA100,
      background1Color: '#272727',
      pickerHeaderColor: red500
    }
  })
}
