import logo from './logo.svg';
import './App.css';
import Pics from './components/pics/pics';
import Socials from './components/socials/socials'
import Intro from './components/intro/intro';
import About from './components/about/about';

function App() {
  return (
    <div id="appDiv">
      <h3>Hi</h3>
      <Intro />
      <Pics />
      <Socials />
      <About />
    </div>
  );
}

export default App;
