import { BrowserRouter, Route, Routes } from 'react-router-dom'

import useAuth from './hooks/useAuth'
import Lobby from './components/Lobby'
import Landing from './components/Landing'
import Room from './components/Room'
import NotFound from './components/NotFound'
import Create from './components/Create'

const fetcher = async () => {}
/**
 * TODO: 
 * - work on the create form. 
 */

function App() {
  const auth = useAuth(fetcher)
  return (
    <div className="App">
      <BrowserRouter>
      {auth.authenticated
        ? <Routes>
            {/* authenticated routes */}
            <Route path="/" element={<Lobby />} />
            <Route path="/create" element={<Create />} />
            <Route path=":room" element={<Room />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        : <Routes>
            {/* unauthenticated routes */}
            <Route path="*" element={<Landing />} />
          </Routes>
      }
      </BrowserRouter>
    </div>
  )
}

export default App
