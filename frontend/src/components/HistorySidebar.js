import React from 'react';
import { History, MessageSquare, Trash2, X } from 'lucide-react';

const HistorySidebar = ({ history, onSelect, onClear, isOpen, onClose }) => {
    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div className={`
        fixed top-16 bottom-0 left-0 w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 
        transform transition-transform duration-300 ease-in-out z-40 flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:h-[calc(100vh-4rem)]
      `}>
                <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center text-slate-800 dark:text-white font-semibold">
                        <History className="w-5 h-5 mr-2 text-indigo-500" />
                        Recent Questions
                    </div>
                    <div className="flex items-center">
                        {history.length > 0 && (
                            <button
                                onClick={onClear}
                                className="p-1.5 text-slate-400 hover:text-red-500 transition-colors mr-1"
                                title="Clear history"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 lg:hidden"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {history.length === 0 ? (
                        <div className="text-center text-slate-400 dark:text-slate-500 py-8">
                            <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-20" />
                            <p className="text-sm">No questions yet</p>
                        </div>
                    ) : (
                        history.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    onSelect(item);
                                    if (window.innerWidth < 1024) onClose();
                                }}
                                className="w-full text-left p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-200 group"
                            >
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-200 line-clamp-2 mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                                    {item.question}
                                </p>
                                <div className="flex items-center text-xs text-slate-400 dark:text-slate-500 space-x-2">
                                    <span>{item.subject}</span>
                                    <span>•</span>
                                    <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                                </div>
                            </button>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default HistorySidebar;
