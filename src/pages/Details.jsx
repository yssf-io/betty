import { Link, useParams, useNavigate } from 'react-router-dom'
import { predictions } from '../data/predictions'

export default function Details() {
    const { id } = useParams()
    const navigate = useNavigate()
    const prediction = predictions.find(p => p.id === parseInt(id)) || predictions[0]

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#F2F2F7]">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between bg-white/90 p-4 pb-3 backdrop-blur-md border-b border-zinc-200/50">
                <button
                    onClick={() => navigate(-1)}
                    className="flex size-10 shrink-0 items-center justify-center rounded-full text-zinc-900"
                >
                    <span className="material-symbols-outlined text-2xl font-bold">arrow_back_ios_new</span>
                </button>
                <h2 className="flex-1 text-center text-lg font-bold leading-tight tracking-tight text-zinc-900">
                    Prediction Details
                </h2>
                <div className="flex size-10 shrink-0 items-center justify-center"></div>
            </div>

            <main className="flex-grow p-4">
                <div className="flex flex-col gap-4">
                    {/* Question Card */}
                    <div className="flex flex-col items-stretch justify-start rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                        <div className="mb-4 flex items-center justify-between gap-4">
                            <p className="text-sm font-semibold uppercase tracking-wider text-[#8E8E93]">{prediction.category}</p>
                            <div className="flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
                                <span className="material-symbols-outlined !text-sm">schedule</span>
                                <span>PENDING</span>
                            </div>
                        </div>
                        <p className="text-2xl font-extrabold leading-tight tracking-tight text-black">
                            {prediction.question}
                        </p>
                    </div>

                    {/* Resolution Details */}
                    <div className="flex flex-col items-stretch justify-start rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
                        <div className="p-6 pb-2">
                            <h3 className="text-base font-bold text-black">Resolution Details</h3>
                        </div>
                        <div className="px-6">
                            <div className="flex items-center justify-between border-b border-zinc-100 py-4">
                                <p className="text-sm font-medium text-[#3C3C43]">Expires</p>
                                <p className="text-sm font-semibold text-black">
                                    {new Date(prediction.expiresAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </p>
                            </div>
                            <div className="flex items-center justify-between py-4">
                                <p className="text-sm font-medium text-[#3C3C43]">Status</p>
                                <p className="text-sm font-semibold text-amber-600">Awaiting Resolution</p>
                            </div>
                        </div>
                    </div>

                    {/* Context */}
                    <div className="flex flex-col items-stretch justify-start rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                        <h3 className="mb-3 text-base font-bold text-black">Prediction Context</h3>
                        <p className="text-sm font-medium leading-relaxed text-[#3C3C43]">
                            {prediction.context}
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white/80 p-6 pt-2 backdrop-blur-md border-t border-zinc-200/50">
                <button
                    onClick={() => navigate('/predict')}
                    className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-zinc-900 text-base font-bold text-white shadow-lg shadow-zinc-200 active:scale-[0.98] transition-all"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                    Back to Predictions
                </button>
            </div>
        </div>
    )
}
