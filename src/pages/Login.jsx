import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
    const [mode, setMode] = useState('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        // For demo, just navigate to predict
        window.location.href = '/predict'
    }

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-white overflow-x-hidden">
            <div className="flex flex-col items-center justify-start w-full grow p-4">
                <div className="flex flex-col items-center justify-center pt-12 pb-8">
                    <div
                        className="w-20 h-20 bg-center bg-no-repeat bg-cover rounded-2xl aspect-square shadow-sm"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBquWAo1W8n3pMbj2WRIi99S7tatJnO-rwv_fZRJsUyrD3f_OMyRKyvgrNc0Ax8z8C51pF0rqpdqzKzQh5HUipSOJIpvMqiGLx2rPiraHZzM1mg0Z6TsJ9mA1UKc0TBFOn8RxvXMcHTIFVgsX_0KlmdWvAI1xXf40x2ifAgsep7B1MU7XNiXePm4lqUv9B4Dvi6lE0cao7RjM0gEd9313CAoPYM3dfyOCMKEJoTgUS8vqmaSdc9dOU7T5iLmW-wgk2eYNs0cMGZaNk")' }}
                    ></div>
                    <h1 className="text-slate-900 tracking-tight text-2xl font-bold leading-tight pt-4 text-center">
                        Predict the Future
                    </h1>
                </div>

                <div className="w-full max-w-sm">
                    {/* Toggle */}
                    <div className="flex px-4 py-3">
                        <div className="flex h-12 flex-1 items-center justify-center rounded-full bg-slate-100 p-1">
                            <button
                                onClick={() => setMode('login')}
                                className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-full px-2 text-sm font-semibold transition-all duration-200 ${mode === 'login' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'
                                    }`}
                            >
                                <span className="truncate">Log In</span>
                            </button>
                            <button
                                onClick={() => setMode('signup')}
                                className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-full px-2 text-sm font-semibold transition-all duration-200 ${mode === 'signup' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'
                                    }`}
                            >
                                <span className="truncate">Sign Up</span>
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Email */}
                        <div className="flex max-w-sm flex-wrap items-end gap-4 px-4 py-3">
                            <label className="flex flex-col w-full">
                                <p className="text-slate-700 text-sm font-semibold leading-normal pb-2">Email</p>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-slate-900 focus:outline-0 focus:ring-2 focus:ring-primary/50 focus:border-primary border-slate-200 bg-white h-14 placeholder:text-slate-400 p-4 text-base font-normal leading-normal shadow-sm"
                                    placeholder="Enter your email"
                                />
                            </label>
                        </div>

                        {/* Password */}
                        <div className="flex max-w-sm flex-wrap items-end gap-4 px-4 py-3">
                            <label className="flex flex-col w-full">
                                <p className="text-slate-700 text-sm font-semibold leading-normal pb-2">Password</p>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-slate-900 focus:outline-0 focus:ring-2 focus:ring-primary/50 focus:border-primary border-slate-200 bg-white h-14 placeholder:text-slate-400 p-4 text-base font-normal leading-normal shadow-sm"
                                    placeholder="Enter your password"
                                />
                            </label>
                        </div>

                        <div className="px-4 pt-2 pb-4 text-right">
                            <a className="text-primary font-bold text-sm leading-normal hover:opacity-80 transition-opacity" href="#">
                                Forgot Password?
                            </a>
                        </div>

                        <div className="px-4 py-3">
                            <button
                                type="submit"
                                className="flex items-center justify-center w-full h-14 rounded-xl bg-primary text-slate-900 text-base font-extrabold leading-normal shadow-lg shadow-primary/20 active:scale-[0.98] transition-transform"
                            >
                                {mode === 'login' ? 'Log In' : 'Sign Up'}
                            </button>
                        </div>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 px-4 py-6">
                        <hr className="flex-1 border-t border-slate-200" />
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">or continue with</p>
                        <hr className="flex-1 border-t border-slate-200" />
                    </div>

                    {/* Social buttons */}
                    <div className="flex flex-col gap-3 px-4 py-3">
                        <button className="relative flex items-center justify-center w-full h-14 rounded-xl bg-black text-white text-base font-bold leading-normal active:scale-[0.98] transition-transform">
                            <span>Apple</span>
                        </button>
                        <button className="relative flex items-center justify-center w-full h-14 rounded-xl bg-white text-slate-900 text-base font-bold leading-normal border border-slate-200 shadow-sm active:scale-[0.98] transition-transform">
                            <span>Google</span>
                        </button>
                    </div>

                    <p className="text-slate-400 text-xs font-medium leading-relaxed pb-8 pt-6 px-8 text-center">
                        By continuing, you agree to our <a className="text-slate-600 underline" href="#">Terms of Service</a> and{' '}
                        <a className="text-slate-600 underline" href="#">Privacy Policy</a>.
                    </p>
                </div>
            </div>
        </div>
    )
}
