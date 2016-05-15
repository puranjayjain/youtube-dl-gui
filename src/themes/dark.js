// import the base theme
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {red500, red700} from 'material-ui/styles/colors'

export default function dark() {
  return getMuiTheme(darkBaseTheme, {
    palette: {
      primary1Color: red500,
      primary2Color: red700,
      accent1Color: red500,
      pickerHeaderColor: red500
    }
  })
}
