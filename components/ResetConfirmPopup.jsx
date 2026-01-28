"use client";

import { X, RotateCcw } from "lucide-react";

/**
 * ResetConfirmPopup Component
 * 
 * A modal dialog that allows the user to reset their code.
 * Offers two options:
 * 1. Reset to Boilerplate (Default language template)
 * 2. Clear All Code (Empty file)
 * 
 * @component
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the popup is visible.
 * @param {function(): void} props.onClose - Callback to close the popup.
 * @param {function(string): void} props.onConfirm - Callback with action 'BOILERPLATE' or 'CLEAR'.
 */
export default function ResetConfirmPopup({ isOpen, onClose, onConfirm }) {
    console.log("ResetConfirmPopup render. isOpen:", isOpen);
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
                    <RotateCcw className="w-6 h-6" />
                    <h3 className="text-lg font-semibold text-foreground">Reset Code?</h3>
                </div>

                <p className="text-sm text-muted-foreground mb-6">
                    This will discard your current changes. You can choose to restore the default boilerplate code or clear the editor completely.
                    <br /><br />
                    <span className="font-bold text-destructive">This action cannot be undone.</span>
                </p>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => onConfirm('BOILERPLATE')}
                        className="w-full px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded text-sm font-medium transition-colors"
                    >
                        Reset to Boilerplate
                    </button>

                    <button
                        onClick={() => onConfirm('CLEAR')}
                        className="w-full px-4 py-2 bg-destructive/10 text-destructive hover:bg-destructive/20 rounded text-sm font-medium transition-colors"
                    >
                        Clear All Code
                    </button>

                    <button
                        onClick={onClose}
                        className="w-full px-4 py-2 text-sm font-medium hover:bg-muted rounded transition-colors text-muted-foreground"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
