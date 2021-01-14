import { Route, Link, NavLink } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Pics from './components/pics/pics';
import Socials from './components/socials/socials'
import Intro from './components/intro/intro';
import About from './components/about/about';
import AdminPics from './pages/AdminPics/AdminPics';



function App() {
  return (
    <>
      <NavLink exact to='/editpics'>Edit Pics</NavLink>
      <a href="/main/admin-add-pics">Admin Add Pics</a>
      <Route exact path='/main'
        render={() =>
          <div id="appDiv">
            <h3>Hi</h3>
            <Intro />
            <Pics />
            <Socials />
            <About />
          </div>
         } />
      <Route exact path='/editpics'
        render={() => 
          <AdminPics />
        } 
      />
    </>
  );
}

export default App;
