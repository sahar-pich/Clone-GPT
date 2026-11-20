import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Chat from './components/chat/Chat'
import About from './components/about/About'



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}


export default App