import { Routes, Route } from 'react-router-dom'
import { GameProvider } from './context/GameContext'
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Settings from './pages/Settings'
import Predict from './pages/Predict'
import Details from './pages/Details'
import Profile from './pages/Profile'
import Stats from './pages/Stats'

function App() {
    return (
        <GameProvider>
            <div className="max-w-md mx-auto min-h-screen bg-white">
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/predict" element={<Predict />} />
                    <Route path="/details/:id" element={<Details />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/stats" element={<Stats />} />
                </Routes>
            </div>
        </GameProvider>
    )
}

export default App
