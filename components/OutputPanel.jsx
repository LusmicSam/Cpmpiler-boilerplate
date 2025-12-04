

import { Terminal, Loader2, Keyboard } from "lucide-react";



export default function OutputPanel({
    output,
    isLoading,
    stdin,
    setStdin,
    activeTab,
    onTabChange
}) {
    return (
        <div className="h-full flex flex-col bg-card border border-border rounded-lg overflow-hidden">
            <div className="flex items-center border-b border-border bg-muted/30">
                <button
                    onClick={() => onTabChange("input")}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors border-b-2 ${activeTab === "input"
                        ? "border-primary text-foreground bg-background"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                >
                    <Keyboard className="w-4 h-4" />
                    Input (Stdin)
                </button>
                <button
                    onClick={() => onTabChange("output")}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors border-b-2 ${activeTab === "output"
                        ? "border-primary text-foreground bg-background"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                >
                    <Terminal className="w-4 h-4" />
                    Output
                </button>

            </div>

            <div className="flex-1 p-4 overflow-auto font-mono text-sm relative bg-card">
                {activeTab === "output" ? (
                    isLoading ? (
                        <div className="flex items-center justify-center h-full text-muted-foreground gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Running code...
                        </div>
                    ) : output ? (
                        <pre className="whitespace-pre-wrap text-foreground">{output}</pre>
                    ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground italic">
                            Run your code to see output here
                        </div>
                    )
                ) : (
                    <textarea
                        value={stdin}
                        onChange={(e) => setStdin(e.target.value)}
                        placeholder="Enter input for your program here..."
                        className="w-full h-full bg-transparent border-none outline-none resize-none text-foreground placeholder:text-muted-foreground"
                        spellCheck={false}
                    />
                )}
            </div>
        </div>
    );
}
