import { Routes, Route } from 'react-router-dom'
import { WalletProvider } from './context/WalletContext'
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Wallet from './pages/Wallet'
import Predict from './pages/Predict'
import Details from './pages/Details'
import Profile from './pages/Profile'
import Stats from './pages/Stats'

function App() {
    return (
        <WalletProvider>
            <div className="max-w-md mx-auto min-h-screen bg-white">
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/wallet" element={<Wallet />} />
                    <Route path="/predict" element={<Predict />} />
                    <Route path="/details/:id" element={<Details />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/stats" element={<Stats />} />
                </Routes>
            </div>
        </WalletProvider>
    )
}

export default App

