import { createContext, useContext, useEffect, useState } from 'react'
import { predictions } from '../data/predictions'

const GameContext = createContext()

const STARTING_POINTS = 1000
const DEFAULT_BET = 10
const STORAGE_KEY = 'betty_state_v1'

export const BET_AMOUNTS = [5, 10, 25, 50, 100]

function loadState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) return JSON.parse(raw)
    } catch {
        // fall through
    }
    return {
        points: STARTING_POINTS,
        betAmount: DEFAULT_BET,
        history: [],
        joinedAt: new Date().toISOString(),
    }
}

// Returns payout multiplier (total return per unit staked) for a correct pick
// at the given community YES probability. Caps extremes to avoid div-by-zero
// and absurd swings on 0%/100% markets.
function oddsMultiplier(yesPercent, choice) {
    const clamp = Math.min(99, Math.max(1, yesPercent))
    const p = (choice === 'yes' ? clamp : 100 - clamp) / 100
    return 1 / p
}

function settlePass(state) {
    let delta = 0
    let changed = false
    const next = state.history.map((entry) => {
        if (entry.settled) return entry
        const pred = predictions.find((p) => p.id === entry.predictionId)
        if (!pred || pred.outcome == null) return entry
        changed = true
        const won = entry.choice === pred.outcome
        if (won) {
            const mult = oddsMultiplier(pred.yesPercent, entry.choice)
            delta += Math.round(entry.stake * mult)
        }
        return { ...entry, settled: true, resolvedOutcome: pred.outcome, wonPoints: won ? Math.round(entry.stake * oddsMultiplier(pred.yesPercent, entry.choice)) : 0 }
    })
    if (!changed) return state
    return { ...state, points: state.points + delta, history: next }
}

export function GameProvider({ children }) {
    const [state, setState] = useState(loadState)

    useEffect(() => {
        setState((prev) => settlePass(prev))
    }, [])

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    }, [state])

    const placeBet = (prediction, choice) => {
        if (state.points < state.betAmount) return false
        setState((prev) => ({
            ...prev,
            points: prev.points - prev.betAmount,
            history: [
                ...prev.history,
                {
                    id: (crypto.randomUUID && crypto.randomUUID()) || String(Date.now() + Math.random()),
                    predictionId: prediction.id,
                    choice,
                    stake: prev.betAmount,
                    yesPercentAtBet: prediction.yesPercent,
                    timestamp: new Date().toISOString(),
                    settled: false,
                },
            ],
        }))
        return true
    }

    const setBetAmount = (amount) => setState((prev) => ({ ...prev, betAmount: amount }))

    const resetProgress = () => {
        setState({
            points: STARTING_POINTS,
            betAmount: DEFAULT_BET,
            history: [],
            joinedAt: new Date().toISOString(),
        })
    }

    const canBet = state.points >= state.betAmount

    return (
        <GameContext.Provider
            value={{
                points: state.points,
                betAmount: state.betAmount,
                history: state.history,
                joinedAt: state.joinedAt,
                setBetAmount,
                placeBet,
                canBet,
                resetProgress,
            }}
        >
            {children}
        </GameContext.Provider>
    )
}

export function useGame() {
    const ctx = useContext(GameContext)
    if (!ctx) throw new Error('useGame must be used within a GameProvider')
    return ctx
}
