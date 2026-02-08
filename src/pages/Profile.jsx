import { Link } from 'react-router-dom'

// Mock user data
const userData = {
    name: 'Alex Johnson',
    joinedDate: 'Dec 2023',
    accuracy: 82,
    total: 154,
    streak: 7,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbu3WdNDp6Gwr6vEEaF8Uib2kKRLWIy9U_jhFCV1lK_-kvVAMEhh0IwcSq065ULKaVOJWw_dWDriIUj_888Sa1jiqHNW3CmmuFPGiNX-oc2Maxr-kAsikxcpSVJRtwRAGiJJo3hl-OU6ZSm1oPDgB4sfyoVmeScYxRrOjaxrAHLkX0UH4sdvMq-cVcS0CuCcebvdg0u_FwVi6rNbL6FvTVXDW-f2L91sxq-WNhz59jcumZTPk16HjFxCfbIYMWggHS1Q9kyCMpKEM',
    predictions: [
        { id: 1, question: 'Will the market close up today?', choice: 'yes', result: 'correct', date: 'Dec 12' },
        { id: 2, question: 'Will it rain in London tomorrow?', choice: 'no', result: 'incorrect', date: 'Dec 10' },
        { id: 3, question: 'Will the Lakers win their next game?', choice: 'yes', result: 'correct', date: 'Dec 8' },
        { id: 4, question: 'Will the new tech stock IPO succeed?', choice: 'yes', result: 'pending', date: 'Dec 14' },
    ]
}

export default function Profile() {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-white">
            {/* Header */}
            <div className="flex items-center bg-white/80 backdrop-blur-md p-4 pb-2 justify-between sticky top-0 z-10 border-b border-zinc-100">
                <Link to="/predict" className="flex size-12 shrink-0 items-center justify-start text-zinc-900">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <h2 className="text-zinc-900 text-lg font-bold leading-tight tracking-tight flex-1 text-center">Profile</h2>
                <div className="flex w-12 items-center justify-end">
                    <button className="flex cursor-pointer items-center justify-center rounded-full h-12 bg-transparent text-zinc-900 p-0">
                        <span className="material-symbols-outlined">settings</span>
                    </button>
                </div>
            </div>

            {/* Profile Info */}
            <div className="flex p-6">
                <div className="flex w-full flex-col gap-4 items-center">
                    <div className="flex gap-4 flex-col items-center">
                        <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32 border-4 border-white shadow-xl"
                            style={{ backgroundImage: `url("${userData.avatar}")` }}
                        ></div>
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-zinc-900 text-[24px] font-extrabold leading-tight tracking-tight text-center">
                                {userData.name}
                            </p>
                            <p className="text-zinc-500 text-sm font-medium leading-normal text-center">
                                Joined {userData.joinedDate}
                            </p>
                        </div>
                    </div>
                    <button className="flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-zinc-100 hover:bg-zinc-200 transition-colors text-zinc-900 text-sm font-bold leading-normal tracking-wide w-full max-w-[200px]">
                        <span>Edit Profile</span>
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-3 px-4 py-3">
                <div className="flex min-w-[100px] flex-1 basis-[0] flex-col gap-1 rounded-2xl border border-zinc-100 bg-white shadow-sm p-4 items-center text-center">
                    <p className="text-zinc-900 tracking-tight text-2xl font-extrabold leading-tight">{userData.accuracy}%</p>
                    <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider leading-normal">Accuracy</p>
                </div>
                <div className="flex min-w-[100px] flex-1 basis-[0] flex-col gap-1 rounded-2xl border border-zinc-100 bg-white shadow-sm p-4 items-center text-center">
                    <p className="text-zinc-900 tracking-tight text-2xl font-extrabold leading-tight">{userData.total}</p>
                    <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider leading-normal">Total</p>
                </div>
                <div className="flex min-w-[100px] flex-1 basis-[0] flex-col gap-1 rounded-2xl border border-zinc-100 bg-white shadow-sm p-4 items-center text-center">
                    <p className="text-zinc-900 tracking-tight text-2xl font-extrabold leading-tight">{userData.streak}</p>
                    <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider leading-normal">Streak</p>
                </div>
            </div>

            {/* Predictions Header */}
            <div className="flex items-center justify-between px-4 pb-3 pt-6">
                <h2 className="text-zinc-900 text-xl font-extrabold leading-tight tracking-tight">My Predictions</h2>
                <span className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Recent</span>
            </div>

            {/* Filter Pills */}
            <div className="flex gap-2 px-4 pb-6 overflow-x-auto no-scrollbar">
                <div className="flex h-9 shrink-0 cursor-pointer items-center justify-center gap-x-2 rounded-full bg-zinc-900 px-5 transition-all">
                    <p className="text-white text-sm font-bold leading-normal">All</p>
                </div>
                <div className="flex h-9 shrink-0 cursor-pointer items-center justify-center gap-x-2 rounded-full bg-zinc-100 px-5 hover:bg-zinc-200 transition-all border border-zinc-200/50">
                    <p className="text-zinc-600 text-sm font-bold leading-normal">Correct</p>
                </div>
                <div className="flex h-9 shrink-0 cursor-pointer items-center justify-center gap-x-2 rounded-full bg-zinc-100 px-5 hover:bg-zinc-200 transition-all border border-zinc-200/50">
                    <p className="text-zinc-600 text-sm font-bold leading-normal">Incorrect</p>
                </div>
                <div className="flex h-9 shrink-0 cursor-pointer items-center justify-center gap-x-2 rounded-full bg-zinc-100 px-5 hover:bg-zinc-200 transition-all border border-zinc-200/50">
                    <p className="text-zinc-600 text-sm font-bold leading-normal">Pending</p>
                </div>
            </div>

            {/* Predictions List */}
            <div className="flex flex-col gap-3 px-4 pb-20">
                {userData.predictions.map((pred) => (
                    <div key={pred.id} className="flex w-full items-center gap-4 rounded-2xl border border-zinc-100 bg-white p-4 shadow-sm">
                        <div className={`flex items-center justify-center rounded-xl size-12 shrink-0 ${pred.result === 'correct' ? 'bg-green-50' : pred.result === 'incorrect' ? 'bg-red-50' : 'bg-amber-50'
                            }`}>
                            <span className={`material-symbols-outlined font-bold ${pred.result === 'correct' ? 'text-green-600' : pred.result === 'incorrect' ? 'text-red-600' : 'text-amber-600'
                                }`}>
                                {pred.result === 'correct' ? 'check_circle' : pred.result === 'incorrect' ? 'cancel' : 'schedule'}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-zinc-900 truncate">{pred.question}</p>
                            <div className="flex items-center gap-2">
                                <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${pred.choice === 'yes' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
                                    }`}>
                                    {pred.choice.toUpperCase()}
                                </span>
                                <p className="text-xs text-zinc-500">{pred.date}</p>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-zinc-300">chevron_right</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
