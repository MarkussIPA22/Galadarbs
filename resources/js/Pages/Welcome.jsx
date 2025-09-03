import { Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <div className="min-h-screen bg-black text-white">
            <header className="flex justify-between items-center p-6 max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-[#FF2D20]">Liftify</h1>
                <nav className="flex gap-4">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="rounded px-4 py-2 text-white bg-[#FF2D20] hover:bg-red-600 transition"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="rounded px-4 py-2 text-[#FF2D20] border border-[#FF2D20] hover:bg-[#FF2D20] hover:text-white transition"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="rounded px-4 py-2 text-white bg-[#FF2D20] hover:bg-red-600 transition"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </header>

            <main className="flex flex-col items-center justify-center text-center mt-20 px-6">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                    Welcome to Liftify
                </h2>
            </main>
        </div>
    );
}
