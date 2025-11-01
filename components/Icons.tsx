
import React from 'react';

const iconProps = {
  className: "w-6 h-6",
  fill: "currentColor"
};

export const FacebookIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg {...iconProps} className={className || iconProps.className} viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path></svg>
);

export const InstagramIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg {...iconProps} className={className || iconProps.className} viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.644-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.359 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.359-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.359-2.618-6.78-6.98-6.98C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"></path></svg>
);

export const RedditIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg {...iconProps} className={className || iconProps.className} viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12h2v2h-2zm0 4h2v6h-2z"></path><path d="M12.026 2c-5.507 0-9.974 4.467-9.974 9.974 0 4.33 2.757 8.038 6.55 9.33.477.088.65-.207.65-.46 0-.226-.008-.825-.013-1.62-2.675.582-3.24-1.29-3.24-1.29-.434-1.104-1.06-1.398-1.06-1.398-.865-.592.065-.58.065-.58.956.067 1.46 1.012 1.46 1.012.85 1.455 2.23 1.033 2.774.79.087-.614.332-1.033.604-1.27-2.115-.24-4.338-1.057-4.338-4.707 0-1.04.37-1.89.977-2.555-.098-.24-.423-1.207.093-2.52 0 0 .798-.255 2.613.974A9.13 9.13 0 0112 7.11c.805 0 1.61.115 2.37.34 1.815-1.23 2.61-..974 2.61-.974.518 1.313.192 2.28.094 2.52.607.665.976 1.515.976 2.555 0 3.66-2.226 4.464-4.348 4.7.34.293.648.875.648 1.762 0 1.27-.012 2.295-.012 2.608 0 .255.17.553.654.458C19.22 19.994 22 16.32 22 11.974 22 6.467 17.533 2 12.026 2z" transform="scale(1.002)"></path></svg>
);

export const XIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg {...iconProps} className={className || iconProps.className} viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
);

export const WhatsAppIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg {...iconProps} className={className || iconProps.className} viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m.01 18.11c-1.53 0-3.03-.4-4.36-1.15l-.31-.18-3.24.85.87-3.15-.2-.33c-.82-1.37-1.25-2.95-1.25-4.58 0-4.54 3.69-8.23 8.23-8.23 4.54 0 8.23 3.69 8.23 8.23s-3.69 8.23-8.23 8.23m4.49-5.43c-.24-.12-1.44-.71-1.67-.79-.23-.08-.39-.12-.56.12-.17.24-.63.79-.77.95-.14.17-.28.18-.52.06-.23-.12-1-.37-1.9-1.18-.71-.63-1.18-1.41-1.32-1.65-.14-.24-.02-.37.11-.48.11-.11.24-.28.37-.42.12-.14.17-.24.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.4-.42-.55-.42h-.48c-.15 0-.39.04-.6.18-.2.14-.79.77-.79 1.88 0 1.11.81 2.18.92 2.32.11.14 1.59 2.5 3.86 3.6 2.27 1.1 2.27.74 2.67.7h.43c.23-.04.72-.29.82-.57.1-.28.1-.53.06-.65z"></path></svg>
);

export const YouTubeIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg {...iconProps} className={className || iconProps.className} viewBox="0 0 24 24" aria-hidden="true"><path d="M21.582 7.043c-.23-.822-.895-1.488-1.717-1.717C18.252 5 12 5 12 5s-6.252 0-7.865.326c-.822.23-1.488.895-1.717 1.717C2 8.656 2 12 2 12s0 3.344.326 4.957c.23.822.895 1.488 1.717 1.717C5.748 19 12 19 12 19s6.252 0 7.865-.326c.822-.23 1.488-.895 1.717-1.717C22 15.344 22 12 22 12s0-3.344-.418-4.957zM9.75 15.5V8.5l6.5 3.5z"></path></svg>
);

export const ChevronLeftIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg {...iconProps} className={className || iconProps.className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
);

export const ChevronRightIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg {...iconProps} className={className || iconProps.className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
);

export const SoundOnIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg {...iconProps} className={className || iconProps.className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
);

export const SoundOffIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg {...iconProps} className={className || iconProps.className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l4-4m0 4l-4-4"></path></svg>
);

export const CloseIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg {...iconProps} className={className || iconProps.className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
);

export const UserIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg {...iconProps} className={className || iconProps.className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
);

export const BookmarkIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || iconProps.className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
);
