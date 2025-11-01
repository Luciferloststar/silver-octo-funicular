import React, { useState, useRef, RefObject, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import ContentSection from './components/ContentSection';
import Footer from './components/Footer';
import Modal from './components/Modal';
import { MOCK_STORIES, MOCK_DOCS, MOCK_ARTICLES, MOCK_COMMENTS, SAGAR_SAHU_ADMIN } from './constants';
import { User, Comment, ContentItem, ContentType } from './types';
import { SoundOnIcon, SoundOffIcon } from './components/Icons';

// --- AuthForm Component (defined in App.tsx) ---
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

// --- AdminDashboard Component (defined in App.tsx) ---
const AdminDashboard: React.FC<{onClose: () => void; onAddContent: (item: ContentItem) => void;}> = ({onClose, onAddContent}) => {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [tags, setTags] = useState('');
    const [type, setType] = useState<ContentType>(ContentType.Story);

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
        onClose();
    };

    return (
         <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
             <div>
                <label className="text-sm font-medium text-gray-400">Content Type</label>
                <select value={type} onChange={(e) => setType(e.target.value as ContentType)} className="w-full mt-1 p-3 bg-white/5 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:outline-none">
                    <option value={ContentType.Story}>Story</option>
                    <option value={ContentType.Documentary}>Documentary</option>
                    <option value={ContentType.Article}>Article</option>
                </select>
            </div>
            <div>
                <label className="text-sm font-medium text-gray-400">Title</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full mt-1 p-3 bg-white/5 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:outline-none" />
            </div>
             <div>
                <label className="text-sm font-medium text-gray-400">Summary</label>
                <textarea rows={4} value={summary} onChange={e => setSummary(e.target.value)} required className="w-full mt-1 p-3 bg-white/5 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:outline-none" />
            </div>
             <div>
                <label className="text-sm font-medium text-gray-400">Thumbnail Image</label>
                <input type="file" onChange={handleImageChange} required accept="image/*" className="w-full mt-1 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold/20 file:text-gold hover:file:bg-gold/30 file:cursor-pointer"/>
                {coverImage && <img src={coverImage} alt="Preview" className="mt-2 rounded-lg max-h-40 w-full object-cover"/>}
            </div>
             <div>
                <label className="text-sm font-medium text-gray-400">Tags (comma-separated)</label>
                <input type="text" value={tags} onChange={e => setTags(e.target.value)} className="w-full mt-1 p-3 bg-white/5 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:outline-none" />
            </div>
            <button type="submit" className="w-full py-3 bg-gold text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors">
                Upload Content
            </button>
        </form>
    );
};

// --- CommunitySection Component (defined in App.tsx) ---
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

// --- AudioToggle Component (defined in App.tsx) ---
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

    const audioRef = useRef<HTMLAudioElement>(null);

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

    // Save content to localStorage whenever it changes
    useEffect(() => {
        if (stories.length > 0) {
           localStorage.setItem('sagar_stories', JSON.stringify(stories));
        }
    }, [stories]);

    useEffect(() => {
         if (documentaries.length > 0) {
            localStorage.setItem('sagar_documentaries', JSON.stringify(documentaries));
         }
    }, [documentaries]);

    useEffect(() => {
        if (articles.length > 0) {
            localStorage.setItem('sagar_articles', JSON.stringify(articles));
        }
    }, [articles]);
    
    // FIX: Changed HTMLElement to HTMLDivElement for refs attached to div elements.
    const sectionRefs = {
        home: useRef<HTMLDivElement>(null),
        stories: useRef<HTMLDivElement>(null),
        documentaries: useRef<HTMLDivElement>(null),
        articles: useRef<HTMLDivElement>(null),
        about: useRef<HTMLDivElement>(null),
        contact: useRef<HTMLDivElement>(null),
    };

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
                <div ref={sectionRefs.home}><HeroSlider /></div>
                <div ref={sectionRefs.stories}><ContentSection id="stories" title="Featured Stories" items={stories} /></div>
                <div ref={sectionRefs.documentaries}><ContentSection id="documentaries" title="Documentaries" items={documentaries} /></div>
                <div ref={sectionRefs.articles}><ContentSection id="articles" title="Articles" items={articles} /></div>
                <CommunitySection isLoggedIn={isLoggedIn} comments={MOCK_COMMENTS} />
            </main>
            <div ref={sectionRefs.contact}><Footer /></div>
            
            <AudioToggle audioRef={audioRef} />

            <Modal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} title="Join the Story">
                <AuthForm onLogin={handleLogin} />
            </Modal>
            
            <Modal isOpen={adminModalOpen} onClose={() => setAdminModalOpen(false)} title="Content Dashboard">
                <AdminDashboard onClose={() => setAdminModalOpen(false)} onAddContent={handleAddContent} />
            </Modal>
        </div>
    );
}

export default App;
