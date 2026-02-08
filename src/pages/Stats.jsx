import { useState } from 'react'
import { Link } from 'react-router-dom'

// Mock data
const statsData = {
    accuracy: 78,
    total: 150,
    correct: 117,
    incorrect: 33,
    rank: '#1,432'
}

const historyData = [
    { id: 1, question: 'Will BTC reach $70k by EOM?', outcome: 'Yes', result: 'correct', date: 'May 15' },
    { id: 2, question: 'Will ETH outperform SOL in June?', outcome: 'No', result: 'wrong', date: 'May 12' },
    { id: 3, question: 'New iPads at Apple event?', outcome: 'Yes', result: 'correct', date: 'May 10' },
    { id: 4, question: 'Album to hit #1?', outcome: 'Yes', result: 'correct', date: 'Apr 28' },
    { id: 5, question: 'Rain in London tomorrow?', outcome: 'No', result: 'wrong', date: 'Apr 25' },
]

const leaderboardData = [
    { rank: 1, name: 'CryptoWhale', accuracy: 94, total: 342 },
    { rank: 2, name: 'PredictMaster', accuracy: 91, total: 287 },
    { rank: 3, name: 'FutureSeeker', accuracy: 89, total: 456 },
    { rank: 4, name: 'OracleX', accuracy: 87, total: 198 },
    { rank: 5, name: 'BetWise', accuracy: 85, total: 521 },
]

export default function Stats() {
    const [view, setView] = useState('history')

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#f8faf9] overflow-x-hidden">
            {/* Header */}
            <div className="flex items-center bg-[#f8faf9]/80 backdrop-blur-md p-4 pb-2 justify-between sticky top-0 z-20">
                <Link to="/predict" className="text-stone-900 flex size-10 shrink-0 items-center justify-center cursor-pointer">
                    <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
                </Link>
                <h2 className="text-stone-900 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center -ml-10">
                    History & Ranking
                </h2>
            </div>

            <main className="flex-1 flex flex-col px-4 gap-4 pb-8">
                {/* Accuracy Circle */}
                <div className="flex flex-col items-stretch justify-start rounded-2xl shadow-sm border border-stone-100 bg-white p-6 mt-2">
                    <p className="text-stone-900 text-lg font-bold leading-tight tracking-[-0.015em]">Accuracy Rate</p>
                    <p className="text-stone-500 text-sm font-normal leading-normal mb-6">Based on all your predictions</p>
                    <div className="flex items-center justify-center mb-2">
                        <div className="relative size-44">
                            <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                                <circle className="stroke-stone-100" cx="18" cy="18" fill="none" r="16" strokeWidth="3"></circle>
                                <circle
                                    className="stroke-primary"
                                    cx="18"
                                    cy="18"
                                    fill="none"
                                    r="16"
                                    strokeDasharray={`${statsData.accuracy} 100`}
                                    strokeLinecap="round"
                                    strokeWidth="3"
                                ></circle>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-stone-900 text-5xl font-extrabold tracking-tighter">{statsData.accuracy}%</span>
                                <span className="text-stone-400 text-[10px] font-bold uppercase tracking-wider">Overall</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1 rounded-2xl p-4 bg-white border border-stone-100 shadow-sm">
                        <p className="text-stone-500 text-xs font-semibold uppercase tracking-wider leading-normal">Total</p>
                        <p className="text-stone-900 tracking-tight text-2xl font-extrabold leading-tight">{statsData.total}</p>
                    </div>
                    <div className="flex flex-col gap-1 rounded-2xl p-4 bg-white border border-stone-100 shadow-sm">
                        <p className="text-stone-500 text-xs font-semibold uppercase tracking-wider leading-normal">Correct</p>
                        <p className="text-stone-900 tracking-tight text-2xl font-extrabold leading-tight">{statsData.correct}</p>
                    </div>
                    <div className="flex flex-col gap-1 rounded-2xl p-4 bg-white border border-stone-100 shadow-sm">
                        <p className="text-stone-500 text-xs font-semibold uppercase tracking-wider leading-normal">Incorrect</p>
                        <p className="text-stone-900 tracking-tight text-2xl font-extrabold leading-tight">{statsData.incorrect}</p>
                    </div>
                    <div className="flex flex-col gap-1 rounded-2xl p-4 bg-white border border-stone-100 shadow-sm">
                        <p className="text-stone-500 text-xs font-semibold uppercase tracking-wider leading-normal">Rank</p>
                        <p className="text-stone-900 tracking-tight text-2xl font-extrabold leading-tight">{statsData.rank}</p>
                    </div>
                </div>

                {/* Toggle */}
                <div className="flex py-2 sticky top-[64px] bg-[#f8faf9]/95 backdrop-blur-sm z-10 mt-2">
                    <div className="flex h-12 flex-1 items-center justify-center rounded-full bg-stone-200/50 p-1">
                        <button
                            onClick={() => setView('history')}
                            className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-full px-2 text-sm font-bold leading-normal transition-all ${view === 'history' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500'
                                }`}
                        >
                            <span className="truncate">My History</span>
                        </button>
                        <button
                            onClick={() => setView('leaderboard')}
                            className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-full px-2 text-sm font-bold leading-normal transition-all ${view === 'leaderboard' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500'
                                }`}
                        >
                            <span className="truncate">Leaderboard</span>
                        </button>
                    </div>
                </div>

                {/* History View */}
                {view === 'history' && (
                    <div className="flex flex-col gap-3">
                        {historyData.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-stone-100 shadow-sm justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`flex items-center justify-center rounded-xl shrink-0 size-12 ${item.result === 'correct' ? 'bg-green-50' : 'bg-red-50'
                                        }`}>
                                        <span className={`material-symbols-outlined text-2xl ${item.result === 'correct' ? 'text-[#34C759]' : 'text-[#FF3B30]'
                                            }`}>
                                            {item.result === 'correct' ? 'check_circle' : 'cancel'}
                                        </span>
                                    </div>
                                    <div className="flex flex-col justify-center min-w-0">
                                        <p className="text-stone-900 text-sm font-bold leading-tight truncate">{item.question}</p>
                                        <p className="text-stone-400 text-xs font-medium leading-normal mt-0.5">{item.date} • Outcome: {item.outcome}</p>
                                    </div>
                                </div>
                                <div className="shrink-0 flex flex-col items-end">
                                    <span className={`px-2 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${item.result === 'correct' ? 'bg-green-50 text-[#34C759]' : 'bg-red-50 text-[#FF3B30]'
                                        }`}>
                                        {item.result === 'correct' ? 'Correct' : 'Wrong'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Leaderboard View */}
                {view === 'leaderboard' && (
                    <div className="flex flex-col gap-3">
                        {leaderboardData.map((user) => (
                            <div key={user.rank} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-stone-100 shadow-sm">
                                <div className={`flex items-center justify-center rounded-full shrink-0 size-10 font-extrabold text-lg ${user.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                                        user.rank === 2 ? 'bg-gray-100 text-gray-600' :
                                            user.rank === 3 ? 'bg-orange-100 text-orange-700' :
                                                'bg-stone-100 text-stone-600'
                                    }`}>
                                    {user.rank}
                                </div>
                                <div className="flex flex-col justify-center flex-1 min-w-0">
                                    <p className="text-stone-900 text-sm font-bold leading-tight">{user.name}</p>
                                    <p className="text-stone-400 text-xs font-medium">{user.total} predictions</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-stone-900 text-lg font-extrabold">{user.accuracy}%</p>
                                    <p className="text-stone-400 text-xs font-medium">accuracy</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}
