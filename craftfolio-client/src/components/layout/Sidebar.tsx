import * as Accordion from '@radix-ui/react-accordion';
import * as Switch from '@radix-ui/react-switch';
import { ChevronDown, Palette } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSection } from '../../redux/features/preview/dataSlice';
import type { RootState } from '../../redux/store';
import { iconMap } from '../../templates/template1/utils/iconMap';
import RenderFields from '../builder/RenderFields';
import PalettePicker from '../builder/PalettePicker';

export default function Sidebar() {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data.data) as any;

  const sectionsNavigation = data.navigation?.items || [];

  return (
    <div className="h-full border-l border-gray-100 bg-white flex flex-col">
      <div className="p-6 border-b border-gray-50 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <h2 className="text-[17px] font-bold text-gray-900 tracking-tight">Editor</h2>
        <p className="text-[13px] text-gray-500 mt-1 font-medium">Personalize your portfolio</p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-5">
        <Accordion.Root type="multiple" defaultValue={['theme']} className="space-y-3">
          
          {/* Theme Section */}
          <Accordion.Item
            value="theme"
            className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all data-[state=open]:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.04)] data-[state=open]:border-gray-200"
          >
            <Accordion.Header className="flex">
              <div className="w-full px-5 py-4.5 flex items-center justify-between hover:bg-gray-50/50 transition-colors group text-left border-b border-gray-50">
                <div className="flex items-center gap-3.5 flex-1">
                  <Accordion.Trigger className="flex items-center gap-2.5 flex-1 cursor-pointer">
                    <Palette className="w-4 h-4 text-gray-400 group-data-[state=open]:text-black transition-colors" />
                    <span className="text-[14px] font-semibold text-gray-700 group-data-[state=open]:text-black">
                      Theme
                    </span>
                  </Accordion.Trigger>
                </div>
                <Accordion.Trigger className="cursor-pointer">
                  <ChevronDown className="w-4 h-4 text-gray-300 transition-transform group-data-[state=open]:rotate-180 group-hover:text-gray-400" />
                </Accordion.Trigger>
              </div>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up font-sans">
              <div className="px-5 pb-6 pt-4">
                <PalettePicker />
              </div>
            </Accordion.Content>
          </Accordion.Item>

          {sectionsNavigation.map((section: any) => {
            const isOpen = data.sections?.[section.id];
            const isToggle = section.toggle;

            return (
              <Accordion.Item
                key={section.id}
                value={section.id}
                className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all data-[state=open]:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.04)] data-[state=open]:border-gray-200"
              >
                <Accordion.Header className="flex">
                  <div className="w-full px-5 py-4.5 flex items-center justify-between hover:bg-gray-50/50 transition-colors group text-left border-b border-gray-50">
                    <div className="flex items-center gap-3.5 flex-1">
                      {isToggle && (
                        <div className="flex items-center justify-center">
                        <Switch.Root 
                          checked={!!isOpen}
                          onCheckedChange={() => dispatch(toggleSection({ sectionId: section.id }))}
                          className="w-9 h-5 rounded-full bg-gray-100 data-[state=checked]:bg-black transition-all shadow-inner relative cursor-pointer"
                          >
                          <Switch.Thumb className="block w-4 h-4 bg-white rounded-full shadow-md transition-transform data-[state=checked]:translate-x-4.5 translate-x-0.5" />
                        </Switch.Root>
                      </div>
                      )}
                      <Accordion.Trigger className="flex items-center gap-2.5 flex-1 cursor-pointer">
                        {(() => {
                          const Icon = iconMap[section.icon];
                          return Icon ? <Icon className="w-4 h-4 text-gray-400 group-data-[state=open]:text-black transition-colors" /> : null;
                        })()}
                        <span className="text-[14px] font-semibold text-gray-700 group-data-[state=open]:text-black">
                          {section.name}
                        </span>
                      </Accordion.Trigger>
                    </div>
                    <Accordion.Trigger className="cursor-pointer">
                      <ChevronDown className="w-4 h-4 text-gray-300 transition-transform group-data-[state=open]:rotate-180 group-hover:text-gray-400" />
                    </Accordion.Trigger>
                  </div>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up font-sans">
                  <div className="px-5 pb-6 pt-4">
                    {data[section.id] ? (
                      <RenderFields data={data[section.id]} path={[section.id]} />
                    ) : (
                      <p className="text-[12px] text-gray-400 italic">No editable fields for this section.</p>
                    )}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            )
          })}
        </Accordion.Root>
      </div>
    </div>
  );
}