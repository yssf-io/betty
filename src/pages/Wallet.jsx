import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useWallet, SUPPORTED_NETWORKS } from '../context/WalletContext'

export default function Wallet() {
    const navigate = useNavigate()
    const {
        balance,
        betAmount,
        setBetAmount,
        selectedNetwork,
        setSelectedNetwork,
        deposit,
        depositAddress
    } = useWallet()

    const [copied, setCopied] = useState(false)
    const [showSimulate, setShowSimulate] = useState(false)

    const copyAddress = async () => {
        await navigator.clipboard.writeText(depositAddress)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    // Simulate deposit for demo purposes
    const simulateDeposit = (amount) => {
        deposit(amount)
        setShowSimulate(false)
    }

    const betAmounts = [0.05, 0.10, 0.25, 0.50, 1.00]

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-[#F8FAFC] overflow-x-hidden">
            {/* Header */}
            <div className="flex items-center bg-white/80 backdrop-blur-md p-4 pb-2 justify-between sticky top-0 z-10 border-b border-zinc-100">
                <Link to="/" className="flex size-10 shrink-0 items-center justify-center text-zinc-900">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <h2 className="text-zinc-900 text-lg font-bold leading-tight tracking-tight flex-1 text-center">Wallet</h2>
                <div className="w-10"></div>
            </div>

            <main className="flex-1 p-4 space-y-4">
                {/* Balance Card */}
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-3xl p-6 text-white shadow-xl">
                    <p className="text-zinc-400 text-sm font-medium mb-1">Available Balance</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-extrabold tracking-tight">${balance.toFixed(2)}</span>
                        <span className="text-zinc-400 text-lg">USDC</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-zinc-700/50 flex items-center justify-between">
                        <div>
                            <p className="text-zinc-400 text-xs font-medium">Bet per swipe</p>
                            <p className="text-white text-lg font-bold">${betAmount.toFixed(2)}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-zinc-400 text-xs font-medium">Predictions left</p>
                            <p className="text-white text-lg font-bold">{balance > 0 ? Math.floor(balance / betAmount) : 0}</p>
                        </div>
                    </div>
                </div>

                {/* Deposit Section */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-100">
                    <h3 className="text-zinc-900 text-lg font-bold mb-4">Deposit USDC</h3>

                    {/* Network Selection */}
                    <p className="text-zinc-500 text-sm font-medium mb-2">Select Network</p>
                    <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
                        {SUPPORTED_NETWORKS.map((network) => (
                            <button
                                key={network.id}
                                onClick={() => setSelectedNetwork(network.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all shrink-0 ${selectedNetwork === network.id
                                        ? 'bg-zinc-900 text-white'
                                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                                    }`}
                            >
                                <span>{network.icon}</span>
                                <span>{network.name}</span>
                                {network.recommended && selectedNetwork === network.id && (
                                    <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full">LOW FEES</span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Deposit Address */}
                    <p className="text-zinc-500 text-sm font-medium mb-2">Send USDC to this address</p>
                    <div className="flex items-center gap-2 bg-zinc-50 rounded-xl p-4 border border-zinc-200">
                        <code className="flex-1 text-xs font-mono text-zinc-700 truncate">
                            {depositAddress}
                        </code>
                        <button
                            onClick={copyAddress}
                            className={`flex items-center justify-center h-10 px-4 rounded-lg font-bold text-sm transition-all ${copied
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-zinc-900 text-white active:scale-95'
                                }`}
                        >
                            {copied ? (
                                <>
                                    <span className="material-symbols-outlined text-lg mr-1">check</span>
                                    Copied
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-lg mr-1">content_copy</span>
                                    Copy
                                </>
                            )}
                        </button>
                    </div>

                    {/* QR Code Placeholder */}
                    <div className="mt-4 flex justify-center">
                        <div className="w-40 h-40 bg-zinc-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-zinc-200">
                            <div className="text-center">
                                <span className="material-symbols-outlined text-4xl text-zinc-400">qr_code_2</span>
                                <p className="text-zinc-400 text-xs mt-1">QR Code</p>
                            </div>
                        </div>
                    </div>

                    {/* Demo Simulate Button */}
                    <button
                        onClick={() => setShowSimulate(true)}
                        className="w-full mt-4 text-primary text-sm font-bold underline underline-offset-2"
                    >
                        Demo: Simulate deposit
                    </button>
                </div>

                {/* Bet Amount Selector */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-100">
                    <h3 className="text-zinc-900 text-lg font-bold mb-4">Bet Amount Per Swipe</h3>
                    <div className="grid grid-cols-5 gap-2">
                        {betAmounts.map((amount) => (
                            <button
                                key={amount}
                                onClick={() => setBetAmount(amount)}
                                className={`py-3 rounded-xl text-sm font-bold transition-all ${betAmount === amount
                                        ? 'bg-primary text-zinc-900 shadow-lg shadow-primary/30'
                                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                                    }`}
                            >
                                ${amount.toFixed(2)}
                            </button>
                        ))}
                    </div>
                </div>
            </main>

            {/* Footer CTA */}
            <div className="sticky bottom-0 bg-white/80 backdrop-blur-md p-4 border-t border-zinc-100">
                <button
                    onClick={() => navigate('/predict')}
                    disabled={balance < betAmount}
                    className={`flex items-center justify-center w-full h-14 rounded-2xl text-lg font-bold transition-all ${balance >= betAmount
                            ? 'bg-primary text-zinc-900 shadow-lg shadow-primary/30 active:scale-[0.98]'
                            : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                        }`}
                >
                    {balance >= betAmount ? (
                        <>
                            <span className="material-symbols-outlined mr-2">trending_up</span>
                            Start Predicting
                        </>
                    ) : (
                        'Deposit to Start'
                    )}
                </button>
            </div>

            {/* Simulate Deposit Modal */}
            {showSimulate && (
                <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50" onClick={() => setShowSimulate(false)}>
                    <div
                        className="bg-white rounded-t-3xl w-full max-w-md p-6 space-y-4 animate-slide-up"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-zinc-900 text-xl font-bold text-center">Simulate Deposit</h3>
                        <p className="text-zinc-500 text-sm text-center">For demo purposes only</p>
                        <div className="grid grid-cols-3 gap-3">
                            {[5, 10, 25].map((amount) => (
                                <button
                                    key={amount}
                                    onClick={() => simulateDeposit(amount)}
                                    className="py-4 bg-zinc-100 hover:bg-zinc-200 rounded-xl text-lg font-bold text-zinc-900 transition-all active:scale-95"
                                >
                                    ${amount}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setShowSimulate(false)}
                            className="w-full py-3 text-zinc-500 font-bold"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
