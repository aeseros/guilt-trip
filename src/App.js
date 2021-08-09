import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import Create from './pages/Create'
import { createTheme, ThemeProvider } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'
import Layout from './components/Layout'

// import Sidebar from './components/Sidebar';
// import Login from './components/Login'

const theme = createTheme({
  palette: {
    secondary: blue
  },
  typography: {
    fontFamily: 'Asap',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
})

function App() {  
  return (
    // <div className='App'>
    //   <Login />
    // </div>
    <ThemeProvider theme={theme}>
    {/* <Sidebar /> */}
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Notes />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
        </Switch>
      </Layout>
    </Router>
    </ThemeProvider>
  );
}

export default App;