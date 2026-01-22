
import { Terminal, Loader2, Keyboard, Plus, X, Play } from "lucide-react";

/**
 * OutputPanel Component
 * 
 * Displays the Test Cases (Inputs) and Execution Results.
 * Supports multiple LeetCode-style test cases.
 * 
 * @component
 * @param {Object} props
 * @param {Array<{id: number, input: string, output: string, status: string}>} props.testCases - Array of test case objects.
 * @param {function(Array): void} props.setTestCases - Callback to update test cases.
 * @param {number} props.activeTestCaseId - ID of the currently selected test case.
 * @param {function(number): void} props.setActiveTestCaseId - Callback to switch test cases.
 * @param {boolean} props.isLoading - Global loading state.
 * @param {function(string): void} props.onRun - Callback to run specific or all test cases.
 */
export default function OutputPanel({
    testCases,
    setTestCases,
    activeTestCaseId,
    setActiveTestCaseId,
    isLoading,
    onRun
}) {
    const activeTestCase = testCases.find(tc => tc.id === activeTestCaseId) || testCases[0];

    const handleAddTestCase = () => {
        const newId = Math.max(...testCases.map(tc => tc.id), 0) + 1;
        setTestCases([...testCases, { id: newId, input: "", output: null, status: "pending" }]);
        setActiveTestCaseId(newId);
    };

    const handleRemoveTestCase = (e, id) => {
        e.stopPropagation();
        if (testCases.length <= 1) return;

        const newCases = testCases.filter(tc => tc.id !== id);
        setTestCases(newCases);

        if (activeTestCaseId === id) {
            setActiveTestCaseId(newCases[0].id);
        }
    };

    const handleInputChange = (val) => {
        setTestCases(testCases.map(tc =>
            tc.id === activeTestCaseId ? { ...tc, input: val, status: 'pending', output: null } : tc
        ));
    };

    return (
        <div className="h-full flex flex-col bg-card border border-border rounded-lg overflow-hidden">
            {/* Header / Tabs */}
            <div className="flex items-center justify-between border-b border-border bg-muted/30 px-2 py-1">
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                    {testCases.map((tc, index) => (
                        <button
                            key={tc.id}
                            onClick={() => setActiveTestCaseId(tc.id)}
                            className={`
                                group flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all
                                ${activeTestCaseId === tc.id
                                    ? "bg-primary/10 text-primary border border-primary/20"
                                    : "text-muted-foreground hover:bg-muted"
                                }
                            `}
                        >
                            <span className={`w-2 h-2 rounded-full ${tc.status === 'success' ? 'bg-green-500' :
                                    tc.status === 'error' ? 'bg-red-500' :
                                        'bg-gray-400'
                                }`} />
                            Case {index + 1}
                            {testCases.length > 1 && (
                                <X
                                    className="w-3 h-3 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity"
                                    onClick={(e) => handleRemoveTestCase(e, tc.id)}
                                />
                            )}
                        </button>
                    ))}
                    <button
                        onClick={handleAddTestCase}
                        className="p-1 hover:bg-muted rounded-md text-muted-foreground transition-colors"
                        title="Add Test Case"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-4 overflow-auto font-mono text-sm bg-card flex flex-col gap-4">

                {/* Input Section */}
                <div className="flex flex-col gap-2 min-h-[120px]">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Input</span>
                    <textarea
                        value={activeTestCase?.input || ""}
                        onChange={(e) => handleInputChange(e.target.value)}
                        placeholder="Enter input..."
                        className="w-full h-full min-h-[100px] p-3 rounded-md bg-muted/20 border border-border focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                        spellCheck={false}
                    />
                </div>

                {/* Output Section */}
                <div className="flex flex-col gap-2 flex-1 min-h-0">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                        Output
                        {isLoading && activeTestCaseId === activeTestCase?.id && (
                            <span className="flex items-center gap-1 text-primary">
                                <Loader2 className="w-3 h-3 animate-spin" /> Running...
                            </span>
                        )}
                    </span>

                    <div className={`
                        flex-1 p-3 rounded-md border border-border overflow-auto whitespace-pre-wrap
                        ${activeTestCase?.status === 'error' ? 'bg-red-500/5 border-red-500/20 text-red-500' : 'bg-muted/30'}
                    `}>
                        {activeTestCase?.output ? (
                            activeTestCase.output
                        ) : (
                            <span className="text-muted-foreground italic opacity-50">
                                Run code to see output...
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
