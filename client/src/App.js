import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Landing from './components/Pages/Landing/Landing';
import Layout from './components/layout/Layout/Layout';
import Home from './components/Pages/Home/Home';
import About from './components/Pages/About/About';
import Alert from './components/Pages/Alert/Alert';
import Report from './components/Pages/Report/Report';
import Results from './components/Pages/Results/Results';
import SearchArea from './components/Pages/SearchArea/SearchArea';
import SearchPattern from './components/Pages/SearchPattern/SearchPattern';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/alert" element={<Alert />} />
            <Route path="/report" element={<Report />} />
            <Route path="/results" element={<Results />} />
            <Route path="/search-area" element={<SearchArea />} />
            <Route path="/search-pattern" element={<SearchPattern />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
