import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { getPrediction } from '../data/predictions'

function classify(entry) {
    const pred = getPrediction(entry.predictionId)
    if (!pred || pred.outcome == null) return 'pending'
    return entry.choice === pred.outcome ? 'correct' : 'wrong'
}

export default function Stats() {
    const { history, points } = useGame()

    const stats = useMemo(() => {
        let correct = 0
        let wrong = 0
        let pending = 0
        for (const entry of history) {
            const c = classify(entry)
            if (c === 'correct') correct++
            else if (c === 'wrong') wrong++
            else pending++
        }
        const settled = correct + wrong
        const accuracy = settled > 0 ? Math.round((correct / settled) * 100) : 0
        return { correct, wrong, pending, accuracy, total: history.length, settled }
    }, [history])

    const recent = useMemo(() => {
        return history
            .slice()
            .reverse()
            .map((entry) => ({
                entry,
                pred: getPrediction(entry.predictionId),
                status: classify(entry),
            }))
    }, [history])

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#f8faf9] overflow-x-hidden">
            {/* Header */}
            <div className="flex items-center bg-[#f8faf9]/80 backdrop-blur-md p-4 pb-2 justify-between sticky top-0 z-20">
                <Link to="/predict" className="text-stone-900 flex size-10 shrink-0 items-center justify-center cursor-pointer">
                    <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
                </Link>
                <h2 className="text-stone-900 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center -ml-10">
                    My Stats
                </h2>
            </div>

            <main className="flex-1 flex flex-col px-4 gap-4 pb-8">
                {/* Accuracy */}
                <div className="flex flex-col items-stretch justify-start rounded-2xl shadow-sm border border-stone-100 bg-white p-6 mt-2">
                    <p className="text-stone-900 text-lg font-bold leading-tight tracking-[-0.015em]">Accuracy Rate</p>
                    <p className="text-stone-500 text-sm font-normal leading-normal mb-6">
                        {stats.settled === 0
                            ? 'No predictions have resolved yet.'
                            : `Based on ${stats.settled} resolved predictions`}
                    </p>
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
                                    strokeDasharray={`${stats.accuracy} 100`}
                                    strokeLinecap="round"
                                    strokeWidth="3"
                                ></circle>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-stone-900 text-5xl font-extrabold tracking-tighter">
                                    {stats.settled === 0 ? '—' : `${stats.accuracy}%`}
                                </span>
                                <span className="text-stone-400 text-[10px] font-bold uppercase tracking-wider">Overall</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 gap-3">
                    <StatCard label="Total" value={stats.total} />
                    <StatCard label="Correct" value={stats.correct} />
                    <StatCard label="Wrong" value={stats.wrong} />
                    <StatCard label="Points" value={points.toLocaleString()} />
                </div>

                {/* History list */}
                <div className="flex items-center justify-between pt-4 pb-1">
                    <h3 className="text-stone-900 text-lg font-bold">History</h3>
                    <span className="text-stone-400 text-xs font-bold uppercase tracking-widest">
                        {stats.pending} pending
                    </span>
                </div>

                {recent.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl border border-stone-100">
                        <p className="text-stone-500 text-sm mb-4">Nothing here yet.</p>
                        <Link
                            to="/predict"
                            className="inline-flex h-11 items-center justify-center px-5 rounded-full bg-primary text-stone-900 text-sm font-bold"
                        >
                            Make a prediction
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {recent.map(({ entry, pred, status }) => (
                            <div
                                key={entry.id}
                                className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-stone-100 shadow-sm justify-between"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <div
                                        className={`flex items-center justify-center rounded-xl shrink-0 size-12 ${status === 'correct'
                                            ? 'bg-green-50'
                                            : status === 'wrong'
                                                ? 'bg-red-50'
                                                : 'bg-amber-50'
                                            }`}
                                    >
                                        <span
                                            className={`material-symbols-outlined text-2xl ${status === 'correct'
                                                ? 'text-[#34C759]'
                                                : status === 'wrong'
                                                    ? 'text-[#FF3B30]'
                                                    : 'text-amber-600'
                                                }`}
                                        >
                                            {status === 'correct' ? 'check_circle' : status === 'wrong' ? 'cancel' : 'schedule'}
                                        </span>
                                    </div>
                                    <div className="flex flex-col justify-center min-w-0">
                                        <p className="text-stone-900 text-sm font-bold leading-tight truncate">
                                            {pred ? pred.question : 'Unknown market'}
                                        </p>
                                        <p className="text-stone-400 text-xs font-medium leading-normal mt-0.5">
                                            {entry.choice.toUpperCase()} · {entry.stake} pts
                                        </p>
                                    </div>
                                </div>
                                <div className="shrink-0 flex flex-col items-end">
                                    <span
                                        className={`px-2 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${status === 'correct'
                                            ? 'bg-green-50 text-[#34C759]'
                                            : status === 'wrong'
                                                ? 'bg-red-50 text-[#FF3B30]'
                                                : 'bg-amber-50 text-amber-600'
                                            }`}
                                    >
                                        {status === 'correct' ? 'Correct' : status === 'wrong' ? 'Wrong' : 'Pending'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}

function StatCard({ label, value }) {
    return (
        <div className="flex flex-col gap-1 rounded-2xl p-4 bg-white border border-stone-100 shadow-sm">
            <p className="text-stone-500 text-xs font-semibold uppercase tracking-wider leading-normal">{label}</p>
            <p className="text-stone-900 tracking-tight text-2xl font-extrabold leading-tight">{value}</p>
        </div>
    )
}
