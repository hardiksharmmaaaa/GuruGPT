import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Menu } from 'lucide-react';
import Header from './Header';
import QuestionForm from './QuestionForm';
import AnswerDisplay from './AnswerDisplay';
import HistorySidebar from './HistorySidebar';
import Profile from './Profile';
import ProfileModal from './ProfileModal';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

function MainApp({ user, onLogout, onUserUpdate }) {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    // Theme State
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'light';
        }
        return 'light';
    });

    // Form State
    const [formData, setFormData] = useState({
        subject: '',
        level: '',
        learning_style: '',
        language: '',
        question: ''
    });

    // App State
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem('questionHistory');
        return saved ? JSON.parse(saved) : [];
    });

    // Options State
    const [options, setOptions] = useState({
        subjects: [],
        levels: [],
        learning_styles: [],
        languages: []
    });

    // Theme Effect
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Fetch Options Effect
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [subjects, levels, learningStyles, languages] = await Promise.all([
                    axios.get(`${API_BASE_URL}/subjects`),
                    axios.get(`${API_BASE_URL}/levels`),
                    axios.get(`${API_BASE_URL}/learning-styles`),
                    axios.get(`${API_BASE_URL}/languages`)
                ]);

                setOptions({
                    subjects: subjects.data.subjects || [],
                    levels: levels.data.levels || [],
                    learning_styles: learningStyles.data.learning_styles || [],
                    languages: languages.data.languages || []
                });
            } catch (error) {
                console.error('Error fetching options:', error);
                // Fallback options
                setOptions({
                    subjects: ['Mathematics', 'Science', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'History', 'Literature'],
                    levels: ['Beginner', 'Elementary', 'Intermediate', 'Advanced', 'Expert'],
                    learning_styles: ['Visual', 'Auditory', 'Kinesthetic', 'Reading/Writing', 'Logical'],
                    languages: ['English', 'Spanish', 'French', 'German', 'Chinese', 'Other']
                });
            }
        };

        fetchOptions();
    }, []);

    // Save History Effect
    useEffect(() => {
        localStorage.setItem('questionHistory', JSON.stringify(history));
    }, [history]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.subject || !formData.level || !formData.learning_style || !formData.language || !formData.question) {
            alert('Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            const result = await axios.post(`${API_BASE_URL}/generate-answer`, formData);
            const newResponse = result.data;
            setResponse(newResponse);

            // Add to history
            const newHistoryItem = {
                ...formData,
                answer: newResponse.answer,
                timestamp: new Date().toISOString()
            };
            setHistory(prev => [newHistoryItem, ...prev].slice(0, 50)); // Keep last 50 items
        } catch (error) {
            console.error('Error generating answer:', error);
            alert('Error generating answer. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleHistorySelect = (item) => {
        setFormData({
            subject: item.subject,
            level: item.level,
            learning_style: item.learning_style,
            language: item.language,
            question: item.question
        });
        setResponse({
            answer: item.answer,
            subject: item.subject,
            level: item.level,
            learning_style: item.learning_style,
            language: item.language
        });
    };

    const clearHistory = () => {
        if (window.confirm('Are you sure you want to clear your history?')) {
            setHistory([]);
        }
    };

    const resetForm = () => {
        setFormData({
            subject: '',
            level: '',
            learning_style: '',
            language: '',
            question: ''
        });
        setResponse(null);
    };

    const handleEditProfile = () => {
        setIsProfileModalOpen(true);
    };

    const handleSaveProfile = (updatedUser) => {
        onUserUpdate(updatedUser);
        setIsProfileModalOpen(false);
    };


    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 flex flex-col">
            <div className="sticky top-0 z-50">
                <Header theme={theme} toggleTheme={toggleTheme} />
                {user && (
                    <div className="absolute right-4 top-4">
                        <Profile user={user} onLogout={onLogout} onEditProfile={handleEditProfile} />
                    </div>
                )}
            </div>

            <div className="flex flex-1 relative">
                {/* Mobile Sidebar Toggle */}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="lg:hidden fixed bottom-6 right-6 z-50 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
                >
                    <Menu className="w-6 h-6" />
                </button>

                <HistorySidebar
                    history={history}
                    onSelect={handleHistorySelect}
                    onClear={clearHistory}
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />

                <main className="flex-1 container mx-auto px-4 py-8 lg:px-8 max-w-5xl">
                    {!response ? (
                        <div className="max-w-3xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                                    Master Any Subject
                                </h2>
                                <p className="text-lg text-slate-600 dark:text-slate-400">
                                    Your AI-powered personal tutor that adapts to your learning style.
                                </p>
                            </div>
                            <QuestionForm
                                formData={formData}
                                handleInputChange={handleInputChange}
                                handleSubmit={handleSubmit}
                                loading={loading}
                                options={options}
                            />
                        </div>
                    ) : (
                        <AnswerDisplay response={response} onReset={resetForm} />
                    )}
                </main>
            </div>
            <ProfileModal
                user={user}
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
                onSave={handleSaveProfile}
            />
        </div>
    );
}

export default MainApp;
