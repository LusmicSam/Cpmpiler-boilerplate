"use client";

import Editor, { OnMount } from "@monaco-editor/react";
import { useRef } from "react";



export default function EditorComponent({
    language,
    code,
    setCode,
    theme = "dark",
    headerContent,
    onEditorMount
}) {
    const editorRef = useRef(null);

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
        if (onEditorMount) onEditorMount(editor);

        // Define custom themes
        monaco.editor.defineTheme('custom-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [],
            colors: {
                'editor.background': '#0f172a',
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
            <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border-b border-border h-10 shrink-0">
                {headerContent ? (
                    headerContent
                ) : (
                    <span className="text-sm font-medium text-muted-foreground">Program</span>
                )}
                <div className="flex gap-2">
                    {/* Additional toolbar items can go here */}
                </div>
            </div>
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
                }}
            />
        </div>
    );
}
