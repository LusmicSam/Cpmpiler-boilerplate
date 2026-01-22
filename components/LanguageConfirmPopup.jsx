"use client";

import { X, AlertTriangle } from "lucide-react";

/**
 * LanguageConfirmPopup Component
 * 
 * A modal dialog that asks the user whether to keep their existing code
 * or reset to the boilerplate when switching languages.
 * 
 * @component
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the popup is visible.
 * @param {function(): void} props.onClose - Callback to close the popup without changing language.
 * @param {function(string): void} props.onConfirm - Callback with action 'KEEP' or 'RESET'.
 * @param {string} props.targetLanguage - The name/id of the language being switched to.
 */
export default function LanguageConfirmPopup({ isOpen, onClose, onConfirm, targetLanguage }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md shadow-lg relative">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
                >
                    <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3 mb-4 text-amber-500">
                    <AlertTriangle className="w-6 h-6" />
                    <h3 className="text-lg font-semibold text-foreground">Switch Language?</h3>
                </div>

                <p className="text-sm text-muted-foreground mb-6">
                    You are switching the language to <span className="font-semibold text-foreground capitalize">{targetLanguage}</span>.
                    Do you want to keep your current code or reset the file to the {targetLanguage} boilerplate?
                </p>

                <div className="flex flex-col sm:flex-row justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium hover:bg-muted rounded transition-colors text-foreground"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => onConfirm('RESET')}
                        className="px-4 py-2 bg-destructive/10 text-destructive hover:bg-destructive/20 rounded text-sm font-medium transition-colors"
                    >
                        Reset to Boilerplate
                    </button>

                    <button
                        onClick={() => onConfirm('KEEP')}
                        className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded text-sm font-medium transition-colors"
                    >
                        Keep My Code
                    </button>
                </div>
            </div>
        </div>
    );
}
