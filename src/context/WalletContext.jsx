import { createContext, useContext, useState, useEffect } from 'react'

const WalletContext = createContext()

// Demo wallet address (would be generated per-user in production)
export const DEPOSIT_ADDRESS = '0x742d35Cc6634C0532925a3b844Bc9e7595f1b2c1'
export const SUPPORTED_NETWORKS = [
    { id: 'base', name: 'Base', icon: '🔵', recommended: true },
    { id: 'arbitrum', name: 'Arbitrum', icon: '🔷' },
    { id: 'polygon', name: 'Polygon', icon: '🟣' },
]

export function WalletProvider({ children }) {
    const [balance, setBalance] = useState(() => {
        const saved = localStorage.getItem('predictly_balance')
        return saved ? parseFloat(saved) : 0
    })

    const [betAmount, setBetAmount] = useState(() => {
        const saved = localStorage.getItem('predictly_bet_amount')
        return saved ? parseFloat(saved) : 0.10
    })

    const [selectedNetwork, setSelectedNetwork] = useState('base')

    // Persist balance to localStorage
    useEffect(() => {
        localStorage.setItem('predictly_balance', balance.toString())
    }, [balance])

    useEffect(() => {
        localStorage.setItem('predictly_bet_amount', betAmount.toString())
    }, [betAmount])

    const deposit = (amount) => {
        setBalance(prev => prev + amount)
    }

    const placeBet = () => {
        if (balance >= betAmount) {
            setBalance(prev => prev - betAmount)
            return true
        }
        return false
    }

    const canBet = balance >= betAmount

    return (
        <WalletContext.Provider value={{
            balance,
            betAmount,
            setBetAmount,
            selectedNetwork,
            setSelectedNetwork,
            deposit,
            placeBet,
            canBet,
            depositAddress: DEPOSIT_ADDRESS,
        }}>
            {children}
        </WalletContext.Provider>
    )
}

export function useWallet() {
    const context = useContext(WalletContext)
    if (!context) {
        throw new Error('useWallet must be used within a WalletProvider')
    }
    return context
}
