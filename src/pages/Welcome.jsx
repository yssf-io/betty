import { Link } from 'react-router-dom'

export default function Welcome() {
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-white overflow-x-hidden">
            <header className="flex h-14 items-center justify-center px-4 pt-6">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-3xl">swipe</span>
                    <span className="text-xl font-extrabold text-[#111827]">Predictly</span>
                </div>
            </header>

            <main className="flex flex-1 flex-col items-center justify-center p-4">
                <div className="flex w-full grow flex-col items-center justify-center">
                    <div className="relative w-full max-w-xs aspect-[1/1]">
                        {/* Card stack effect */}
                        <div className="absolute w-full h-full flex items-center justify-center">
                            <div className="w-10/12 aspect-[2/3] bg-gray-100 rounded-xl rotate-[12deg] translate-x-3 translate-y-2 shadow-sm"></div>
                        </div>
                        <div className="absolute w-full h-full flex items-center justify-center">
                            <div className="w-10/12 aspect-[2/3] bg-gray-200 rounded-xl -rotate-[8deg] shadow-sm"></div>
                        </div>
                        <div className="absolute w-full h-full flex items-center justify-center">
                            <div
                                className="w-10/12 aspect-[2/3] flex flex-col items-center justify-center rounded-xl bg-center bg-no-repeat bg-cover shadow-xl border border-gray-100"
                                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCj2JRVfaO6XzUyNf6KCdj_WHXTPc5KxkybvxK4zhVBD4p9vhBoOdtfwW9b6xMMpRb6UX1RmlClzGOeehNoUY5F6qXHFw6zIUvIKPCLfy6exPz2v6p459qlhlN1SPIdYj7PrwIhd6EkOIRnlKJY18eDQvliGSt9VK-61Jeu2KgZmkSyfu8QZES2aF631_Fy7OADUPD5YNm7sjH_YV05cFhly-VnOsJlYIJ4D59azUfaHmNB-E0VFlxX0pQTrFgtZeIXYRpiXGtDzLk")' }}
                            ></div>
                        </div>

                        {/* Action buttons preview */}
                        <div className="absolute bottom-12 left-0 flex h-16 w-16 items-center justify-center rounded-full bg-red-500 shadow-lg transition-transform active:scale-90">
                            <span className="material-symbols-outlined text-4xl text-white">close</span>
                        </div>
                        <div className="absolute bottom-12 right-0 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 shadow-lg transition-transform active:scale-90">
                            <span className="material-symbols-outlined text-4xl text-white">done</span>
                        </div>
                    </div>
                </div>

                <div className="w-full text-center py-6">
                    <h1 className="text-[#111827] tracking-tight text-[32px] font-extrabold leading-tight">
                        Predict the Future, One Swipe at a Time.
                    </h1>
                    <p className="text-gray-500 text-base font-medium leading-normal pt-2">
                        Swipe right for 'Yes,' left for 'No.' See how your predictions stack up.
                    </p>
                </div>
            </main>

            <footer className="w-full px-4 pb-8 pt-4">
                <div className="flex px-0 py-0">
                    <Link
                        to="/wallet"
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-5 flex-1 bg-[#13ec5b] hover:bg-[#11d853] text-[#102216] text-lg font-bold leading-normal tracking-wide shadow-md"
                    >
                        <span className="truncate">Get Started</span>
                    </Link>
                </div>
                <p className="text-gray-500 text-sm font-medium leading-normal pb-3 pt-6 text-center">
                    Already have an account?{' '}
                    <Link className="font-bold text-[#111827] underline decoration-primary decoration-2 underline-offset-4" to="/login">
                        Log In
                    </Link>
                </p>
            </footer>
        </div>
    )
}
