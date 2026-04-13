import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGame, calculatePayout } from '../context/GameContext'
import { getPrediction } from '../data/predictions'

function formatJoined(iso) {
    const d = new Date(iso)
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function classifyEntry(entry) {
    const pred = getPrediction(entry.predictionId)
    if (!pred || pred.outcome == null) return 'pending'
    return entry.choice === pred.outcome ? 'correct' : 'incorrect'
}

function describeEntry(entry, status) {
    const date = formatDate(entry.timestamp)
    if (status === 'correct') return `Won +${entry.wonPoints} pts · ${date}`
    if (status === 'incorrect') return `Lost ${entry.stake} pts · ${date}`
    const pct = entry.yesPercentAtBet ?? 50
    const potential = calculatePayout(entry.stake, pct, entry.choice)
    return `+${potential} at ${pct}% · ${date}`
}

export default function Profile() {
    const { points, history, joinedAt } = useGame()
    const [filter, setFilter] = useState('all')

    const stats = useMemo(() => {
        let correct = 0
        let incorrect = 0
        let pending = 0
        for (const entry of history) {
            const status = classifyEntry(entry)
            if (status === 'correct') correct++
            else if (status === 'incorrect') incorrect++
            else pending++
        }
        const settled = correct + incorrect
        const accuracy = settled > 0 ? Math.round((correct / settled) * 100) : null
        return { correct, incorrect, pending, accuracy, total: history.length }
    }, [history])

    const rows = useMemo(() => {
        const mapped = history
            .slice()
            .reverse()
            .map((entry) => {
                const pred = getPrediction(entry.predictionId)
                return {
                    entry,
                    pred,
                    status: classifyEntry(entry),
                }
            })
        if (filter === 'all') return mapped
        return mapped.filter((r) => r.status === filter)
    }, [history, filter])

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-white">
            {/* Header */}
            <div className="flex items-center bg-white/80 backdrop-blur-md p-4 pb-2 justify-between sticky top-0 z-10 border-b border-zinc-100">
                <Link to="/predict" className="flex size-12 shrink-0 items-center justify-start text-zinc-900">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <h2 className="text-zinc-900 text-lg font-bold leading-tight tracking-tight flex-1 text-center">Profile</h2>
                <div className="flex w-12 items-center justify-end">
                    <Link to="/settings" className="flex cursor-pointer items-center justify-center rounded-full h-12 text-zinc-900 p-0">
                        <span className="material-symbols-outlined">settings</span>
                    </Link>
                </div>
            </div>

            {/* Identity */}
            <div className="flex p-6">
                <div className="flex w-full flex-col gap-4 items-center">
                    <div className="flex items-center justify-center rounded-full size-24 bg-primary/20 text-4xl">
                        🎯
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-zinc-900 text-[24px] font-extrabold leading-tight tracking-tight text-center">You</p>
                        <p className="text-zinc-500 text-sm font-medium leading-normal text-center">Joined {formatJoined(joinedAt)}</p>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-3 px-4 py-3">
                <div className="flex min-w-[100px] flex-1 basis-[0] flex-col gap-1 rounded-2xl border border-zinc-100 bg-white shadow-sm p-4 items-center text-center">
                    <p className="text-zinc-900 tracking-tight text-2xl font-extrabold leading-tight">
                        {stats.accuracy == null ? '—' : `${stats.accuracy}%`}
                    </p>
                    <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider leading-normal">Accuracy</p>
                </div>
                <div className="flex min-w-[100px] flex-1 basis-[0] flex-col gap-1 rounded-2xl border border-zinc-100 bg-white shadow-sm p-4 items-center text-center">
                    <p className="text-zinc-900 tracking-tight text-2xl font-extrabold leading-tight">{stats.total}</p>
                    <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider leading-normal">Total</p>
                </div>
                <div className="flex min-w-[100px] flex-1 basis-[0] flex-col gap-1 rounded-2xl border border-zinc-100 bg-white shadow-sm p-4 items-center text-center">
                    <p className="text-zinc-900 tracking-tight text-2xl font-extrabold leading-tight">{points.toLocaleString()}</p>
                    <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider leading-normal">Points</p>
                </div>
            </div>

            {/* Predictions Header */}
            <div className="flex items-center justify-between px-4 pb-3 pt-6">
                <h2 className="text-zinc-900 text-xl font-extrabold leading-tight tracking-tight">My Predictions</h2>
                <span className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Recent</span>
            </div>

            {/* Filter pills */}
            <div className="flex gap-2 px-4 pb-6 overflow-x-auto no-scrollbar">
                {[
                    { key: 'all', label: 'All' },
                    { key: 'correct', label: 'Correct' },
                    { key: 'incorrect', label: 'Incorrect' },
                    { key: 'pending', label: 'Pending' },
                ].map((f) => (
                    <button
                        key={f.key}
                        onClick={() => setFilter(f.key)}
                        className={`flex h-9 shrink-0 cursor-pointer items-center justify-center gap-x-2 rounded-full px-5 transition-all border ${filter === f.key
                            ? 'bg-zinc-900 text-white border-zinc-900'
                            : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 border-zinc-200/50'
                            }`}
                    >
                        <p className="text-sm font-bold leading-normal">{f.label}</p>
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="flex flex-col gap-3 px-4 pb-20">
                {rows.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-zinc-500 text-sm mb-4">No predictions yet.</p>
                        <Link
                            to="/predict"
                            className="inline-flex h-12 items-center justify-center px-6 rounded-full bg-primary text-zinc-900 text-sm font-bold"
                        >
                            Start swiping
                        </Link>
                    </div>
                ) : (
                    rows.map(({ entry, pred, status }) => (
                        <div
                            key={entry.id}
                            className="flex w-full items-center gap-4 rounded-2xl border border-zinc-100 bg-white p-4 shadow-sm"
                        >
                            <div
                                className={`flex items-center justify-center rounded-xl size-12 shrink-0 ${status === 'correct'
                                    ? 'bg-green-50'
                                    : status === 'incorrect'
                                        ? 'bg-red-50'
                                        : 'bg-amber-50'
                                    }`}
                            >
                                <span
                                    className={`material-symbols-outlined font-bold ${status === 'correct'
                                        ? 'text-green-600'
                                        : status === 'incorrect'
                                            ? 'text-red-600'
                                            : 'text-amber-600'
                                        }`}
                                >
                                    {status === 'correct' ? 'check_circle' : status === 'incorrect' ? 'cancel' : 'schedule'}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-zinc-900 truncate">
                                    {pred ? pred.question : 'Unknown market'}
                                </p>
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`text-xs font-bold px-1.5 py-0.5 rounded ${entry.choice === 'yes' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
                                            }`}
                                    >
                                        {entry.choice.toUpperCase()}
                                    </span>
                                    <p className="text-xs text-zinc-500">{describeEntry(entry, status)}</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-zinc-300">chevron_right</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
