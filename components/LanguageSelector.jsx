"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * List of available programming languages.
 * @type {Array<{id: string, name: string}>}
 */
const languages = [
    { id: "javascript", name: "JavaScript (Node.js)" },
    { id: "python", name: "Python 3" },
    { id: "cpp", name: "C++ (GCC)" },
    { id: "java", name: "Java" },
    { id: "c", name: "C (GCC)" },
];

/**
 * LanguageSelector Component
 * 
 * A custom dropdown component for selecting the programming language.
 * Replaces the native <select> element to ensure consistent behavior across environments (like Electron)
 * and provides better styling and animation control.
 * 
 * @component
 * @param {Object} props
 * @param {string} props.language - The currently selected language ID.
 * @param {function(string): void} props.setLanguage - Callback function to update the selected language.
 */
export default function LanguageSelector({ language, setLanguage }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    // Find the currently selected language object
    const selectedLang = languages.find((l) => l.id === language) || languages[0];

    /**
     * Toggles the dropdown visibility.
     */
    const toggleOpen = () => setIsOpen(!isOpen);

    /**
     * Handles language selection.
     * @param {string} langId - The ID of the language to select.
     */
    const handleSelect = (langId) => {
        setLanguage(langId);
        setIsOpen(false);
        buttonRef.current?.focus(); // Return focus to button after selection
    };

    /**
     * Handles keyboard interactions for accessibility.
     * @param {React.KeyboardEvent} e
     */
    const handleKeyDown = (e) => {
        if (!isOpen) {
            if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown" || e.key === "ArrowUp") {
                e.preventDefault();
                setIsOpen(true);
            }
            return;
        }

        const currentIndex = languages.findIndex((l) => l.id === language);

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % languages.length;
                setLanguage(languages[nextIndex].id); // Immediate update as per user request
                break;
            case "ArrowUp":
                e.preventDefault();
                const prevIndex = (currentIndex - 1 + languages.length) % languages.length;
                setLanguage(languages[prevIndex].id); // Immediate update as per user request
                break;
            case "Enter":
            case " ":
                e.preventDefault();
                setIsOpen(false);
                break;
            case "Escape":
                e.preventDefault();
                setIsOpen(false);
                break;
            default:
                break;
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Trigger Button */}
            <button
                ref={buttonRef}
                onClick={toggleOpen}
                onKeyDown={handleKeyDown}
                className="w-[200px] flex items-center justify-between bg-card hover:bg-muted border border-border text-foreground px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-label="Select programming language"
            >
                <span className="truncate font-medium">{selectedLang.name}</span>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-md shadow-lg z-50 overflow-hidden"
                    >
                        <ul role="listbox" className="py-1 max-h-[300px] overflow-auto">
                            {languages.map((lang) => (
                                <li
                                    key={lang.id}
                                    role="option"
                                    aria-selected={language === lang.id}
                                    onClick={() => handleSelect(lang.id)}
                                    className={`
                                        flex items-center justify-between px-4 py-2 text-sm cursor-pointer transition-colors
                                        ${language === lang.id ? "bg-primary/10 text-primary font-medium" : "text-foreground hover:bg-muted"}
                                    `}
                                >
                                    <span>{lang.name}</span>
                                    {language === lang.id && <Check className="w-4 h-4" />}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
