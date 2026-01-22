"use client";

import Editor, { OnMount } from "@monaco-editor/react";
import { useRef } from "react";

/**
 * EditorComponent
 * 
 * Wrapper around the Monaco Editor.
 * customizable with themes, language, and content.
 * 
 * @component
 * @param {Object} props
 * @param {string} props.language - The programming language ID (e.g., 'javascript').
 * @param {string} props.code - The current code content.
 * @param {function(string): void} props.setCode - Callback to update code content.
 * @param {string} [props.theme='dark'] - Editor theme ('dark' or 'light').
 * @param {React.ReactNode} [props.headerContent] - Optional content to render in the header.
 * @param {function(Object): void} [props.onEditorMount] - Callback when editor mounts.
 */
export default function EditorComponent({
    language,
    code,
    setCode,
    theme = "dark",
    headerContent,
    onEditorMount
}) {
    const editorRef = useRef(null);

    /**
     * Handles editor mount event.
     * Configures custom themes and exposes the editor instance.
     * 
     * @param {Object} editor - The Monaco editor instance.
     * @param {Object} monaco - The Monaco API instance.
     */
    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
        if (onEditorMount) onEditorMount(editor);

        // Define custom themes
        monaco.editor.defineTheme('custom-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [],
            colors: {
                'editor.background': '#0f172a', // Matches Tailwind slate-900 or card bg
            }
        });

        monaco.editor.defineTheme('custom-light', {
            base: 'vs',
            inherit: true,
            rules: [],
            colors: {
                'editor.background': '#ffffff',
            }
        });

        // Set theme based on prop
        monaco.editor.setTheme(theme === 'dark' ? 'custom-dark' : 'custom-light');
    };

    return (
        <div className="h-full w-full overflow-hidden rounded-lg border border-border bg-card flex flex-col">
            {/* Editor Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border-b border-border h-10 shrink-0">
                {headerContent ? (
                    headerContent
                ) : (
                    <span className="text-sm font-medium text-muted-foreground">Program</span>
                )}
                {/* Placeholder for future toolbar items */}
                <div className="flex gap-2"></div>
            </div>

            {/* Monaco Editor Instance */}
            <Editor
                height="100%"
                language={language}
                value={code}
                onChange={(value) => setCode(value || "")}
                onMount={handleEditorDidMount}
                theme={theme === 'dark' ? 'custom-dark' : 'custom-light'}
                options={{
                    minimap: { enabled: true },
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 16, bottom: 16 },
                    formatOnType: true,
                    formatOnPaste: true,
                    fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
                }}
            />
        </div>
    );
}
