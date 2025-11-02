import React, { useState } from 'react';
import { Comment, User } from '../types';

interface CommunitySectionProps {
    isLoggedIn: boolean;
    isReaderLoggedIn: boolean;
    userForComment: User | null;
    comments: Comment[];
    onAddComment: (text: string) => void;
}

const CommunitySection: React.FC<CommunitySectionProps> = ({ isLoggedIn, isReaderLoggedIn, userForComment, comments, onAddComment }) => {
    const [newComment, setNewComment] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim() && userForComment) {
            onAddComment(newComment.trim());
            setNewComment('');
        }
    };

    const canComment = isLoggedIn || isReaderLoggedIn;
    
    return (
        <section className="py-20 bg-surface">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <h2 className="text-4xl md:text-5xl font-bold font-serif text-center mb-12 text-gold">Reader Community</h2>
                 <div className="max-w-3xl mx-auto space-y-6">
                    {comments.map(comment => (
                        <div key={comment.id} className="glassmorphism p-4 rounded-lg flex space-x-4">
                            <img src={comment.user.avatar} alt={comment.user.username} className="w-12 h-12 rounded-full border-2 border-gold/50 object-cover" />
                            <div>
                                <p className="font-bold text-gold">{comment.user.username} <span className="text-xs text-gray-500 font-normal ml-2">{comment.timestamp}</span></p>
                                <p className="text-gray-300 whitespace-pre-wrap">{comment.text}</p>
                            </div>
                        </div>
                    ))}
                    {canComment && userForComment && (
                        <form onSubmit={handleSubmit} className="pt-6">
                           <textarea 
                                placeholder="Share your thoughts..." 
                                rows={4} 
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="w-full p-3 bg-white/5 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:outline-none transition-all" 
                            />
                           <button type="submit" className="mt-2 px-6 py-2 bg-gold text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed" disabled={!newComment.trim()}>
                               Post Comment
                           </button>
                        </form>
                    )}
                 </div>
            </div>
        </section>
    );
};

export default CommunitySection;
