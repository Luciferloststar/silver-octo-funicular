import React, { useEffect, useState } from 'react';
import { ContentItem } from '../types';
import Modal from './Modal';
import { MaximizeIcon, RestoreIcon, ShareIcon } from './Icons';

interface ContentDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: ContentItem | null;
}

const ContentDetailModal: React.FC<ContentDetailModalProps> = ({ isOpen, onClose, item }) => {
    const [isMaximized, setIsMaximized] = useState(false);
    const [linkCopied, setLinkCopied] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            // Reset maximized state when modal is closed
            setIsMaximized(false);
            return;
        }

        const handleContextMenu = (e: MouseEvent) => e.preventDefault();
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && ['s', 'c', 'p'].includes(e.key.toLowerCase())) {
                e.preventDefault();
            }
            if (e.key === 'PrintScreen') {
                e.preventDefault();
            }
            if (e.key === 'Escape' && isMaximized) {
                setIsMaximized(false);
                e.stopPropagation();
            }
        };
        const handleCopy = (e: ClipboardEvent) => e.preventDefault();

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyDown, true); // Use capture phase for Escape key
        document.addEventListener('copy', handleCopy);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('keydown', handleKeyDown, true);
            document.removeEventListener('copy', handleCopy);
        };
    }, [isOpen, isMaximized]);

    if (!item) return null;

    const handleShare = () => {
        if (!item) return;
        const url = `${window.location.origin}${window.location.pathname}#content/${item.id}`;
        navigator.clipboard.writeText(url).then(() => {
            setLinkCopied(true);
            setTimeout(() => setLinkCopied(false), 2000);
        });
    };

    const renderContent = () => {
        if (item.contentFileUrl) {
            const isPdf = item.contentFileUrl.startsWith('data:application/pdf');
            const isHtml = item.contentFileUrl.startsWith('data:text/html');

            if (isPdf || isHtml) {
                return (
                    <div className="bg-gray-800 p-2 rounded-lg h-full">
                        <iframe
                            src={isPdf ? `${item.contentFileUrl}#toolbar=0` : item.contentFileUrl}
                            className="w-full h-full rounded"
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
    
    const controls = (
        <>
            <div className="relative">
                <button onClick={handleShare} className="p-1 rounded-full text-gray-400 hover:bg-white/10 hover:text-white transition-colors" title="Share Content">
                    <ShareIcon className="w-5 h-5" />
                </button>
                {linkCopied && (
                    <span className="absolute bottom-full right-0 mb-2 whitespace-nowrap bg-gold text-black text-xs font-bold px-2 py-1 rounded">Link Copied!</span>
                )}
            </div>
            <button onClick={() => setIsMaximized(!isMaximized)} className="p-1 rounded-full text-gray-400 hover:bg-white/10 hover:text-white transition-colors" title={isMaximized ? "Restore" : "Maximize"}>
                {isMaximized ? <RestoreIcon className="w-5 h-5" /> : <MaximizeIcon className="w-5 h-5" />}
            </button>
        </>
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={item.title} size="large" isMaximized={isMaximized} controls={controls}>
            <div className={`protected-content flex flex-col ${isMaximized ? 'h-full' : 'max-h-[70vh]'}`}>
                <div className="flex-shrink-0 flex flex-wrap gap-2 mb-6 border-b border-gold/20 pb-4">
                    {item.tags.map(tag => (
                        <span key={tag} className="text-xs text-gold bg-gold/10 px-2 py-1 rounded-full">{tag}</span>
                    ))}
                </div>
                <div className="flex-grow overflow-y-auto pr-2">
                    {renderContent()}
                </div>
            </div>
        </Modal>
    );
};

export default ContentDetailModal;
