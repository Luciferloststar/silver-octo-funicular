
import React, { useState, useRef, RefObject, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import ContentSection from './components/ContentSection';
import Footer from './components/Footer';
import Modal from './components/Modal';
import ContentDetailModal from './components/ContentDetailModal';
import { MOCK_STORIES, MOCK_DOCS, MOCK_ARTICLES, MOCK_COMMENTS, SAGAR_SAHU_ADMIN } from './constants';
import { User, Comment, ContentItem, ContentType } from './types';
import { SoundOnIcon, SoundOffIcon } from './components/Icons';

// --- AuthForm Component ---
const AuthForm: React.FC<{ onLogin: (user: User) => void }> = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Hardcoded credentials for Sagar Sahu
        if (email === SAGAR_SAHU_ADMIN.email && password === 'password123') {
            onLogin(SAGAR_SAHU_ADMIN);
            setError('');
        } else {
            setError('Invalid email or password.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <div>
                <label className="text-sm font-medium text-gray-400">Email</label>
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    className="w-full mt-1 p-3 bg-white/5 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:outline-none transition-all" />
            </div>
            <div>
                <label className="text-sm font-medium text-gray-400">Password</label>
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                    className="w-full mt-1 p-3 bg-white/5 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:outline-none transition-all" />
            </div>
            {!isLogin && (
                 <div>
                    <label className="text-sm font-medium text-gray-400">Confirm Password</label>
                    <input type="password" required className="w-full mt-1 p-3 bg-white/5 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:outline-none transition-all" />
                </div>
            )}
            <button type="submit" className="w-full py-3 bg-gold text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors">
                {isLogin ? 'Login' : 'Create Account'}
            </button>
            <p className="text-center text-sm text-gray-400">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button type="button" onClick={() => setIsLogin(!isLogin)} className="font-semibold text-gold hover:underline ml-1">
                    {isLogin ? 'Sign Up' : 'Login'}
                </button>
            </p>
        </form>
    );
};

// --- AdminDashboard Component ---
interface AdminDashboardProps {
    onClose: () => void;
    onAddContent: (item: ContentItem) => void;
    onRestoreAll: (data: { stories: ContentItem[], documentaries: ContentItem[], articles: ContentItem[] }) => void;
    allContent: { stories: ContentItem[], documentaries: ContentItem[], articles: ContentItem[] };
}
const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose, onAddContent, onRestoreAll, allContent }) => {
    // State for manual upload
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [tags, setTags] = useState('');
    const [type, setType] = useState<ContentType>(ContentType.Story);
    const restoreInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverImage(reader.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!coverImage) {
            alert("Please upload a thumbnail image.");
            return;
        }
        const newItem: ContentItem = {
            id: `${type.toLowerCase()}-${Date.now()}`,
            type: type,
            title: title,
            description: summary,
            coverImage: coverImage,
            tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
        };
        onAddContent(newItem);
        // Reset form
        setTitle('');
        setSummary('');
        setCoverImage(null);
        setTags('');
    };

    const handleBackup = () => {
        const dataStr = JSON.stringify(allContent, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `sagar_portfolio_backup_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleRestoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const result = event.target?.result;
                if (typeof result !== 'string') {
                    throw new Error("Failed to read file.");
                }
                const parsedData = JSON.parse(result);
                if (Array.isArray(parsedData.stories) && Array.isArray(parsedData.documentaries) && Array.isArray(parsedData.articles)) {
                    if (window.confirm("Are you sure you want to restore? This will overwrite all current content.")) {
                        onRestoreAll(parsedData);
                        alert("Content restored successfully!");
                        onClose();
                    }
                } else {
                    throw new Error("Invalid backup file format.");
                }
            } catch (error) {
                console.error("Restore failed:", error);
                alert(`Failed to restore content. Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
            } finally {
                if (restoreInputRef.current) {
                    restoreInputRef.current.value = '';
                }
            }
        };
        reader.readAsText(file);
    };

    return (
         <div className="max-h-[80vh] flex flex-col">
            <div className="flex border-b border-gold/20 mb-6 pb-2 justify-end">
                 <div className="flex space-x-2">
                    <button type="button" onClick={handleBackup} className="py-1 px-3 bg-gold/20 text-gold font-semibold rounded-lg hover:bg-gold hover:text-black transition-colors text-xs">Backup</button>
                    <button type="button" onClick={() => restoreInputRef.current?.click()} className="py-1 px-3 border border-gold text-gold font-semibold rounded-lg hover:bg-gold hover:text-black transition-colors text-xs">Restore</button>
                    <input type="file" ref={restoreInputRef} onChange={handleRestoreChange} accept="application/json" className="hidden" />
                </div>
            </div>
            
            <div className="overflow-y-auto pr-2 flex-grow">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <select value={type} onChange={(e) => setType(e.target.value as ContentType)} className="w-full mt-1 p-3 bg-white/5 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:outline-none"><option value={ContentType.Story}>Story</option><option value={ContentType.Documentary}>Documentary</option><option value={ContentType.Article}>Article</option></select>
                    <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required className="w-full p-3 bg-white/5 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:outline-none" />
                    <textarea placeholder="Summary" rows={4} value={summary} onChange={e => setSummary(e.target.value)} required className="w-full p-3 bg-white/5 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:outline-none" />
                    <input type="file" onChange={handleImageChange} required accept="image/*" className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold/20 file:text-gold hover:file:bg-gold/30 file:cursor-pointer"/>
                    {coverImage && <img src={coverImage} alt="Preview" className="mt-2 rounded-lg max-h-40 w-full object-cover"/>}
                    <input placeholder="Tags (comma-separated)" type="text" value={tags} onChange={e => setTags(e.target.value)} className="w-full p-3 bg-white/5 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:outline-none" />
                    <button type="submit" className="w-full py-3 bg-gold text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors">Upload Content</button>
                </form>
            </div>
        </div>
    );
};


// --- CommunitySection Component ---
const CommunitySection: React.FC<{isLoggedIn: boolean; comments: Comment[]}> = ({isLoggedIn, comments}) => {
    return (
        <section className="py-20 bg-surface">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <h2 className="text-4xl md:text-5xl font-bold font-serif text-center mb-12 text-gold">Reader Community</h2>
                 <div className="max-w-3xl mx-auto space-y-6">
                    {comments.map(comment => (
                        <div key={comment.id} className="glassmorphism p-4 rounded-lg flex space-x-4">
                            <img src={comment.user.avatar} alt={comment.user.username} className="w-12 h-12 rounded-full border-2 border-gold/50" />
                            <div>
                                <p className="font-bold text-gold">{comment.user.username} <span className="text-xs text-gray-500 font-normal ml-2">{comment.timestamp}</span></p>
                                <p className="text-gray-300">{comment.text}</p>
                            </div>
                        </div>
                    ))}
                    {isLoggedIn && (
                        <div className="pt-6">
                           <textarea placeholder="Share your thoughts..." rows={4} className="w-full p-3 bg-white/5 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:outline-none transition-all" />
                           <button className="mt-2 px-6 py-2 bg-gold text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors">Post Comment</button>
                        </div>
                    )}
                 </div>
            </div>
        </section>
    );
};

// --- AboutSection Component ---
const AboutSection: React.FC = () => (
    <section id="about" className="py-20 md:py-32 bg-surface">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl mx-auto"
            >
                <h2 className="text-4xl md:text-5xl font-bold font-serif mb-8 text-gold">
                    About The Storyteller
                </h2>
                <img 
                    src={SAGAR_SAHU_ADMIN.avatar} 
                    alt="Sagar Sahu" 
                    className="w-40 h-40 rounded-full mx-auto mb-8 border-4 border-gold shadow-lg"
                />
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                    Sagar Sahu is a visionary storyteller weaving narratives that transcend genre and reality. With a passion for exploring the depths of human nature against epic, cinematic backdrops, his work ranges from mind-bending cyberpunk thrillers to sprawling space operas and insightful documentaries on the future of technology.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                    Drawing inspiration from philosophy, science, and the timeless art of myth-making, Sagar crafts worlds that are both fantastical and deeply resonant. His goal is not just to entertain, but to challenge perspectives and ignite the imagination of his readers, inviting them on journeys that linger long after the final page is turned.
                </p>
            </motion.div>
        </div>
    </section>
);


// --- AudioToggle Component ---
const AudioToggle: React.FC<{audioRef: RefObject<HTMLAudioElement>}> = ({audioRef}) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const toggleSound = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(error => console.error("Audio play failed:", error));
            }
            setIsPlaying(!isPlaying);
        }
    }

    return (
        <button onClick={toggleSound} className="fixed bottom-5 right-5 z-50 p-3 rounded-full glassmorphism text-gold hover:text-white hover:bg-gold/20 transition-all">
            {isPlaying ? <SoundOnIcon /> : <SoundOffIcon />}
        </button>
    );
}

// --- App Component ---
function App() {
    const [stories, setStories] = useState<ContentItem[]>([]);
    const [documentaries, setDocumentaries] = useState<ContentItem[]>([]);
    const [articles, setArticles] = useState<ContentItem[]>([]);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [adminModalOpen, setAdminModalOpen] = useState(false);
    const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);

    const audioRef = useRef<HTMLAudioElement>(null);

    const homeRef = useRef<HTMLDivElement>(null);
    const storiesRef = useRef<HTMLDivElement>(null);
    const documentariesRef = useRef<HTMLDivElement>(null);
    const articlesRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);

    const sectionRefs = {
        home: homeRef,
        stories: storiesRef,
        documentaries: documentariesRef,
        articles: articlesRef,
        about: aboutRef,
        contact: contactRef,
    };

    // Load content from localStorage on initial render
    useEffect(() => {
        try {
            const savedStories = localStorage.getItem('sagar_stories');
            const savedDocs = localStorage.getItem('sagar_documentaries');
            const savedArticles = localStorage.getItem('sagar_articles');

            if (savedStories) setStories(JSON.parse(savedStories));
            else setStories(MOCK_STORIES);
            
            if (savedDocs) setDocumentaries(JSON.parse(savedDocs));
            else setDocumentaries(MOCK_DOCS);

            if (savedArticles) setArticles(JSON.parse(savedArticles));
            else setArticles(MOCK_ARTICLES);

        } catch (error) {
            console.error("Failed to parse content from localStorage", error);
            // Fallback to mock data if parsing fails
            setStories(MOCK_STORIES);
            setDocumentaries(MOCK_DOCS);
            setArticles(MOCK_ARTICLES);
        }
    }, []);

    // Connect audio ref to DOM element
    useEffect(() => {
        const audioElement = document.getElementById('ambient-sound') as HTMLAudioElement | null;
        if (audioElement) {
            audioRef.current = audioElement;
        }
    }, []);

    // Save content to localStorage whenever it changes
    useEffect(() => {
        try {
            if (stories.length > 0 || localStorage.getItem('sagar_stories')) {
               localStorage.setItem('sagar_stories', JSON.stringify(stories));
            }
        } catch (error) {
            console.error("Failed to save stories to localStorage", error);
        }
    }, [stories]);

    useEffect(() => {
        try {
             if (documentaries.length > 0 || localStorage.getItem('sagar_documentaries')) {
                localStorage.setItem('sagar_documentaries', JSON.stringify(documentaries));
             }
        } catch (error) {
            console.error("Failed to save documentaries to localStorage", error);
        }
    }, [documentaries]);

    useEffect(() => {
        try {
            if (articles.length > 0 || localStorage.getItem('sagar_articles')) {
                localStorage.setItem('sagar_articles', JSON.stringify(articles));
            }
        } catch (error) {
            console.error("Failed to save articles to localStorage", error);
        }
    }, [articles]);
    
    const handleScrollTo = (id: string) => {
        const ref = sectionRefs[id as keyof typeof sectionRefs];
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleLogin = (user: User) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
        setAuthModalOpen(false);
    };

    const handleAddContent = (item: ContentItem) => {
        switch (item.type) {
            case ContentType.Story:
                setStories(prev => [item, ...prev]);
                break;
            case ContentType.Documentary:
                setDocumentaries(prev => [item, ...prev]);
                break;
            case ContentType.Article:
                setArticles(prev => [item, ...prev]);
                break;
        }
    };
    
    const handleRestoreAll = (data: { stories: ContentItem[], documentaries: ContentItem[], articles: ContentItem[] }) => {
        setStories(data.stories || []);
        setDocumentaries(data.documentaries || []);
        setArticles(data.articles || []);
    };

    const handleDeleteContent = (id: string, type: ContentType) => {
        if (!window.confirm("Are you sure you want to delete this item permanently?")) {
            return;
        }

        switch (type) {
            case ContentType.Story:
                setStories(prev => prev.filter(item => item.id !== id));
                break;
            case ContentType.Documentary:
                setDocumentaries(prev => prev.filter(item => item.id !== id));
                break;
            case ContentType.Article:
                setArticles(prev => prev.filter(item => item.id !== id));
                break;
        }
    };

    const isAdmin = currentUser?.id === SAGAR_SAHU_ADMIN.id;

    return (
        <div className="bg-[#0a0a0a] min-h-screen relative">
             <div className="absolute inset-0 h-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,215,0,0.15),rgba(255,255,255,0))] opacity-50"></div>
            <Navbar 
                onScrollTo={handleScrollTo} 
                onAuthClick={() => setAuthModalOpen(true)}
                onAdminClick={() => setAdminModalOpen(true)}
                isLoggedIn={isLoggedIn}
                user={currentUser}
            />
            <main>
                <div ref={homeRef}><HeroSlider /></div>
                <div ref={storiesRef}><ContentSection id="stories" title="Featured Stories" items={stories} isAdmin={isAdmin} onDeleteContent={handleDeleteContent} onReadMore={setSelectedContent} /></div>
                <div ref={documentariesRef}><ContentSection id="documentaries" title="Documentaries" items={documentaries} isAdmin={isAdmin} onDeleteContent={handleDeleteContent} onReadMore={setSelectedContent} /></div>
                <div ref={articlesRef}><ContentSection id="articles" title="Articles" items={articles} isAdmin={isAdmin} onDeleteContent={handleDeleteContent} onReadMore={setSelectedContent} /></div>
                <CommunitySection isLoggedIn={isLoggedIn} comments={MOCK_COMMENTS} />
                <div ref={aboutRef}><AboutSection /></div>
            </main>
            <div ref={contactRef}><Footer /></div>
            
            <AudioToggle audioRef={audioRef} />

            <Modal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} title="Join the Story">
                <AuthForm onLogin={handleLogin} />
            </Modal>
            
            <Modal isOpen={adminModalOpen} onClose={() => setAdminModalOpen(false)} title="Content Dashboard" size="large">
                <AdminDashboard 
                    onClose={() => setAdminModalOpen(false)} 
                    onAddContent={handleAddContent}
                    onRestoreAll={handleRestoreAll}
                    allContent={{ stories, documentaries, articles }}
                />
            </Modal>
            
            <ContentDetailModal 
                isOpen={!!selectedContent} 
                onClose={() => setSelectedContent(null)} 
                item={selectedContent} 
            />
        </div>
    );
}

export default App;