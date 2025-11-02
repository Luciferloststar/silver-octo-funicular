
import React, { useEffect } from 'react';
import { ContentItem } from '../types';
import Modal from './Modal';

interface ContentDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: ContentItem | null;
}

const ContentDetailModal: React.FC<ContentDetailModalProps> = ({ isOpen, onClose, item }) => {
    useEffect(() => {
        if (!isOpen) return;

        const handleContextMenu = (e: MouseEvent) => e.preventDefault();
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && ['s', 'c', 'p'].includes(e.key.toLowerCase())) {
                e.preventDefault();
            }
            if (e.key === 'PrintScreen') {
                e.preventDefault();
            }
        };
        const handleCopy = (e: ClipboardEvent) => e.preventDefault();

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('copy', handleCopy);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('copy', handleCopy);
        };
    }, [isOpen]);

    if (!item) return null;

    const renderContent = () => {
        if (item.contentFileUrl) {
            const isPdf = item.contentFileUrl.startsWith('data:application/pdf');
            const isHtml = item.contentFileUrl.startsWith('data:text/html');

            if (isPdf || isHtml) {
                return (
                    <div className="bg-gray-800 p-2 rounded-lg">
                        <iframe
                            src={isPdf ? `${item.contentFileUrl}#toolbar=0` : item.contentFileUrl}
                            className="w-full h-[60vh] rounded"
                            title={item.title}
                            sandbox="allow-scripts allow-same-origin"
                        ></iframe>
                    </div>
                );
            } else {
                return (
                    <div>
                        <p className="text-gray-300 leading-relaxed whitespace-pre-wrap mb-6">{item.description}</p>
                        <div className="text-center p-6 border border-dashed border-gold/50 rounded-lg bg-gold/10">
                            <p className="font-semibold text-gold text-lg">Preview Unavailable</p>
                            <p className="text-sm text-gray-300 mt-2">
                                This content format ({item.contentFileName?.split('.').pop()?.toUpperCase()}) cannot be previewed directly in the browser. The content remains protected.
                            </p>
                        </div>
                    </div>
                );
            }
        }

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
                <div className="max-h-[65vh] overflow-y-auto pr-4 protected-content">
                    {renderContent()}
                </div>
            </div>
        </Modal>
    );
};

export default ContentDetailModal;
