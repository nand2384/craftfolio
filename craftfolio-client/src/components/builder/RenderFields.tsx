import { useDispatch } from "react-redux";
import { updateField, addItemToArray, removeItemFromArray } from "../../redux/features/preview/dataSlice";
import { useState, useEffect } from "react";
import { Plus, Trash2, Search } from "lucide-react";
import IconPicker from "./IconPicker";
import * as Icons from "lucide-react";
import { AnimatePresence } from "framer-motion";

/**
 * Individual Input component to handle local state and follow Rules of Hooks.
 */
function InputField({ label, initialValue, onSave }: { label: string, initialValue: any, onSave: (val: any) => void }) {
    const [value, setValue] = useState(initialValue);
    const [showPicker, setShowPicker] = useState(false);

    // Sync local state when external data (Redux) changes
    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const isIconField = label.toLowerCase().includes('icon');
    const IconPreview = isIconField && (Icons as any)[value];
    
    return (
        <div className="flex flex-col gap-1.5 mb-4 last:mb-0 relative">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{label}</label>
            <div className="relative group/input">
                <input
                    type="text"
                    className={`w-full h-10 px-4 ${isIconField ? 'pl-11 pr-10' : ''} bg-gray-50 rounded-xl border border-gray-100 text-[13px] text-gray-700 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all`}
                    value={value ?? ''}
                    onChange={(e) => {
                        setValue(e.target.value);
                        onSave(e.target.value);
                    }}
                />
                
                {isIconField && (
                    <>
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/input:text-black transition-colors">
                            {IconPreview ? <IconPreview size={18} /> : <Search size={18} />}
                        </div>
                        <button 
                            onClick={() => setShowPicker(!showPicker)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-200 rounded-lg transition-all"
                            title="Choose Icon"
                        >
                            <Plus size={14} className={`text-gray-400 transition-transform duration-300 ${showPicker ? 'rotate-45 text-black' : ''}`} />
                        </button>
                    </>
                )}

                <AnimatePresence>
                    {showPicker && (
                        <IconPicker 
                            value={value} 
                            onChange={(newIcon) => {
                                setValue(newIcon);
                                onSave(newIcon);
                            }} 
                            onClose={() => setShowPicker(false)} 
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

/**
 * Recursive component to render editable fields for any data structure.
 */
function RenderFields({ data, path = [] }: { data: any, path?: (string | number)[] }) {
    const dispatch = useDispatch();

    // If data is a primitive, just render one input
    if (typeof data !== 'object' || data === null) {
        return (
            <InputField 
                label={path[path.length - 1]?.toString().replace(/([A-Z])/g, ' $1') || "Value"} 
                initialValue={data}
                onSave={(val) => dispatch(updateField({ path, value: val }))} 
            />
        );
    }

    return (
        <>
            {Object.entries(data).map(([key, value]) => {
                const currentPath = [...path, key];

                // Skip internal keys if necessary
                if (key === 'id') return null;

                // ✅ PRIMITIVE (String/Number)
                if (typeof value === "string" || typeof value === "number") {
                     return (
                         <InputField 
                            key={currentPath.join(".")}
                            label={key.replace(/([A-Z])/g, ' $1')} 
                            initialValue={value} 
                            onSave={(val) => dispatch(updateField({ path: currentPath, value: val }))} 
                        />
                     );
                }

                // ✅ ARRAY
                if (Array.isArray(value)) {
                    return (
                        <div key={currentPath.join(".")} className="mt-8 mb-10 first:mt-2">
                            <div className="flex items-center justify-between mb-5">
                                <h4 className="text-[12px] font-extrabold text-black uppercase tracking-[0.1em]">{key.replace(/([A-Z])/g, ' $1')}</h4>
                                <button 
                                    onClick={() => {
                                        // Create a default item based on the first item's structure
                                        const newItem = value.length > 0 ? JSON.parse(JSON.stringify(value[0])) : "";
                                        dispatch(addItemToArray({ path: currentPath, item: newItem }));
                                    }}
                                    className="px-3 py-1.5 bg-gray-50 hover:bg-black hover:text-white rounded-lg text-[11px] font-bold flex items-center gap-2 transition-all group"
                                >
                                    <Plus size={14} />
                                    <span>ADD ITEM</span>
                                </button>
                            </div>
                            <div className="space-y-6 pl-4 border-l-2 border-gray-100">
                                {value.map((item, index) => (
                                    <div key={index} className="relative group/item ml-2">
                                        <div className="absolute -left-[38px] top-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => dispatch(removeItemFromArray({ path: currentPath, index }))}
                                                className="p-1.5 bg-white text-gray-300 hover:text-red-500 hover:shadow-sm rounded-lg border border-gray-100 transition-all"
                                                title="Remove item"
                                            >
                                                <Trash2 size={13} />
                                            </button>
                                        </div>
                                        <RenderFields data={item} path={[...currentPath, index]} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                }

                // ✅ OBJECT
                if (typeof value === "object" && value !== null) {
                    return (
                        <div key={currentPath.join(".")} className="mt-8 mb-6">
                            <h3 className="text-[14px] font-black text-gray-900 mb-5 pb-2 border-b border-gray-50 uppercase tracking-tight">
                                {key.replace(/([A-Z])/g, ' $1')}
                            </h3>
                            <div className="pl-2">
                                 <RenderFields data={value} path={currentPath} />
                            </div>
                        </div>
                    );
                }

                return null;
            })}
        </>
    );
}

export default RenderFields;