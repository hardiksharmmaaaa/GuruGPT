import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGoogleLogin } from '@react-oauth/google';
import {
    ArrowRight, Sparkles, Brain, Zap, Shield, Globe,
    CheckCircle, MessageSquare, ChevronDown, Star, Users,
    Github, Twitter, Linkedin, Mail
} from 'lucide-react';

const LandingPage = ({ onSuccess, onError }) => {
    const login = useGoogleLogin({
        onSuccess: tokenResponse => onSuccess(tokenResponse),
        onError: () => onError(),
    });

    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    const faqs = [
        {
            question: "How does the AI tutoring work?",
            answer: "Our AI analyzes your questions and learning style to provide personalized explanations. It breaks down complex topics into digestible chunks, using analogies and examples that resonate with you."
        },
        {
            question: "Is it suitable for all subjects?",
            answer: "Yes! AI Tutor covers a vast range of subjects including Mathematics, Science, History, Literature, and Computer Science. It's particularly strong in STEM subjects where step-by-step logic is key."
        },
        {
            question: "Can I use it for exam preparation?",
            answer: "Absolutely. You can ask for practice problems, summaries of key concepts, and even simulate exam conditions. It's designed to be your 24/7 study companion."
        },
        {
            question: "Is my data private?",
            answer: "We take privacy seriously. Your learning history and personal data are encrypted and never shared with third parties. We use industry-standard security measures to protect your information."
        }
    ];

    const testimonials = [
        {
            name: "Sarah Chen",
            role: "Computer Science Student",
            content: "The way it explains algorithms is mind-blowing. It's like having a professor available at 3 AM.",
            avatar: "SC"
        },
        {
            name: "Marcus Rodriguez",
            role: "High School Junior",
            content: "I went from failing Physics to getting an A. The step-by-step breakdowns really helped me understand the 'why'.",
            avatar: "MR"
        },
        {
            name: "Emily Watson",
            role: "Lifelong Learner",
            content: "I'm learning French and the conversational practice is fantastic. It corrects me gently and explains grammar rules clearly.",
            avatar: "EW"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative font-sans selection:bg-indigo-500/30">
            {/* Background Gradients */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
                <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-blue-500/10 rounded-full blur-[100px]" />
            </div>

            {/* Navigation */}
            <nav className="relative z-50 container mx-auto px-6 py-6 flex justify-between items-center backdrop-blur-sm sticky top-0 border-b border-white/5">
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg shadow-lg shadow-indigo-500/20">
                        <Brain className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                        AI Tutor
                    </span>
                </div>
                <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
                    <button onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Features</button>
                    <button onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">How it Works</button>
                    <button onClick={() => document.getElementById('testimonials').scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Reviews</button>
                    <button onClick={() => document.getElementById('faq').scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">FAQ</button>
                </div>
                <button
                    onClick={() => login()}
                    className="px-6 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium backdrop-blur-md"
                >
                    Sign In
                </button>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 container mx-auto px-6 pt-20 pb-32 text-center">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl mx-auto"
                >
                    <motion.div variants={itemVariants} className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-900/30 border border-indigo-500/30 text-indigo-300 text-sm font-medium backdrop-blur-md">
                        <Sparkles className="w-4 h-4" />
                        <span>Powered by Advanced Gemini AI</span>
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight">
                        Master Any Subject with <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 animate-gradient-x">
                            Intelligent Tutoring
                        </span>
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Experience personalized learning that adapts to your unique style.
                        From complex physics to language arts, get instant, tailored explanations that stick.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => login()}
                            className="group relative px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all duration-300 w-full sm:w-auto"
                        >
                            <span className="flex items-center justify-center gap-2">
                                Get Started Free
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>
                        <button
                            onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
                            className="px-8 py-4 rounded-full border border-slate-700 hover:bg-slate-800/50 transition-colors text-lg font-medium w-full sm:w-auto backdrop-blur-sm"
                        >
                            See How It Works
                        </button>
                    </motion.div>
                </motion.div>

                {/* Floating UI Elements Animation */}
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1, type: "spring" }}
                    className="mt-24 relative max-w-5xl mx-auto"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-20" />
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-2xl transform rotate-x-12 perspective-1000 ring-1 ring-white/10">
                        <div className="flex items-center gap-4 mb-6 border-b border-slate-800 pb-4">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            </div>
                            <div className="h-6 w-64 bg-slate-800/50 rounded-full" />
                        </div>
                        <div className="space-y-6 text-left p-2">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex-shrink-0 shadow-lg" />
                                <div className="bg-slate-800 rounded-2xl rounded-tl-none p-5 max-w-lg shadow-md">
                                    <p className="text-slate-300">Explain quantum entanglement like I'm 5 years old.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 flex-row-reverse">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex-shrink-0 flex items-center justify-center shadow-lg">
                                    <Brain className="w-5 h-5 text-white" />
                                </div>
                                <div className="bg-indigo-900/20 border border-indigo-500/20 rounded-2xl rounded-tr-none p-5 max-w-2xl shadow-md backdrop-blur-sm">
                                    <p className="text-slate-300 leading-relaxed">Imagine you have two magic dice. No matter how far apart they are—even if one is on Earth and the other is on Mars—if you roll a 6 on one, the other one will instantly show a 6 too! They are "best friends" that always match, instantly.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>

            {/* Features Section */}
            <section id="features" className="relative z-10 py-32 bg-slate-900/30 border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Choose AI Tutor?</h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">Everything you need to accelerate your learning journey, powered by state-of-the-art technology.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Zap className="w-8 h-8 text-yellow-400" />,
                                title: "Instant Answers",
                                desc: "Get detailed explanations in seconds, tailored to your specific learning level. No more searching through endless forums."
                            },
                            {
                                icon: <Globe className="w-8 h-8 text-blue-400" />,
                                title: "Multi-Language Support",
                                desc: "Learn in your preferred language with support for over 10+ global languages. Break down language barriers effortlessly."
                            },
                            {
                                icon: <Shield className="w-8 h-8 text-green-400" />,
                                title: "Secure & Private",
                                desc: "Your learning history is private. Secure authentication via Google ensures your data stays yours alone."
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: index * 0.2 }}
                                className="p-8 rounded-3xl bg-slate-800/20 border border-slate-700/50 hover:border-indigo-500/50 hover:bg-slate-800/40 transition-all duration-300 group"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-slate-700/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="relative z-10 py-32">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">How It Works</h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">Three simple steps to master any subject.</p>
                    </div>
                    <div className="relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent -translate-y-1/2 z-0" />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                            {[
                                {
                                    step: "01",
                                    title: "Ask a Question",
                                    desc: "Type your question or paste a problem you're stuck on. Be as specific or general as you like."
                                },
                                {
                                    step: "02",
                                    title: "AI Analyzes",
                                    desc: "Our advanced AI breaks down the concept, identifies key components, and formulates a clear explanation."
                                },
                                {
                                    step: "03",
                                    title: "You Learn",
                                    desc: "Receive a tailored answer with examples. Ask follow-up questions to deepen your understanding."
                                }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                    className="relative bg-slate-950 p-8 rounded-3xl border border-slate-800 text-center hover:border-indigo-500/30 transition-colors"
                                >
                                    <div className="w-16 h-16 mx-auto bg-slate-900 rounded-full border border-slate-700 flex items-center justify-center text-2xl font-bold text-indigo-400 mb-6 shadow-[0_0_20px_-5px_rgba(99,102,241,0.3)]">
                                        {item.step}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                                    <p className="text-slate-400">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="relative z-10 py-32 bg-slate-900/30 border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Loved by Learners</h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">Join thousands of students and professionals who are learning smarter.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="bg-slate-800/20 p-8 rounded-3xl border border-slate-700/50 backdrop-blur-sm"
                            >
                                <div className="flex items-center gap-1 mb-6 text-yellow-400">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                                </div>
                                <p className="text-slate-300 mb-8 text-lg italic">"{testimonial.content}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="font-bold text-white">{testimonial.name}</div>
                                        <div className="text-sm text-slate-400">{testimonial.role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="relative z-10 py-32">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h2>
                        <p className="text-slate-400 text-lg">Got questions? We've got answers.</p>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="border border-slate-800 rounded-2xl bg-slate-900/50 overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                                    className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-slate-800/50 transition-colors"
                                >
                                    <span className="text-lg font-semibold text-slate-200">{faq.question}</span>
                                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {openFaqIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-8 pb-6 text-slate-400 leading-relaxed border-t border-slate-800/50 pt-4">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 bg-slate-950 border-t border-slate-800 pt-20 pb-10">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center space-x-2 mb-6">
                                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg">
                                    <Brain className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                                    AI Tutor
                                </span>
                            </div>
                            <p className="text-slate-400 max-w-sm mb-8">
                                Empowering students and professionals with instant, personalized AI tutoring. Master any subject, anytime, anywhere.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all">
                                    <Twitter className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all">
                                    <Github className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-white mb-6">Product</h4>
                            <ul className="space-y-4 text-slate-400">
                                <li><a href="#features" className="hover:text-indigo-400 transition-colors">Features</a></li>
                                <li><a href="#how-it-works" className="hover:text-indigo-400 transition-colors">How it Works</a></li>
                                <li><a href="#testimonials" className="hover:text-indigo-400 transition-colors">Testimonials</a></li>
                                <li><a href="#faq" className="hover:text-indigo-400 transition-colors">FAQ</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-white mb-6">Company</h4>
                            <ul className="space-y-4 text-slate-400">
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Contact</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-slate-500 text-sm">
                            © {new Date().getFullYear()} AI Tutor. All rights reserved.
                        </p>
                        <div className="flex gap-8 text-sm text-slate-500">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
