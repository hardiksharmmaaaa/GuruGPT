import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import MermaidDiagram from './MermaidDiagram';
import { Brain, BookOpen, Users, Globe, MessageSquare, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';

function App() {
  const [formData, setFormData] = useState({
    subject: '',
    level: '',
    learning_style: '',
    language: '',
    question: ''
  });
  
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState({
    subjects: [],
    levels: [],
    learning_styles: [],
    languages: []
  });

  // Fetch options from backend
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [subjects, levels, learningStyles, languages] = await Promise.all([
          axios.get('http://localhost:8000/subjects'),
          axios.get('http://localhost:8000/levels'),
          axios.get('http://localhost:8000/learning-styles'),
          axios.get('http://localhost:8000/languages')
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.subject || !formData.level || !formData.learning_style || !formData.language || !formData.question) {
      alert('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    try {
      const result = await axios.post('http://localhost:8000/generate-answer', formData);
      setResponse(result.data);
    } catch (error) {
      console.error('Error generating answer:', error);
      alert('Error generating answer. Please try again.');
    } finally {
      setLoading(false);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="gradient-bg text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-10 h-10 mr-3" />
            <h1 className="text-4xl font-bold">AI Tutor</h1>
          </div>
          <p className="text-center text-xl opacity-90">Your Personal Learning Assistant</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card text-center">
              <BookOpen className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800">Multiple Subjects</h3>
              <p className="text-sm text-gray-600">Learn across various disciplines</p>
            </div>
            <div className="card text-center">
              <Users className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800">Adaptive Learning</h3>
              <p className="text-sm text-gray-600">Tailored to your level & style</p>
            </div>
            <div className="card text-center">
              <Globe className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800">Multi-Language</h3>
              <p className="text-sm text-gray-600">Learn in your preferred language</p>
            </div>
            <div className="card text-center">
              <Sparkles className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800">AI-Powered</h3>
              <p className="text-sm text-gray-600">Intelligent tutoring system</p>
            </div>
          </div>

          {/* Main Form */}
          <div className="card">
            <div className="flex items-center mb-6">
              <MessageSquare className="w-6 h-6 text-primary-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-800">Ask Your Question</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Subject Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <BookOpen className="w-4 h-4 inline mr-1" />
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select a subject...</option>
                    {options.subjects.map((subject, index) => (
                      <option key={index} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                {/* Level Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <CheckCircle className="w-4 h-4 inline mr-1" />
                    Level
                  </label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select your level...</option>
                    {options.levels.map((level, index) => (
                      <option key={index} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                {/* Learning Style Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4 inline mr-1" />
                    Learning Style
                  </label>
                  <select
                    name="learning_style"
                    value={formData.learning_style}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select learning style...</option>
                    {options.learning_styles.map((style, index) => (
                      <option key={index} value={style}>{style}</option>
                    ))}
                  </select>
                </div>

                {/* Language Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Globe className="w-4 h-4 inline mr-1" />
                    Language
                  </label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    className="form-select"
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-1" />
                  Your Question
                </label>
                <textarea
                  name="question"
                  value={formData.question}
                  onChange={handleInputChange}
                  className="form-input resize-none"
                  rows="4"
                  placeholder="Ask your question here..."
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center space-x-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex items-center px-8 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
                
                {response && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn-secondary px-6 py-3 text-lg"
                  >
                    Ask Another Question
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Response Display */}
          {response && (
            <div className="card mt-8">
              <div className="flex items-center mb-4">
                <Sparkles className="w-6 h-6 text-primary-600 mr-2" />
                <h3 className="text-xl font-bold text-gray-800">AI Tutor Response</h3>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  <div><strong>Subject:</strong> {response.subject}</div>
                  <div><strong>Level:</strong> {response.level}</div>
                  <div><strong>Style:</strong> {response.learning_style}</div>
                  <div><strong>Language:</strong> {response.language}</div>
                </div>
              </div>
              
              <div className="prose prose-lg max-w-none">
                <div className="bg-white border-l-4 border-primary-500 p-6 rounded-r-lg">
                  <ReactMarkdown
                    className="text-gray-800 leading-relaxed"
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        const language = match ? match[1] : '';
                        
                        // Handle Mermaid diagrams
                        if (!inline && language === 'mermaid') {
                          const diagramCode = String(children).replace(/\n$/, '');
                          return <MermaidDiagram chart={diagramCode} id={`diagram-${Math.random().toString(36).substr(2, 9)}`} />;
                        }
                        
                        // Handle regular code blocks
                        return !inline && match ? (
                          <SyntaxHighlighter
                            language={language}
                            PreTag="div"
                            className="rounded-lg my-4 shadow-lg"
                            customStyle={{
                              background: '#0f172a',
                              padding: '1.25rem',
                              borderRadius: '0.75rem',
                              fontSize: '14px',
                              lineHeight: '1.6',
                              border: '1px solid #334155',
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                            }}
                            codeTagProps={{
                              style: {
                                background: 'transparent',
                                fontFamily: 'Monaco, Menlo, "Ubuntu Mono", Consolas, "source-code-pro", monospace'
                              }
                            }}
                            {...props}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        ) : (
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono" {...props}>
                            {children}
                          </code>
                        );
                      },
                      h1: ({ children }) => (
                        <h1 className="text-2xl font-bold text-gray-900 mt-6 mb-4 border-b-2 border-primary-200 pb-2">
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-xl font-semibold text-gray-800 mt-5 mb-3">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-lg font-medium text-gray-700 mt-4 mb-2">
                          {children}
                        </h3>
                      ),
                      ul: ({ children }) => (
                        <ul className="list-disc list-inside space-y-1 my-3">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal list-inside space-y-1 my-3">
                          {children}
                        </ol>
                      ),
                      li: ({ children }) => (
                        <li className="text-gray-700 leading-relaxed">
                          {children}
                        </li>
                      ),
                      p: ({ children }) => (
                        <p className="text-gray-700 leading-relaxed mb-3">
                          {children}
                        </p>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-primary-300 pl-4 italic bg-primary-50 py-2 my-4 rounded-r">
                          {children}
                        </blockquote>
                      ),
                    }}
                  >
                    {response.answer}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 AI Tutor. Empowering learners with intelligent tutoring.</p>
        </div>
      </footer>
    </div>
  );
}

export default App; 