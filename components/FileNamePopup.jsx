"use client";

import { useState } from "react";
import { X } from "lucide-react";

/**
 * FileNamePopup Component
 * 
 * A modal dialog for creating new files.
 * Validates the file name and extension before creation.
 * 
 * @component
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the popup is visible.
 * @param {function(): void} props.onClose - Callback to close the popup.
 * @param {function(string): void} props.onCreate - Callback to create the file with the given name.
 */
export default function FileNamePopup({ isOpen, onClose, onCreate }) {
    const [fileName, setFileName] = useState("");
    const [error, setError] = useState("");

    const validExtensions = ['js', 'py', 'cpp', 'java', 'c'];

    /**
     * DOM handler for creating a file.
     * Validates input and calls onCreate.
     */
    const handleCreate = () => {
        if (!fileName.trim()) {
            setError("File name cannot be empty");
            return;
        }

        // Check if file has an extension
        const parts = fileName.trim().split('.');
        if (parts.length < 2) {
            setError("Please include a file extension (.js, .py, .cpp, .java, .c)");
            return;
        }

        const extension = parts[parts.length - 1].toLowerCase();
        if (!validExtensions.includes(extension)) {
            setError(`Invalid extension. Use: ${validExtensions.map(e => '.' + e).join(', ')}`);
            return;
        }

        onCreate(fileName.trim());
        setFileName("");
        setError("");
        onClose();
    };

    /**
     * Resets state and closes the popup.
     */
    const handleClose = () => {
        setFileName("");
        setError("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card border border-border rounded-lg p-6 w-full max-w-sm shadow-lg relative">
                <button
                    onClick={handleClose}
                    className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
                >
                    <X className="w-4 h-4" />
                </button>

                <h3 className="text-lg font-semibold mb-4">Create New File</h3>

                <div className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="filename" className="text-sm font-medium mb-1 block">
                            File Name
                        </label>
                        <input
                            id="filename"
                            type="text"
                            value={fileName}
                            onChange={(e) => {
                                setFileName(e.target.value);
                                setError(""); // Clear error on input change
                            }}
                            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                            placeholder="e.g., utils.js"
                            className="w-full bg-background border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                            autoFocus
                        />
                        {error && (
                            <p className="text-red-500 text-sm mt-2">{error}</p>
                        )}
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 text-sm font-medium hover:bg-muted rounded transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleCreate}
                            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                        >
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
