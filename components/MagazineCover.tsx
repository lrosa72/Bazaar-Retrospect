import React, { useState, useEffect } from 'react';
import { DraggableCardContainer, DraggableCardBody } from './ui/draggable-card';
import { cn } from '../lib/utils';

type ImageStatus = 'pending' | 'done' | 'error';

interface MagazineCoverProps {
    imageUrl?: string;
    caption: string;
    status: ImageStatus;
    error?: string;
    dragConstraintsRef?: React.RefObject<HTMLElement>;
    onShake?: (caption: string) => void;
    onDownload?: (caption: string) => void;
    isMobile?: boolean;
}

const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-full">
        <svg className="animate-spin h-8 w-8 text-neutral-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>
);

const ErrorDisplay = () => (
    <div className="flex items-center justify-center h-full p-4 text-center">
         <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs text-red-500 font-sans uppercase tracking-widest">Generation Failed</span>
         </div>
    </div>
);

const Placeholder = () => (
    <div className="flex flex-col items-center justify-center h-full text-neutral-500 group-hover:text-neutral-300 transition-colors duration-300 border-2 border-dashed border-neutral-700 m-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="font-playfair italic text-xl">Upload Portrait</span>
    </div>
);

const MagazineCover: React.FC<MagazineCoverProps> = ({ imageUrl, caption, status, error, dragConstraintsRef, onShake, onDownload, isMobile }) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
        if (status === 'pending') {
            setIsImageLoaded(false);
        }
    }, [imageUrl, status]);

    const cardInnerContent = (
        <div className="w-full h-full relative overflow-hidden group bg-white shadow-2xl">
            {status === 'pending' && <LoadingSpinner />}
            {status === 'error' && <ErrorDisplay />}
            {status === 'done' && imageUrl && (
                <>
                    <img
                        src={imageUrl}
                        alt={caption}
                        onLoad={() => setIsImageLoaded(true)}
                        className={cn(
                            "w-full h-full object-cover transition-opacity duration-700",
                            isImageLoaded ? "opacity-100" : "opacity-0"
                        )}
                    />
                    
                    {/* Magazine Overlay */}
                    <div className="absolute inset-0 flex flex-col pointer-events-none">
                        {/* Header */}
                        <div className="pt-6 px-4 text-center">
                            <h2 className="font-playfair text-4xl md:text-5xl font-black tracking-tighter text-black uppercase leading-none">
                                Harper's
                            </h2>
                            <h2 className="font-playfair text-5xl md:text-6xl font-black tracking-tighter text-black uppercase leading-none -mt-2">
                                BAZAAR
                            </h2>
                            <div className="h-[2px] bg-black w-full mt-1" />
                            <div className="flex justify-between text-[10px] font-sans font-bold tracking-widest uppercase mt-1 px-1 text-black">
                                <span>{caption}</span>
                                <span>Special Edition</span>
                            </div>
                        </div>

                        {/* Headlines */}
                        <div className="mt-auto pb-12 px-6 flex flex-col gap-4">
                            <div className="bg-black text-white self-start px-2 py-1">
                                <span className="text-xs font-bold uppercase tracking-widest">The Future of Style</span>
                            </div>
                            <div className="text-black">
                                <h3 className="font-playfair text-2xl font-bold leading-tight italic">
                                    {caption === '2050s' ? 'Cyber Chic' : caption === '1970s' ? 'Retro Revival' : 'Timeless Beauty'}
                                </h3>
                                <p className="text-[10px] font-sans font-bold uppercase tracking-widest mt-1">
                                    Reimagining the icon
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className={cn(
                        "absolute top-4 right-4 z-20 flex flex-col gap-2 transition-opacity duration-300",
                        !isMobile && "opacity-0 group-hover:opacity-100",
                    )}>
                        {onDownload && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDownload(caption);
                                }}
                                className="p-2 bg-black/80 rounded-full text-white hover:bg-black focus:outline-none"
                                aria-label={`Download cover for ${caption}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                            </button>
                        )}
                        {onShake && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onShake(caption);
                                }}
                                className="p-2 bg-black/80 rounded-full text-white hover:bg-black focus:outline-none"
                                aria-label={`Regenerate cover for ${caption}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.899 2.186l-1.42.71a5.002 5.002 0 00-8.479-1.554H10a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm12 14a1 1 0 01-1-1v-2.101a7.002 7.002 0 01-11.899-2.186l1.42-.71a5.002 5.002 0 008.479 1.554H10a1 1 0 110-2h6a1 1 0 011 1v6a1 1 0 01-1 1z" clipRule="evenodd" />
                                </svg>
                            </button>
                        )}
                    </div>
                </>
            )}
            {status === 'done' && !imageUrl && <Placeholder />}
        </div>
    );

    if (isMobile) {
        return (
            <div className="bg-white p-0 flex flex-col items-center justify-start aspect-[2/3] w-80 max-w-full rounded-none shadow-2xl relative border-[8px] border-white">
                {cardInnerContent}
            </div>
        );
    }

    return (
        <DraggableCardContainer>
            <DraggableCardBody 
                className="bg-white p-0 flex flex-col items-center justify-start aspect-[2/3] w-80 max-w-full rounded-none shadow-2xl border-[8px] border-white"
                dragConstraintsRef={dragConstraintsRef}
            >
                {cardInnerContent}
            </DraggableCardBody>
        </DraggableCardContainer>
    );
};

export default MagazineCover;
