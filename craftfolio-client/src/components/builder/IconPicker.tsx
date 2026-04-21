import { useState } from 'react';
import * as Icons from 'lucide-react';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface IconPickerProps {
    value: string;
    onChange: (iconName: string) => void;
    onClose: () => void;
}

const ALL_ICONS = Object.keys(Icons).filter(key => 
    typeof (Icons as any)[key] === 'function' || 
    (typeof (Icons as any)[key] === 'object' && (Icons as any)[key].displayName)
);

// Common icons to show first or as suggestions
const COMMON_ICONS = [
    'User', 'Mail', 'Github', 'Linkedin', 'Twitter', 'Globe', 'Cpu', 'Code2', 
    'Layers', 'Palette', 'FileText', 'Terminal', 'Database', 'Layout', 'ExternalLink',
    'Smartphone', 'Monitor', 'Briefcase', 'GraduationCap', 'Award', 'Heart', 'Star',
    'Settings', 'Search', 'Bell', 'Calendar', 'MapPin', 'Phone', 'Link', 'Image'
];

export default function IconPicker({ value, onChange, onClose }: IconPickerProps) {
    const [search, setSearch] = useState('');

    const filteredIcons = search 
        ? ALL_ICONS.filter(name => name.toLowerCase().includes(search.toLowerCase()))
        : ALL_ICONS;

    const displayIcons = search ? filteredIcons : [...new Set([...COMMON_ICONS, ...ALL_ICONS])];

    return (
        <div className="fixed inset-0 z-1000 flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                onClick={onClose}
            />
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-175 border border-slate-100"
            >
                <div className="p-8 border-b border-slate-50 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Select Icon</h3>
                            <p className="text-sm text-slate-500 font-medium">Choose a visual representation for your field</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-2xl transition-all group">
                            <X size={24} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
                        </button>
                    </div>
                    
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input 
                            autoFocus
                            type="text"
                            placeholder="Search among 1,000+ icons..."
                            className="w-full h-14 pl-12 pr-6 bg-slate-50 border-2 border-transparent focus:border-[#4CAF7D] focus:bg-white rounded-3xl text-base font-medium transition-all outline-none"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6 custom-scrollbar bg-white">
                    {displayIcons.slice(0, 300).map((iconName) => {
                        const IconComponent = (Icons as any)[iconName];
                        if (!IconComponent) return null;

                        const isSelected = value === iconName;

                        return (
                            <button
                                key={iconName}
                                onClick={() => {
                                    onChange(iconName);
                                    onClose();
                                }}
                                className={`flex flex-col items-center justify-center p-3 rounded-4xl transition-all group border-2 ${
                                    isSelected 
                                    ? 'bg-[#4CAF7D]/5 border-[#4CAF7D] text-[#4CAF7D]' 
                                    : 'bg-white border-transparent hover:border-slate-100 hover:bg-slate-50 text-slate-400 hover:text-slate-900'
                                }`}
                                title={iconName}
                            >
                                <div className={`p-3 rounded-2xl mb-2 transition-transform ${isSelected ? 'bg-[#4CAF7D]/10' : 'bg-slate-50 group-hover:scale-105'}`}>
                                    <IconComponent size={44} strokeWidth={1.2} />
                                </div>
                                <span className={`text-[13px] font-bold w-full px-1 text-center leading-tight transition-colors font-sans ${isSelected ? 'text-[#4CAF7D]' : 'text-slate-600 group-hover:text-slate-900'}`}>
                                    {iconName.replace(/([A-Z])/g, ' $1').trim()}
                                </span>
                            </button>
                        );
                    })}
                    {displayIcons.length === 0 && (
                        <div className="col-span-full py-24 text-center flex flex-col items-center gap-5">
                            <div className="p-8 bg-slate-50 rounded-full text-slate-300">
                                <Search size={48} />
                            </div>
                            <p className="text-slate-400 text-xl font-medium">No icons match your search</p>
                        </div>
                    )}
                </div>
                
                <div className="p-5 bg-slate-50 border-t border-slate-100 text-[12px] text-slate-400 text-center font-bold tracking-widest uppercase">
                    Showing {Math.min(displayIcons.length, 300)} of {displayIcons.length} icons Available
                </div>
            </motion.div>
        </div>
    );
}
