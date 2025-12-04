"use client";

import { ChevronDown } from "lucide-react";



const languages = [
    { id: "javascript", name: "JavaScript (Node.js)" },
    { id: "python", name: "Python 3" },
    { id: "cpp", name: "C++ (GCC)" },
    { id: "java", name: "Java" },
    { id: "c", name: "C (GCC)" },
];

export default function LanguageSelector({ language, setLanguage }) {
    return (
        <div className="relative">
            <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="appearance-none bg-card border border-border text-foreground px-4 py-2 pr-10 rounded hover:border-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer min-w-[150px]"
            >
                {languages.map((lang) => (
                    <option key={lang.id} value={lang.id}>
                        {lang.name}
                    </option>
                ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
    );
}
