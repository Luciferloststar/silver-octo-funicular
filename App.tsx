import React, { useState, useRef, RefObject, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import ContentSection from './components/ContentSection';
import Footer from './components/Footer';
import Modal from './components/Modal';
import ContentDetailModal from './components/ContentDetailModal';
import AboutSection from './components/AboutSection';
import CommunitySection from './components/CommunitySection';
import { SAGAR_SAHU_ADMIN } from './constants';
import { User, Comment, ContentItem, ContentType } from './types';
import { SoundOnIcon, SoundOffIcon } from './components/Icons';

// Helper function to safely set item in localStorage
const safeSetLocalStorage = (key: string, value: string) => {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        if (e instanceof DOMException && (
            e.name === 'QuotaExceededError' ||
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED')) 
        {
            console.error(`Error: Local storage quota exceeded for key "${key}".`);
            alert("Upload failed: Your browser's storage is full. Please back up your data from the dashboard and clear some content to make space.");
        } else {
            console.error(`Failed to set localStorage for key "${key}".`, e);
            alert("An unexpected error occurred while saving data. Please check the console for details.");
        }
    }
};

// --- AuthForm Component ---
const AuthForm: React.FC<{ onLogin: (profileId: string, password: string) => void, defaultId: string, onForgotPassword: () => void }> = ({ onLogin, defaultId, onForgotPassword }) => {
    const [profileId, setProfileId] = useState(defaultId);
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(profileId, password);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="text-sm font-medium text-gray-400">Profile ID</label>
                <input 
                    type="text" 
                    value={profileId}
                    onChange={(e) => setProfileId(e.target.value)}
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
            <button type="submit" className="w-full py-3 bg-gold text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors">
                Login
            </button>
             <div className="text-center pt-2">
                <button type="button" onClick={onForgotPassword} className="text-sm text-gold hover:underline">
                    Forgot Password?
                </button>
            </div>
        </form>
    );
};

// --- ReaderAuthForm Component ---
const ReaderAuthForm: React.FC<{ onLogin: (email: string) => void }> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            onLogin(email.trim());
        } else {
            alert("Please enter a valid email address.");
        }
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-gray-300 text-center">Enter your email to read the full content and join the community.</p>
            <div>
                <label className="text-sm font-medium text-gray-400">Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" className="w-full mt-1 p-3 bg-white/5 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:outline-none transition-all" />
            </div>
            <button type="submit" className="w-full py-3 bg-gold text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors">
                Continue
            </button>
        </form>
    );
};


// --- ForgotPasswordForm Component ---
const ForgotPasswordForm: React.FC<{ onReset: (profileId: string, email: string) => boolean; onClose: () => void; defaultId: string; }> = ({ onReset, onClose, defaultId }) => {
    const [profileId, setProfileId] = useState(defaultId);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        const success = onReset(profileId, email);
        if (success) {
            setSuccess('Password has been reset to the default. Please log in with the default password and change it immediately.');
            setTimeout(onClose, 4000);
        } else {
            setError('The provided Profile ID or Notification Email is incorrect.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
            {!success && (
                <>
                    <p className="text-sm text-gray-400">Enter your profile ID and notification email to reset your password to the default.</p>
                    <div>
                        <label className="text-sm font-medium text-gray-400">Profile ID</label>
                        <input
                            type="text"
                            value={profileId}
                            onChange={(e) => setProfileId(e.target.value)}
                            required
                            className="w-full mt-1 p-3 bg-white/5 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:outline-none transition-all" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-400">Notification Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full mt-1 p-3 bg-white/5 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:outline-none transition-all" />
                    </div>
                    <button type="submit" className="w-full py-3 bg-gold text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors">
                        Reset Password
                    </button>
                </>
            )}
        </form>
    );
};


// --- ChangePasswordForm Component ---
const ChangePasswordForm: React.FC<{ onPasswordChange: (oldPass: string, newPass: string) => boolean; onClose: () => void; notificationEmail: string; }> = ({ onPasswordChange, onClose, notificationEmail }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (newPassword !== confirmPassword) {
            setError('New passwords do not match.');
            return;
        }
        if (newPassword.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }
        const changed = onPasswordChange(oldPassword, newPassword);
        if (changed) {
            setSuccess(`Password changed successfully! A confirmation has been sent to ${notificationEmail}.`);
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setTimeout(onClose, 3000);
        } else {
            setError('Current password is incorrect.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
            <input type="password" placeholder="Current Password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required className="w-full p-3 bg-white/5 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:outline-none" />
            <input type="password" placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required className="w-full p-3 bg-white/5 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:outline-none" />
            <input type="password" placeholder="Confirm New Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="w-full p-3 bg-white/5 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:outline-none" />
            <button type="submit" className="w-full py-3 bg-gold text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors">Update Password</button>
        </form>
    );
};

// --- ProfileSettingsForm ---
const ProfileSettingsForm: React.FC<{ user: User; onUpdate: (user: User) => void; onClose: () => void; }> = ({ user, onUpdate, onClose }) => {
    const [formData, setFormData] = useState(user);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, avatar: reader.result as string }));
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate(formData);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-4">
                 <img src={formData.avatar} alt="Avatar Preview" className="w-20 h-20 rounded-full border-2 border-gold object-cover"/>
                 <div>
                    <label className="text-sm font-medium text-gray-400">Update Profile Picture</label>
                     <input type="file" onChange={handleAvatarChange} accept="image/*" className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold/20 file:text-gold hover:file:bg-gold/30 file:cursor-pointer"/>
                 </div>
            </div>
             <div>
                <label className="text-sm font-medium text-gray-400">Profile ID (for login)</label>
                <input type="text" value={formData.id} readOnly className="w-full mt-1 p-3 bg-black/30 border border-gold/20 rounded-lg cursor-not-allowed text-gray-400" />
            </div>
            <div>
                <label className="text-sm font-medium text-gray-400">Username (Public)</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} className="w-full mt-1 p-3 bg-white/5 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:outline-none" />
            </div>
            <div>
                <label className="text-sm font-medium text-gray-400">Primary Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full mt-1 p-3 bg-white/5 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:outline-none" />
            </div>
            <div>
                <label className="text-sm font-medium text-gray-400">Notification Email</label>
                <input type="email" name="notificationEmail" value={formData.notificationEmail} onChange={handleChange} className="w-full mt-1 p-3 bg-white/5 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:outline-none" />
            </div>
            <button type="submit" className="w-full py-3 bg-gold text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors">Save Changes</button>
        </form>
    );
};


// --- AdminDashboard Component ---
interface SocialLinks {
    youtube: string;
    instagram: string;
    reddit: string;
    facebook: string;
    x: string;
}
interface AdminDashboardProps {
    onClose: () => void;
    onAddContent: (item: Omit<ContentItem, 'id' | 'coverImage'>, coverImageFile: File, contentFile?: File) => void;
    onRestoreAll: (data: { stories: ContentItem[], documentaries: ContentItem[], articles: ContentItem[] }) => void;
    allContent: { stories: ContentItem[], documentaries: ContentItem[], articles: ContentItem[] };
    socialLinks: SocialLinks;
    onUpdateSocialLinks: (links: SocialLinks) => void;
}
const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose, onAddContent, onRestoreAll, allContent, socialLinks, onUpdateSocialLinks }) => {
    const [activeTab, setActiveTab] = useState('content');
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [tagline, setTagline] = useState('');
    const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
    const [contentFile, setContentFile] = useState<File | null>(null);
    const [tags, setTags] = useState('');
    const [type, setType] = useState<ContentType>(ContentType.Story);
    const restoreInputRef = useRef<HTMLInputElement>(null);
    const [localSocialLinks, setLocalSocialLinks] = useState(socialLinks);
    const [storageUsage, setStorageUsage] = useState(0);
    
    const MAX_STORAGE = 5 * 1024 * 1024; // 5MB

    useEffect(() => {
        let total = 0;
        for (const key in localStorage) {
            if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
                const value = localStorage.getItem(key);
                if (value) {
                    total += (key.length + value.length) * 2; // Size in bytes for UTF-16
                }
            }
        }
        setStorageUsage(total);
    }, [allContent]);


    const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setCoverImageFile(e.target.files[0]);
        }
    };
    
    const handleContentFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setContentFile(e.target.files[0]);
        }
    };

    const handleContentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!coverImageFile) {
            alert("Please upload a cover image.");
            return;
        }
        const newItemData = {
            type: type,
            title: title,
            tagline: tagline,
            description: summary,
            tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
        };
        onAddContent(newItemData, coverImageFile, contentFile || undefined);
        setTitle('');
        setSummary('');
        setTagline('');
        setCoverImageFile(null);
        setContentFile(null);
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
                if (typeof result !== 'string') throw new Error("Failed to read file.");
                const parsedData = JSON.parse(result);
                if (Array.isArray(parsedData.stories) && Array.isArray(parsedData.documentaries) && Array.isArray(parsedData.articles)) {
                    if (window.confirm("Are you sure? This will overwrite all current content.")) {
                        onRestoreAll(parsedData);
                        alert("Content restored!");
                        onClose();
                    }
                } else {
                    throw new Error("Invalid backup file format.");
                }
            } catch (error) {
                alert(`Failed to restore. Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        };
        reader.readAsText(file);
    };

    const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLocalSocialLinks(prev => ({...prev, [name as keyof SocialLinks]: value }));
    };

    const handleSocialSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdateSocialLinks(localSocialLinks);
        alert("Social links updated!");
    };

    const socialFields: (keyof SocialLinks)[] = ['youtube', 'instagram', 'reddit', 'facebook', 'x'];
    const usagePercent = Math.min((storageUsage / MAX_STORAGE) * 100, 100);

    return (
         <div className="max-h-[80vh] flex flex-col">
            <div className="flex border-b border-gold/20 mb-6">
                <button onClick={() => setActiveTab('content')} className={`py-2 px-4 text-sm font-semibold ${activeTab === 'content' ? 'text-gold border-b-2 border-gold' : 'text-gray-400'}`}>Content Management</button>
                <button onClick={() => setActiveTab('settings')} className={`py-2 px-4 text-sm font-semibold ${activeTab === 'settings' ? 'text-gold border-b-2 border-gold' : 'text-gray-400'}`}>Site Settings</button>
                <div className="flex-grow border-b border-gold/20"></div>
                <div className="flex space-x-2 pb-2">
                    <button type="button" onClick={handleBackup} className="py-1 px-3 bg-gold/20 text-gold font-semibold rounded-lg hover:bg-gold hover:text-black transition-colors text-xs">Backup</button>
                    <button type="button" onClick={() => restoreInputRef.current?.click()} className="py-1 px-3 border border-gold text-gold font-semibold rounded-lg hover:bg-gold hover:text-black transition-colors text-xs">Restore</button>
                    <input type="file" ref={restoreInputRef} onChange={handleRestoreChange} accept="application/json" className="hidden" />
                </div>
            </div>
            
            <div className="overflow-y-auto pr-2 flex-grow">
                {activeTab === 'content' && (
                    <form onSubmit={handleContentSubmit} className="space-y-4">
                        <select value={type} onChange={(e) => setType(e.target.value as ContentType)} className="w-full mt-1 p-3 bg-white/5 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:outline-none"><option value={ContentType.Story}>Story</option><option value={ContentType.Documentary}>Documentary</option><option value={ContentType.Article}>Article</option></select>
                        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required className="w-full p-3 bg-white/5 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:outline-none" />
                        <input type="text" placeholder="Tagline (for Hero Slider)" value={tagline} onChange={e => setTagline(e.target.value)} required className="w-full p-3 bg-white/5 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:outline-none" />
                        <textarea placeholder="Summary" rows={4} value={summary} onChange={e => setSummary(e.target.value)} required className="w-full p-3 bg-white/5 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:outline-none" />
                        <div><label className="text-sm font-medium text-gray-400">Cover Image</label><input type="file" onChange={handleCoverImageChange} required accept="image/*" className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold/20 file:text-gold hover:file:bg-gold/30 file:cursor-pointer"/></div>
                        <div><label className="text-sm font-medium text-gray-400">Content File (PDF, DOCX, PPTX, HTML)</label><input type="file" onChange={handleContentFileChange} accept=".pdf,.docx,.pptx,.html" className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold/20 file:text-gold hover:file:bg-gold/30 file:cursor-pointer"/></div>
                        <input placeholder="Tags (comma-separated)" type="text" value={tags} onChange={e => setTags(e.target.value)} className="w-full p-3 bg-white/5 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:outline-none" />
                        <button type="submit" className="w-full py-3 bg-gold text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors">Upload Content</button>
                    </form>
                )}
                {activeTab === 'settings' && (
                    <div>
                        <form onSubmit={handleSocialSubmit} className="space-y-4">
                            <h3 className="text-xl font-serif text-gold">Social Media Links</h3>
                            {socialFields.map(field => (
                                 <div key={field}><label className="text-sm font-medium text-gray-400 capitalize">{field}</label><input type="url" name={field} placeholder={`https://${field}.com/your-profile`} value={localSocialLinks[field] || ''} onChange={handleSocialLinkChange} className="w-full mt-1 p-3 bg-white/5 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:outline-none" /></div>
                            ))}
                            <button type="submit" className="w-full py-3 bg-gold text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors">Save Social Links</button>
                        </form>
                         <div className="mt-8 pt-6 border-t border-gold/20">
                            <h3 className="text-xl font-serif text-gold">Storage Usage</h3>
                            <p className="text-sm text-gray-400 mt-2">Your browser provides about 5MB of storage for this site. To save space, please optimize images before uploading.</p>
                            <div className="w-full bg-gold/20 rounded-full h-2.5 mt-2 my-1">
                                <div className="bg-gold h-2.5 rounded-full" style={{ width: `${usagePercent}%` }}></div>
                            </div>
                            <p className="text-right text-xs text-gray-400">
                                {(storageUsage / 1024 / 1024).toFixed(2)} / 5.00 MB
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// AudioToggle Component
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
     useEffect(() => {
        const audioElement = document.getElementById('ambient-sound') as HTMLAudioElement | null;
        if (audioElement) (audioRef as React.MutableRefObject<HTMLAudioElement>).current = audioElement;
    }, [audioRef]);


    return (
        <button onClick={toggleSound} className="fixed bottom-5 right-5 z-50 p-3 rounded-full glassmorphism text-gold hover:text-white hover:bg-gold/20 transition-all">
            {isPlaying ? <SoundOnIcon /> : <SoundOffIcon />}
        </button>
    );
};

// --- App Component ---
function App() {
    // Content State
    const [stories, setStories] = useState<ContentItem[]>([]);
    const [documentaries, setDocumentaries] = useState<ContentItem[]>([]);
    const [articles, setArticles] = useState<ContentItem[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);

    // Auth & User State
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [adminPassword, setAdminPassword] = useState('password123');
    const [isReaderLoggedIn, setIsReaderLoggedIn] = useState(false);
    const [readerEmail, setReaderEmail] = useState<string | null>(null);
    
    // Modal State
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [adminModalOpen, setAdminModalOpen] = useState(false);
    const [passwordModalOpen, setPasswordModalOpen] = useState(false);
    const [profileModalOpen, setProfileModalOpen] = useState(false);
    const [forgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false);
    const [readerModalOpen, setReaderModalOpen] = useState(false);
    const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
    const contentToOpenAfterLogin = useRef<ContentItem | null>(null);

    // Site settings state
    const [socialLinks, setSocialLinks] = useState<SocialLinks>({ youtube: '', instagram: '', reddit: '', facebook: '', x: ''});

    const audioRef = useRef<HTMLAudioElement>(null);

    // Section Refs
    const sectionRefs = {
        home: useRef<HTMLDivElement>(null),
        stories: useRef<HTMLDivElement>(null),
        documentaries: useRef<HTMLDivElement>(null),
        articles: useRef<HTMLDivElement>(null),
        about: useRef<HTMLDivElement>(null),
        contact: useRef<HTMLDivElement>(null),
    };
    
    const allContentForSlider = useMemo(() => {
        return [...stories, ...documentaries, ...articles];
    }, [stories, documentaries, articles]);

    // --- Data Persistence Effects ---
    useEffect(() => {
        try {
            setStories(JSON.parse(localStorage.getItem('sagar_stories') || '[]'));
            setDocumentaries(JSON.parse(localStorage.getItem('sagar_documentaries') || '[]'));
            setArticles(JSON.parse(localStorage.getItem('sagar_articles') || '[]'));
            setComments(JSON.parse(localStorage.getItem('sagar_comments') || '[]'));
            setAdminPassword(localStorage.getItem('sagar_admin_password') || 'password123');
            setSocialLinks(JSON.parse(localStorage.getItem('sagar_social_links') || 'null') || { youtube: '', instagram: '', reddit: '', facebook: '', x: ''});

            const loggedInAdmin = localStorage.getItem('sagar_isLoggedIn') === 'true';
            if (loggedInAdmin) {
                const userProfile = JSON.parse(localStorage.getItem('sagar_user_profile') || 'null');
                setIsLoggedIn(true);
                setCurrentUser(userProfile || SAGAR_SAHU_ADMIN);
            }
            
            const loggedInReader = localStorage.getItem('sagar_reader_email');
            if (loggedInReader) {
                setIsReaderLoggedIn(true);
                setReaderEmail(loggedInReader);
            }

        } catch (error) { console.error("Failed to load from localStorage", error); }
    }, []);

    useEffect(() => { safeSetLocalStorage('sagar_stories', JSON.stringify(stories)); }, [stories]);
    useEffect(() => { safeSetLocalStorage('sagar_documentaries', JSON.stringify(documentaries)); }, [documentaries]);
    useEffect(() => { safeSetLocalStorage('sagar_articles', JSON.stringify(articles)); }, [articles]);
    useEffect(() => { safeSetLocalStorage('sagar_comments', JSON.stringify(comments)); }, [comments]);
    useEffect(() => { safeSetLocalStorage('sagar_admin_password', adminPassword); }, [adminPassword]);
    useEffect(() => { safeSetLocalStorage('sagar_social_links', JSON.stringify(socialLinks)); }, [socialLinks]);
    useEffect(() => { safeSetLocalStorage('sagar_isLoggedIn', String(isLoggedIn)); }, [isLoggedIn]);
    useEffect(() => { if(currentUser) safeSetLocalStorage('sagar_user_profile', JSON.stringify(currentUser)); }, [currentUser]);
    useEffect(() => { 
        if (isReaderLoggedIn && readerEmail) {
            safeSetLocalStorage('sagar_reader_email', readerEmail);
        } else {
            localStorage.removeItem('sagar_reader_email');
        }
    }, [isReaderLoggedIn, readerEmail]);
    
    // --- Handlers ---
    const handleScrollTo = (id: string) => {
        const ref = sectionRefs[id as keyof typeof sectionRefs];
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleLogin = (profileId: string, password: string) => {
        const userProfile = JSON.parse(localStorage.getItem('sagar_user_profile') || 'null') || SAGAR_SAHU_ADMIN;
        if (profileId === userProfile.id && password === adminPassword) {
            setIsLoggedIn(true);
            setCurrentUser(userProfile);
            setAuthModalOpen(false);
            handleReaderLogout(); // Log out reader if admin logs in
        } else {
            alert('Incorrect Profile ID or password.');
        }
    };
    
    const handleLogout = () => {
        setIsLoggedIn(false);
        setCurrentUser(null);
    };
    
    const handleReaderLogin = (email: string) => {
        setIsReaderLoggedIn(true);
        setReaderEmail(email);
        setReaderModalOpen(false);
        if (contentToOpenAfterLogin.current) {
            setSelectedContent(contentToOpenAfterLogin.current);
            contentToOpenAfterLogin.current = null;
        }
    };
    
    const handleReaderLogout = () => {
        setIsReaderLoggedIn(false);
        setReaderEmail(null);
    };

    const handlePasswordChange = (oldPass: string, newPass: string) => {
        if (oldPass === adminPassword) {
            setAdminPassword(newPass);
            return true;
        }
        return false;
    };

    const handlePasswordReset = (profileId: string, email: string): boolean => {
        const userProfile = JSON.parse(localStorage.getItem('sagar_user_profile') || 'null') || SAGAR_SAHU_ADMIN;
        if (profileId === userProfile.id && email === userProfile.notificationEmail) {
            setAdminPassword('password123'); // Reset to default
            return true;
        }
        return false;
    };

    const handleForgotPasswordClick = () => {
        setAuthModalOpen(false);
        setForgotPasswordModalOpen(true);
    };

    const handleProfileUpdate = (updatedUser: User) => {
        setCurrentUser(updatedUser);
    };

    const handleReadMoreClick = (item: ContentItem) => {
        if (isLoggedIn || isReaderLoggedIn) {
            setSelectedContent(item);
        } else {
            contentToOpenAfterLogin.current = item;
            setReaderModalOpen(true);
        }
    };

    const handleDetailClose = () => {
        setSelectedContent(null);
        history.pushState("", document.title, window.location.pathname + window.location.search);
    };

    // Sharing via URL hash effect
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash.startsWith('#content/')) {
                const contentId = hash.substring('#content/'.length);
                if (stories.length > 0 || articles.length > 0 || documentaries.length > 0) {
                    const allContent = [...stories, ...documentaries, ...articles];
                    const item = allContent.find(c => c.id === contentId);
                    if (item) {
                        handleReadMoreClick(item);
                    }
                }
            }
        };
        handleHashChange();
    }, [stories, documentaries, articles, isReaderLoggedIn, isLoggedIn]);

    const fileToDataUrl = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleAddContent = async (itemData: Omit<ContentItem, 'id' | 'coverImage'>, coverImageFile: File, contentFile?: File) => {
        try {
            const coverImage = await fileToDataUrl(coverImageFile);
            let contentFileUrl: string | undefined;
            let contentFileName: string | undefined;

            if (contentFile) {
                contentFileUrl = await fileToDataUrl(contentFile);
                contentFileName = contentFile.name;
            }

            const newItem: ContentItem = {
                ...itemData,
                id: `${itemData.type.toLowerCase()}-${Date.now()}`,
                coverImage,
                contentFileUrl,
                contentFileName,
            };

            const setter = { [ContentType.Story]: setStories, [ContentType.Documentary]: setDocumentaries, [ContentType.Article]: setArticles }[newItem.type];
            setter(prev => [newItem, ...prev]);
        } catch (error) {
            console.error("File processing error:", error);
            alert("Failed to process uploaded file.");
        }
    };
    
    const handleRestoreAll = (data: { stories: ContentItem[], documentaries: ContentItem[], articles: ContentItem[] }) => {
        setStories(data.stories || []);
        setDocumentaries(data.documentaries || []);
        setArticles(data.articles || []);
    };

    const handleDeleteContent = (id: string, type: ContentType) => {
        if (!window.confirm("Are you sure? This action cannot be undone.")) return;
        const setter = { [ContentType.Story]: setStories, [ContentType.Documentary]: setDocumentaries, [ContentType.Article]: setArticles }[type];
        setter(prev => prev.filter(item => item.id !== id));
    };
    
    const userForComment = useMemo(() => {
        if (isLoggedIn && currentUser) {
            return currentUser;
        }
        if (isReaderLoggedIn && readerEmail) {
            return {
                id: readerEmail,
                email: readerEmail,
                notificationEmail: readerEmail,
                username: readerEmail.split('@')[0],
                avatar: `https://i.pravatar.cc/150?u=${encodeURIComponent(readerEmail)}`
            };
        }
        return null;
    }, [isLoggedIn, currentUser, isReaderLoggedIn, readerEmail]);

    const handleAddComment = (text: string) => {
        if (!userForComment) return;
        const newComment: Comment = {
            id: `comment-${Date.now()}`,
            user: userForComment,
            text,
            timestamp: 'Just now'
        };
        setComments(prev => [newComment, ...prev]);
    };

    const isAdmin = isLoggedIn && currentUser?.id === SAGAR_SAHU_ADMIN.id;

    return (
        <div className="bg-[#0a0a0a] min-h-screen relative">
            <div className="absolute inset-0 h-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,215,0,0.15),rgba(255,255,255,0))] opacity-50"></div>
            <Navbar onScrollTo={handleScrollTo} onAuthClick={() => setAuthModalOpen(true)} onAdminClick={() => setAdminModalOpen(true)} isLoggedIn={isLoggedIn} user={currentUser} onLogout={handleLogout} onChangePassword={() => setPasswordModalOpen(true)} onProfileSettings={() => setProfileModalOpen(true)} isReaderLoggedIn={isReaderLoggedIn} readerEmail={readerEmail} onReaderLogout={handleReaderLogout} />
            <main>
                <div ref={sectionRefs.home}><HeroSlider slides={allContentForSlider} onSlideClick={handleReadMoreClick} /></div>
                <div ref={sectionRefs.stories}><ContentSection id="stories" title="Featured Stories" items={stories} isAdmin={isAdmin} onDeleteContent={handleDeleteContent} onReadMore={handleReadMoreClick} /></div>
                <div ref={sectionRefs.documentaries}><ContentSection id="documentaries" title="Documentaries" items={documentaries} isAdmin={isAdmin} onDeleteContent={handleDeleteContent} onReadMore={handleReadMoreClick} /></div>
                <div ref={sectionRefs.articles}><ContentSection id="articles" title="Articles" items={articles} isAdmin={isAdmin} onDeleteContent={handleDeleteContent} onReadMore={handleReadMoreClick} /></div>
                <CommunitySection isLoggedIn={isLoggedIn} isReaderLoggedIn={isReaderLoggedIn} userForComment={userForComment} comments={comments} onAddComment={handleAddComment} />
                <div ref={sectionRefs.about}><AboutSection user={currentUser || SAGAR_SAHU_ADMIN} /></div>
            </main>
            <div ref={sectionRefs.contact}><Footer socialLinks={socialLinks} /></div>
            <AudioToggle audioRef={audioRef} />

            <Modal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} title="Admin Login">
                <AuthForm onLogin={handleLogin} defaultId={SAGAR_SAHU_ADMIN.id} onForgotPassword={handleForgotPasswordClick} />
            </Modal>
            <Modal isOpen={readerModalOpen} onClose={() => setReaderModalOpen(false)} title="Join the Community">
                <ReaderAuthForm onLogin={handleReaderLogin} />
            </Modal>
            <Modal isOpen={forgotPasswordModalOpen} onClose={() => setForgotPasswordModalOpen(false)} title="Reset Password">
                <ForgotPasswordForm onReset={handlePasswordReset} onClose={() => setForgotPasswordModalOpen(false)} defaultId={SAGAR_SAHU_ADMIN.id} />
            </Modal>

             {currentUser && (
                <>
                    <Modal isOpen={passwordModalOpen} onClose={() => setPasswordModalOpen(false)} title="Change Password">
                        <ChangePasswordForm onPasswordChange={handlePasswordChange} onClose={() => setPasswordModalOpen(false)} notificationEmail={currentUser.notificationEmail} />
                    </Modal>
                    <Modal isOpen={profileModalOpen} onClose={() => setProfileModalOpen(false)} title="Profile Settings">
                        <ProfileSettingsForm user={currentUser} onUpdate={handleProfileUpdate} onClose={() => setProfileModalOpen(false)} />
                    </Modal>
                </>
            )}
            <Modal isOpen={adminModalOpen} onClose={() => setAdminModalOpen(false)} title="Content Dashboard" size="large">
                <AdminDashboard onAddContent={handleAddContent} onRestoreAll={handleRestoreAll} allContent={{ stories, documentaries, articles }} socialLinks={socialLinks} onUpdateSocialLinks={setSocialLinks} onClose={() => setAdminModalOpen(false)} />
            </Modal>
            <ContentDetailModal isOpen={!!selectedContent} onClose={handleDetailClose} item={selectedContent} />
        </div>
    );
}

export default App;
