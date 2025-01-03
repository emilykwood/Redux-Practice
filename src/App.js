import Header from './components/HeaderComponent';
import Body from './components/BodyComponent';
import Checkout from './components/CheckoutComponent';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { createTheme } from '@mui/material/styles';
import store from './Store';

const theme = createTheme();

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Header isProductPage={window.location.pathname === '/'} />
          <Routes>
            <Route path="/" element={<Body />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
