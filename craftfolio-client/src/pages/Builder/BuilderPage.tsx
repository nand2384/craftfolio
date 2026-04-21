import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from 'react-resizable-panels';
import { useParams } from 'react-router-dom';
import BuilderNavbar from '../../components/navigation/BuilderNavbar';
import Sidebar from '../../components/layout/Sidebar';
import PreviewCanvas from '../../components/layout/PreviewCanvas';

export default function BuilderPage() {
  const { templateId } = useParams<{ templateId: string }>();

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden font-sans">
      <BuilderNavbar />
      
      <div className="flex-1 min-h-0 relative">
        <PanelGroup orientation="horizontal" id="main-layout" className="h-full w-full">
          <Panel defaultSize="70%" minSize="30%">
            <PreviewCanvas templateId={templateId} />
          </Panel>
          
          <PanelResizeHandle className="w-1 bg-gray-300 hover:bg-[#4CAF7D] transition-colors cursor-col-resize relative group shrink-0 z-[100]">
            <div className="absolute inset-y-0 -left-2 -right-2 cursor-col-resize" />
          </PanelResizeHandle>
          
          <Panel defaultSize="30%" minSize="20%" maxSize="50%">
            <Sidebar />
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}
