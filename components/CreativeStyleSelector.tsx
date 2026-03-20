import React from 'react';
import { creativeStyles, CreativeStyleConfig } from '../src/config/creativeStyles';
import { cn } from '../lib/utils';

interface CreativeStyleSelectorProps {
    selectedStyle: string;
    onChange: (styleId: string) => void;
}

const CreativeStyleSelector: React.FC<CreativeStyleSelectorProps> = ({
    selectedStyle,
    onChange
}) => {
    // Group styles by category
    const categories = [
        {
            name: 'Basic',
            styles: creativeStyles.filter(s => s.id === 'none')
        },
        {
            name: 'Retro & Vintage',
            styles: creativeStyles.filter(s => 
                ['vintage-retro', 'art-deco', 'film-noir'].includes(s.id)
            )
        },
        {
            name: 'Futuristic',
            styles: creativeStyles.filter(s => 
                ['cyberpunk', 'vaporwave', 'solarpunk', 'atompunk', 'dieselpunk', 'biopunk'].includes(s.id)
            )
        },
        {
            name: 'Artistic',
            styles: creativeStyles.filter(s => 
                ['neoclassical', 'renaissance', 'oil-painting', 'japanese-ink', 'glitch-art'].includes(s.id)
            )
        },
        {
            name: 'Modern',
            styles: creativeStyles.filter(s => 
                ['minimalism', 'streetwear', 'comic-book', 'pixel-art'].includes(s.id)
            )
        }
    ];

    return (
        <div className="w-full max-w-2xl">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-playfair text-white text-lg">Creative Style</h3>
                <button
                    onClick={() => onChange('none')}
                    className="text-xs font-sans text-neutral-400 hover:text-white transition-colors"
                >
                    Reset
                </button>
            </div>
            
            <div className="space-y-4">
                {categories.map((category) => (
                    <div key={category.name}>
                        <div className="text-xs font-sans text-neutral-500 uppercase tracking-wider mb-2">
                            {category.name}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {category.styles.map((style) => {
                                const isSelected = selectedStyle === style.id;
                                
                                return (
                                    <button
                                        key={style.id}
                                        onClick={() => onChange(style.id)}
                                        className={cn(
                                            "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm",
                                            isSelected
                                                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                                                : "bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white border border-white/10"
                                        )}
                                        title={style.descriptionCn}
                                    >
                                        <span>{style.icon}</span>
                                        <span>{style.nameCn}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Selected style description */}
            {selectedStyle !== 'none' && (
                <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-neutral-300 text-sm">
                        <span className="font-medium text-white">
                            {creativeStyles.find(s => s.id === selectedStyle)?.nameCn}
                        </span>
                        {' - '}
                        {creativeStyles.find(s => s.id === selectedStyle)?.descriptionCn}
                    </p>
                </div>
            )}
        </div>
    );
};

export default CreativeStyleSelector;
