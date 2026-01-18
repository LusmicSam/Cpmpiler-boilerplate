import { useState, useRef, useEffect } from "react";
import { X, RotateCcw } from "lucide-react";



export default function FileTabs({
    files,
    activeFileId,
    onTabClick,
    onDeleteFile,
    onRenameFile,
    onClear
}) {
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        if (editingId && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editingId]);

    const startEditing = (file) => {
        setEditingId(file.id);
        setEditName(file.name);
    };

    const saveEditing = () => {
        if (!editingId || !editName.trim()) {
            setEditingId(null);
            return;
        }

        const validExtensions = ['js', 'py', 'cpp', 'java', 'c'];

        // Check if file has an extension
        const parts = editName.trim().split('.');
        if (parts.length < 2) {
            alert("Please include a valid file extension (.js, .py, .cpp, .java, .c)");
            setEditingId(null); // Exit edit mode
            return;
        }

        const extension = parts[parts.length - 1].toLowerCase();
        if (!validExtensions.includes(extension)) {
            alert(`Invalid extension. Use: ${validExtensions.map(e => '.' + e).join(', ')}`);
            setEditingId(null); // Exit edit mode
            return;
        }

        onRenameFile(editingId, editName.trim());
        setEditingId(null);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            saveEditing();
        } else if (e.key === "Escape") {
            setEditingId(null);
        }
    };

    return (
        <div className="flex items-center justify-between w-full gap-2">
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar flex-1">
                {files.map((file) => (
                    <div
                        key={file.id}
                        onClick={() => onTabClick(file.id)}
                        onDoubleClick={() => startEditing(file)}
                        className={`
              group flex items-center gap-2 px-3 py-1.5 rounded-t-md text-sm font-medium cursor-pointer border-t border-x border-transparent min-w-[100px] justify-between
              ${activeFileId === file.id
                                ? "bg-background border-border text-foreground"
                                : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                            }
            `}
                    >
                        {editingId === file.id ? (
                            <input
                                ref={inputRef}
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                onBlur={saveEditing}
                                onKeyDown={handleKeyDown}
                                className="bg-transparent border-none outline-none w-full h-full p-0 text-sm"
                                onClick={(e) => e.stopPropagation()}
                            />
                        ) : (
                            <>
                                <span className="truncate max-w-[120px]">{file.name}</span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDeleteFile(file.id);
                                    }}
                                    className="opacity-0 group-hover:opacity-100 hover:bg-background/50 rounded p-0.5 transition-opacity"
                                    title="Close"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>

            <button
                onClick={onClear}
                className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-xs px-2 py-1 hover:bg-muted rounded transition-colors shrink-0"
                title="Clear Code"
            >
                <RotateCcw className="w-3 h-3" />
                Reset
            </button>
        </div>
    );
}
