import React,{useState}from 'react'
import Navbar from './components/Navbar/Navbar'
import Admin from './pages/admin/Admin'

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev); // Toggle theme
  };
  return (
    <div className={`app ${isDarkTheme ? 'dark' : 'light'}`}>
      <Navbar isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />

      <Admin/>
    </div>
  )
}

export default App
