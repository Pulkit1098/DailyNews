import React, {useState} from 'react'
import './App.css'
import Navbar from './components/Navbar'
import News from './components/News'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'


const App = ()=> {

  const [progress, setProgress] = useState(0)

  const pageSize = 9;
  const apiKey = import.meta.env.VITE_API_KEY;

    return (
      <>
      <Router>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        progress={progress}
      />
        
      <Routes>
        <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="us" category='general'/>} />
        <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="us" category='general'/>} />
        <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="us" category='science'/>} />
        <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="us" category='entertainment'/>} />
        <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="us" category='sports'/>} />
        <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="us" category='business'/>} />
        <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="us" category='health'/>} />
      </Routes>
      </Router>
      </>
    )
  }
export default App;