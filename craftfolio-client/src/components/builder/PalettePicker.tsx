import { useDispatch, useSelector } from 'react-redux';
import { updateField } from '../../redux/features/preview/dataSlice';
import type { RootState } from '../../redux/store';
import { Pipette, RotateCcw } from 'lucide-react';

const PRESETS = [
  {
    name: "Emerald Professional",
    colors: {
      highlight: "#4CAF7D",
      highlightDark: "#2E7D32",
      pageBg: "#FDFBF6",
      sectionBg: "#FFFFFF",
      textMain: "#1A1A1A",
      textMuted: "#666666",
      softAccentBg: "#E8F5E9"
    }
  },
  {
    name: "Midnight Slate",
    colors: {
      highlight: "#3B82F6",
      highlightDark: "#1D4ED8",
      pageBg: "#0F172A",
      sectionBg: "#1E293B",
      textMain: "#F8FAFC",
      textMuted: "#94A3B8",
      softAccentBg: "#1E293B"
    }
  },
  {
    name: "Modern Minimal",
    colors: {
      highlight: "#000000",
      highlightDark: "#333333",
      pageBg: "#F3F4F6",
      sectionBg: "#FFFFFF",
      textMain: "#111827",
      textMuted: "#4B5563",
      softAccentBg: "#E5E7EB"
    }
  },
  {
    name: "Royal Purple",
    colors: {
      highlight: "#8B5CF6",
      highlightDark: "#6D28D9",
      pageBg: "#F5F3FF",
      sectionBg: "#FFFFFF",
      textMain: "#1E1B4B",
      textMuted: "#4338CA",
      softAccentBg: "#EDE9FE"
    }
  }
];

export default function PalettePicker() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.data.data.theme) || {};

  const handleColorChange = (key: string, value: string) => {
    dispatch(updateField({ path: ['theme', key], value }));
  };

  const applyPreset = (colors: typeof PRESETS[0]['colors']) => {
    Object.entries(colors).forEach(([key, value]) => {
      dispatch(updateField({ path: ['theme', key], value }));
    });
  };

  const colorLabels: Record<string, string> = {
    highlight: "Primary Action",
    highlightDark: "Action Hover",
    pageBg: "Site Background",
    sectionBg: "Section Background",
    textMain: "Heading Text",
    textMuted: "Body Text",
    softAccentBg: "Soft Accent"
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Presets Grid */}
      <div>
        <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">Curated Presets</h4>
        <div className="grid grid-cols-2 gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset.colors)}
              className="group p-2.5 rounded-xl border border-gray-100 bg-white hover:border-black/10 hover:shadow-md transition-all text-left overflow-hidden ring-offset-2 hover:ring-2 hover:ring-gray-100"
            >
              <div className="flex gap-1 mb-2">
                <div className="w-4 h-4 rounded-full shadow-inner" style={{ backgroundColor: preset.colors.highlight }} />
                <div className="w-4 h-4 rounded-full shadow-inner" style={{ backgroundColor: preset.colors.pageBg }} />
                <div className="w-4 h-4 rounded-full shadow-inner" style={{ backgroundColor: preset.colors.textMain }} />
              </div>
              <span className="text-[12px] font-semibold text-gray-700 block truncate group-hover:text-black">
                {preset.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Picker */}
      <div>
        <div className="flex items-center justify-between mb-4 px-1">
          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Custom Colors</h4>
          <button 
            onClick={() => applyPreset(PRESETS[0].colors)}
            className="text-[10px] flex items-center gap-1 text-gray-400 hover:text-black transition-colors font-medium border border-gray-100 rounded-full px-2 py-0.5"
          >
            <RotateCcw size={10} />
            Reset
          </button>
        </div>
        <div className="space-y-3">
          {Object.entries(colorLabels).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between group p-2 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="color"
                    value={theme[key] || "#000000"}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer border-none p-0 overflow-hidden shadow-sm hover:scale-110 transition-transform"
                  />
                  <div className="absolute inset-0 rounded-lg pointer-events-none ring-1 ring-inset ring-black/5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-medium text-gray-700">{label}</span>
                  <span className="text-[10px] text-gray-400 font-mono uppercase leading-none">{theme[key]}</span>
                </div>
              </div>
              <Pipette size={14} className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>

      {/* Advanced Note */}
      <div className="p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
        <p className="text-[11px] text-gray-500 leading-relaxed italic text-center">
          "Colors define your vibe. Choose a preset to get started, then tweak individual shades."
        </p>
      </div>
    </div>
  );
}
