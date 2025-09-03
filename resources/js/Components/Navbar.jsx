export default function Navbar({ auth }) {
    return (
        <nav className="bg-white shadow p-4">
            <ul className="flex gap-4">
                <li><a href="/">Home</a></li>
                <li><a href="/dashboard">Dashboard</a></li>
                <li><a href="/workouts">Workouts</a></li>
            </ul>
        </nav>
    );
}
