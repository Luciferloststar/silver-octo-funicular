
import React from 'react';
import { ContentItem } from '../types';
import Modal from './Modal';

interface ContentDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: ContentItem | null;
}

const ContentDetailModal: React.FC<ContentDetailModalProps> = ({ isOpen, onClose, item }) => {
    if (!item) return null;

    const renderContent = () => {
        return <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{item.description}</p>;
    };
    
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={item.title} size="large">
            <div className="mt-4">
                <div className="flex flex-wrap gap-2 mb-6 border-b border-gold/20 pb-4">
                    {item.tags.map(tag => (
                        <span key={tag} className="text-xs text-gold bg-gold/10 px-2 py-1 rounded-full">{tag}</span>
                    ))}
                </div>
                <div className="max-h-[65vh] overflow-y-auto pr-4">
                    {renderContent()}
                </div>
            </div>
        </Modal>
    );
};

export default ContentDetailModal;