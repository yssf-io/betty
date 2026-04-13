import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGame, BET_AMOUNTS } from '../context/GameContext'

export default function Settings() {
    const navigate = useNavigate()
    const { points, betAmount, setBetAmount, canBet, resetProgress } = useGame()
    const [confirmReset, setConfirmReset] = useState(false)

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-[#F8FAFC] overflow-x-hidden">
            {/* Header */}
            <div className="flex items-center bg-white/80 backdrop-blur-md p-4 pb-2 justify-between sticky top-0 z-10 border-b border-zinc-100">
                <Link to="/" className="flex size-10 shrink-0 items-center justify-center text-zinc-900">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <h2 className="text-zinc-900 text-lg font-bold leading-tight tracking-tight flex-1 text-center">Settings</h2>
                <div className="w-10"></div>
            </div>

            <main className="flex-1 p-4 space-y-4">
                {/* Points Balance Card */}
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-3xl p-6 text-white shadow-xl">
                    <p className="text-zinc-400 text-sm font-medium mb-1">Your Points</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-extrabold tracking-tight">{points.toLocaleString()}</span>
                        <span className="text-zinc-400 text-lg">pts</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-zinc-700/50 flex items-center justify-between">
                        <div>
                            <p className="text-zinc-400 text-xs font-medium">Stake per swipe</p>
                            <p className="text-white text-lg font-bold">{betAmount} pts</p>
                        </div>
                        <div className="text-right">
                            <p className="text-zinc-400 text-xs font-medium">Swipes left</p>
                            <p className="text-white text-lg font-bold">{Math.floor(points / betAmount)}</p>
                        </div>
                    </div>
                </div>

                {/* Bet Amount Selector */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-100">
                    <h3 className="text-zinc-900 text-lg font-bold mb-1">Stake per Swipe</h3>
                    <p className="text-zinc-500 text-sm mb-4">How many points you put on each YES/NO call.</p>
                    <div className="grid grid-cols-5 gap-2">
                        {BET_AMOUNTS.map((amount) => (
                            <button
                                key={amount}
                                onClick={() => setBetAmount(amount)}
                                className={`py-3 rounded-xl text-sm font-bold transition-all ${betAmount === amount
                                    ? 'bg-primary text-zinc-900 shadow-lg shadow-primary/30'
                                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                                    }`}
                            >
                                {amount}
                            </button>
                        ))}
                    </div>
                </div>

                {/* How Payouts Work */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-100">
                    <h3 className="text-zinc-900 text-lg font-bold mb-2">How payouts work</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">
                        Your stake is deducted when you swipe. When a market resolves, correct picks pay out
                        based on community odds — the less likely your pick was, the bigger the win.
                    </p>
                </div>

                {/* Reset */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-100">
                    <h3 className="text-zinc-900 text-lg font-bold mb-1">Reset progress</h3>
                    <p className="text-zinc-500 text-sm mb-4">Wipes your history and resets points to 1,000.</p>
                    {confirmReset ? (
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    resetProgress()
                                    setConfirmReset(false)
                                }}
                                className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold active:scale-95"
                            >
                                Yes, reset
                            </button>
                            <button
                                onClick={() => setConfirmReset(false)}
                                className="flex-1 py-3 bg-zinc-100 text-zinc-700 rounded-xl font-bold"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setConfirmReset(true)}
                            className="w-full py-3 bg-zinc-100 text-zinc-700 rounded-xl font-bold hover:bg-zinc-200"
                        >
                            Reset
                        </button>
                    )}
                </div>
            </main>

            {/* Footer CTA */}
            <div className="sticky bottom-0 bg-white/80 backdrop-blur-md p-4 border-t border-zinc-100">
                <button
                    onClick={() => navigate('/predict')}
                    disabled={!canBet}
                    className={`flex items-center justify-center w-full h-14 rounded-2xl text-lg font-bold transition-all ${canBet
                        ? 'bg-primary text-zinc-900 shadow-lg shadow-primary/30 active:scale-[0.98]'
                        : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                        }`}
                >
                    <span className="material-symbols-outlined mr-2">trending_up</span>
                    {canBet ? 'Start Predicting' : 'Out of points — reset to play'}
                </button>
            </div>
        </div>
    )
}
