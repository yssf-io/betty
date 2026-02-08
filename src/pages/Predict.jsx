import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { predictions } from '../data/predictions'
import { useWallet } from '../context/WalletContext'

export default function Predict() {
    const navigate = useNavigate()
    const { balance, betAmount, placeBet, canBet } = useWallet()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [swipeClass, setSwipeClass] = useState('')
    const [userPredictions, setUserPredictions] = useState([])
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState(false)
    const [insufficientFunds, setInsufficientFunds] = useState(false)
    const startPos = useRef({ x: 0, y: 0 })

    const currentPrediction = predictions[currentIndex]
    const isFinished = currentIndex >= predictions.length

    const handleSwipe = (direction) => {
        if (isFinished) return

        // For yes/no, require payment
        if (direction !== 'skip') {
            if (!placeBet()) {
                setInsufficientFunds(true)
                setTimeout(() => setInsufficientFunds(false), 2000)
                setDragOffset({ x: 0, y: 0 })
                return
            }
        }

        const animClass = direction === 'right' ? 'card-swipe-right' : direction === 'left' ? 'card-swipe-left' : 'card-swipe-down'
        setSwipeClass(animClass)

        // Record the prediction
        if (direction !== 'skip') {
            setUserPredictions(prev => [...prev, {
                ...currentPrediction,
                userChoice: direction === 'right' ? 'yes' : 'no',
                betAmount: betAmount,
                timestamp: new Date().toISOString()
            }])
        }

        // Move to next card after animation
        setTimeout(() => {
            setSwipeClass('')
            setDragOffset({ x: 0, y: 0 })
            setCurrentIndex(prev => prev + 1)
        }, 300)
    }

    // Touch/Mouse drag handlers
    const handleDragStart = (e) => {
        setIsDragging(true)
        const clientX = e.touches ? e.touches[0].clientX : e.clientX
        const clientY = e.touches ? e.touches[0].clientY : e.clientY
        startPos.current = { x: clientX, y: clientY }
    }

    const handleDragMove = (e) => {
        if (!isDragging) return
        const clientX = e.touches ? e.touches[0].clientX : e.clientX
        const clientY = e.touches ? e.touches[0].clientY : e.clientY
        setDragOffset({
            x: clientX - startPos.current.x,
            y: clientY - startPos.current.y
        })
    }

    const handleDragEnd = () => {
        if (!isDragging) return
        setIsDragging(false)

        const threshold = 100
        if (dragOffset.x > threshold) {
            handleSwipe('right')
        } else if (dragOffset.x < -threshold) {
            handleSwipe('left')
        } else if (dragOffset.y > threshold) {
            handleSwipe('skip')
        } else {
            setDragOffset({ x: 0, y: 0 })
        }
    }

    // Calculate rotation and opacity based on drag
    const rotation = dragOffset.x * 0.1
    const opacity = Math.max(0.5, 1 - Math.abs(dragOffset.x) / 300)

    if (isFinished) {
        return (
            <div className="relative mx-auto flex min-h-screen w-full flex-col overflow-hidden bg-[#F8FAFC]">
                <header className="flex items-center p-4 pb-2 z-10 bg-[#F8FAFC]/90 backdrop-blur-md">
                    <h1 className="flex-1 text-center text-lg font-extrabold tracking-tight text-slate-900">All Done! 🎉</h1>
                </header>
                <main className="flex flex-1 flex-col items-center justify-center p-6">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-extrabold text-slate-900 mb-2">You made {userPredictions.length} predictions!</h2>
                        <p className="text-slate-500">Check your profile to track your accuracy.</p>
                    </div>
                    <div className="w-full max-w-sm space-y-3">
                        {userPredictions.map((pred, idx) => (
                            <div key={idx} className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                                <div className={`flex items-center justify-center rounded-xl shrink-0 size-10 ${pred.userChoice === 'yes' ? 'bg-green-50' : 'bg-red-50'}`}>
                                    <span className={`material-symbols-outlined ${pred.userChoice === 'yes' ? 'text-green-600' : 'text-red-600'}`}>
                                        {pred.userChoice === 'yes' ? 'check_circle' : 'cancel'}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-slate-900 text-sm truncate">{pred.question}</p>
                                    <span className={`text-xs font-bold ${pred.userChoice === 'yes' ? 'text-green-600' : 'text-red-600'}`}>
                                        {pred.userChoice.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Link
                        to="/profile"
                        className="mt-8 flex items-center justify-center h-14 px-8 rounded-full bg-primary text-slate-900 font-bold shadow-lg"
                    >
                        View Profile
                    </Link>
                </main>
            </div>
        )
    }

    return (
        <div className="relative mx-auto flex h-[100dvh] w-full flex-col overflow-hidden bg-[#F8FAFC]">
            {/* Insufficient funds alert */}
            {insufficientFunds && (
                <div className="absolute top-0 left-0 right-0 z-50 bg-red-500 text-white text-center py-3 px-4 font-bold animate-pulse">
                    Insufficient funds! <Link to="/wallet" className="underline">Add USDC</Link>
                </div>
            )}

            {/* Header */}
            <header className="flex items-center p-4 pb-2 z-10 bg-[#F8FAFC]/90 backdrop-blur-md">
                <div className="flex w-12 items-center justify-start">
                    <Link
                        to="/stats"
                        className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-white shadow-sm border border-slate-100 text-slate-700 active:scale-95"
                    >
                        <span className="material-symbols-outlined text-2xl">leaderboard</span>
                    </Link>
                </div>
                {/* Balance display */}
                <Link to="/wallet" className="flex-1 flex flex-col items-center">
                    <span className="text-xs text-slate-400 font-medium">Balance</span>
                    <span className="text-lg font-extrabold text-slate-900">${balance.toFixed(2)}</span>
                    <span className="text-[10px] text-primary font-bold">${betAmount.toFixed(2)}/swipe</span>
                </Link>
                <div className="flex w-12 items-center justify-end">
                    <Link
                        to="/profile"
                        className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-white shadow-sm border border-slate-100 text-slate-700 active:scale-95"
                    >
                        <span className="material-symbols-outlined text-2xl">person</span>
                    </Link>
                </div>
            </header>

            {/* Main card area */}
            <main className="relative flex flex-1 flex-col items-center justify-center px-6 pt-4 pb-6">
                {/* Background cards for stack effect */}
                {currentIndex + 1 < predictions.length && (
                    <div className="absolute inset-x-8 top-10 h-[calc(100%-6rem)] rounded-[2.5rem] bg-white border border-slate-100 shadow-sm scale-90 transform opacity-40"></div>
                )}
                {currentIndex + 2 < predictions.length && (
                    <div className="absolute inset-x-8 top-7 h-[calc(100%-6rem)] rounded-[2.5rem] bg-white border border-slate-100 shadow-md scale-95 transform opacity-70"></div>
                )}

                {/* Current card */}
                <div
                    className={`relative flex w-full flex-1 flex-col overflow-hidden rounded-[2.5rem] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-100 transition-transform cursor-grab active:cursor-grabbing ${swipeClass}`}
                    style={{
                        transform: isDragging ? `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) rotate(${rotation}deg)` : '',
                        opacity: isDragging ? opacity : 1,
                        transition: isDragging ? 'none' : 'transform 0.3s ease'
                    }}
                    onMouseDown={handleDragStart}
                    onMouseMove={handleDragMove}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={handleDragEnd}
                    onTouchStart={handleDragStart}
                    onTouchMove={handleDragMove}
                    onTouchEnd={handleDragEnd}
                >
                    {/* Image */}
                    <div
                        className="h-1/2 w-full bg-cover bg-center"
                        style={{ backgroundImage: `url("${currentPrediction.image}")` }}
                    ></div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col justify-between p-7">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-600">
                                    {currentPrediction.category}
                                </span>
                            </div>
                            <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-900">
                                {currentPrediction.question}
                            </h2>
                        </div>
                        <button
                            onClick={() => navigate(`/details/${currentPrediction.id}`)}
                            className="flex items-center gap-2 text-slate-400"
                        >
                            <span className="material-symbols-outlined text-xl">info</span>
                            <p className="text-sm font-medium">Tap for more details and stats</p>
                        </button>
                    </div>

                    {/* Swipe indicators */}
                    {isDragging && dragOffset.x > 50 && (
                        <div className="absolute top-8 right-8 px-4 py-2 bg-green-500 text-white font-bold rounded-xl rotate-12">
                            YES
                        </div>
                    )}
                    {isDragging && dragOffset.x < -50 && (
                        <div className="absolute top-8 left-8 px-4 py-2 bg-red-500 text-white font-bold rounded-xl -rotate-12">
                            NO
                        </div>
                    )}
                    {isDragging && dragOffset.y > 50 && (
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 px-4 py-2 bg-slate-400 text-white font-bold rounded-xl">
                            SKIP
                        </div>
                    )}
                </div>
            </main>

            {/* Footer with action buttons */}
            <footer className="px-6 pt-2 pb-10">
                <div className="flex items-center justify-center gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <button
                            onClick={() => handleSwipe('left')}
                            className="flex h-16 w-16 items-center justify-center rounded-full bg-white border border-slate-100 shadow-lg text-rose-500 transition-all active:scale-90 hover:bg-rose-50"
                        >
                            <span className="material-symbols-outlined text-4xl font-bold">close</span>
                        </button>
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">No</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <button
                            onClick={() => handleSwipe('skip')}
                            className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-slate-100 shadow-md text-slate-400 transition-all active:scale-90 hover:bg-slate-50"
                        >
                            <span className="material-symbols-outlined text-2xl">replay</span>
                        </button>
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Skip</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <button
                            onClick={() => handleSwipe('right')}
                            className="flex h-16 w-16 items-center justify-center rounded-full bg-white border border-slate-100 shadow-lg text-emerald-500 transition-all active:scale-90 hover:bg-emerald-50"
                        >
                            <span className="material-symbols-outlined text-4xl font-bold">check</span>
                        </button>
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Yes</span>
                    </div>
                </div>
            </footer>
        </div>
    )
}
