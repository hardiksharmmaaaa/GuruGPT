import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import MermaidDiagram from '../MermaidDiagram';
import { Sparkles, Copy, Check, RotateCcw } from 'lucide-react';

const AnswerDisplay = ({ response, onReset }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(response.answer);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors duration-300">
            {/* Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center">
                <div className="flex items-center">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg mr-3">
                        <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">AI Tutor Response</h3>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={handleCopy}
                        className="p-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors"
                        title="Copy to clipboard"
                    >
                        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                    <button
                        onClick={onReset}
                        className="p-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors"
                        title="Ask another question"
                    >
                        <RotateCcw className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Metadata Tags */}
            <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-900/30 border-b border-slate-100 dark:border-slate-700/50">
                <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                        {response.subject}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        {response.level}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                        {response.learning_style}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                        {response.language}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <ReactMarkdown
                        components={{
                            code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '');
                                const language = match ? match[1] : '';

                                if (!inline && language === 'mermaid') {
                                    const diagramCode = String(children).replace(/\n$/, '');
                                    return (
                                        <div className="my-8 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-x-auto">
                                            <MermaidDiagram chart={diagramCode} id={`diagram-${Math.random().toString(36).substr(2, 9)}`} />
                                        </div>
                                    );
                                }

                                return !inline && match ? (
                                    <div className="relative group">
                                        <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-xs text-slate-400 font-mono">{language}</span>
                                        </div>
                                        <SyntaxHighlighter
                                            language={language}
                                            style={atomDark}
                                            className="rounded-xl !bg-slate-900 !p-6 !my-6 shadow-lg border border-slate-700"
                                            showLineNumbers={true}
                                            wrapLines={true}
                                            {...props}
                                        >
                                            {String(children).replace(/\n$/, '')}
                                        </SyntaxHighlighter>
                                    </div>
                                ) : (
                                    <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm font-mono text-pink-500 dark:text-pink-400" {...props}>
                                        {children}
                                    </code>
                                );
                            },
                            h1: ({ children }) => (
                                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-8 mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
                                    {children}
                                </h1>
                            ),
                            h2: ({ children }) => (
                                <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mt-8 mb-4 flex items-center">
                                    <span className="w-1.5 h-8 bg-indigo-500 rounded-full mr-3"></span>
                                    {children}
                                </h2>
                            ),
                            h3: ({ children }) => (
                                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-6 mb-3">
                                    {children}
                                </h3>
                            ),
                            ul: ({ children }) => (
                                <ul className="list-disc list-outside ml-6 space-y-2 my-4 text-slate-700 dark:text-slate-300">
                                    {children}
                                </ul>
                            ),
                            ol: ({ children }) => (
                                <ol className="list-decimal list-outside ml-6 space-y-2 my-4 text-slate-700 dark:text-slate-300">
                                    {children}
                                </ol>
                            ),
                            li: ({ children }) => (
                                <li className="pl-2">
                                    {children}
                                </li>
                            ),
                            p: ({ children }) => (
                                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4 text-lg">
                                    {children}
                                </p>
                            ),
                            blockquote: ({ children }) => (
                                <blockquote className="border-l-4 border-indigo-500 pl-6 italic bg-indigo-50 dark:bg-indigo-900/20 py-4 pr-4 my-6 rounded-r-xl text-slate-700 dark:text-slate-300">
                                    {children}
                                </blockquote>
                            ),
                            table: ({ children }) => (
                                <div className="overflow-x-auto my-6 rounded-xl border border-slate-200 dark:border-slate-700">
                                    <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                                        {children}
                                    </table>
                                </div>
                            ),
                            th: ({ children }) => (
                                <th className="px-6 py-3 bg-slate-50 dark:bg-slate-800 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                    {children}
                                </th>
                            ),
                            td: ({ children }) => (
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-slate-700">
                                    {children}
                                </td>
                            ),
                        }}
                    >
                        {response.answer}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

export default AnswerDisplay;
