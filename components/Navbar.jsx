import { Code2, User } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-card border-b border-border">
            <div className="flex items-center gap-2">
                <div className="p-2 bg-white rounded-full">
                    <Code2 className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xl font-bold text-primary">EduCode</span>
            </div>

            <div className="flex items-center gap-6 text-muted-foreground text-sm font-medium">
                <Link href="#" className="hover:text-primary transition-colors">Dashboard</Link>
                <Link href="#" className="hover:text-primary transition-colors">Profile</Link>
                <button className="hover:text-primary transition-colors border border-border px-3 py-1 rounded hover:bg-muted">Logout</button>
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-white">
                    <User className="w-5 h-5" />
                </div>
            </div>
        </nav>
    );
}
