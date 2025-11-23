import React from 'react';
import { BookOpen, CheckCircle, Users, Globe, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';

const QuestionForm = ({ formData, handleInputChange, handleSubmit, loading, options }) => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6 transition-colors duration-300">
            <div className="flex items-center mb-6">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg mr-3">
                    <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">Ask Your Question</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Subject Selection */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            <div className="flex items-center mb-1">
                                <BookOpen className="w-4 h-4 mr-1.5 text-indigo-500" />
                                Subject
                            </div>
                        </label>
                        <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 text-slate-700 dark:text-slate-200"
                            required
                        >
                            <option value="">Select a subject...</option>
                            {options.subjects.map((subject, index) => (
                                <option key={index} value={subject}>{subject}</option>
                            ))}
                        </select>
                    </div>

                    {/* Level Selection */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            <div className="flex items-center mb-1">
                                <CheckCircle className="w-4 h-4 mr-1.5 text-emerald-500" />
                                Level
                            </div>
                        </label>
                        <select
                            name="level"
                            value={formData.level}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 text-slate-700 dark:text-slate-200"
                            required
                        >
                            <option value="">Select your level...</option>
                            {options.levels.map((level, index) => (
                                <option key={index} value={level}>{level}</option>
                            ))}
                        </select>
                    </div>

                    {/* Learning Style Selection */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            <div className="flex items-center mb-1">
                                <Users className="w-4 h-4 mr-1.5 text-purple-500" />
                                Learning Style
                            </div>
                        </label>
                        <select
                            name="learning_style"
                            value={formData.learning_style}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 text-slate-700 dark:text-slate-200"
                            required
                        >
                            <option value="">Select learning style...</option>
                            {options.learning_styles.map((style, index) => (
                                <option key={index} value={style}>{style}</option>
                            ))}
                        </select>
                    </div>

                    {/* Language Selection */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            <div className="flex items-center mb-1">
                                <Globe className="w-4 h-4 mr-1.5 text-blue-500" />
                                Language
                            </div>
                        </label>
                        <select
                            name="language"
                            value={formData.language}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 text-slate-700 dark:text-slate-200"
                            required
                        >
                            <option value="">Select language...</option>
                            {options.languages.map((language, index) => (
                                <option key={index} value={language}>{language}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Question Input */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        <div className="flex items-center mb-1">
                            <Sparkles className="w-4 h-4 mr-1.5 text-amber-500" />
                            Your Question
                        </div>
                    </label>
                    <textarea
                        name="question"
                        value={formData.question}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 text-slate-700 dark:text-slate-200 resize-none"
                        rows="4"
                        placeholder="What would you like to learn today?"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                >
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Generating Answer...
                        </>
                    ) : (
                        <>
                            Get Answer
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default QuestionForm;
