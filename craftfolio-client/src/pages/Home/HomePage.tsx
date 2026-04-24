import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Sparkles, Layout, Monitor, Zap, 
  RotateCcw, Download, Check, ChevronDown, 
  Layers, Palette, ShieldCheck, Code2 
} from 'lucide-react';
import { useState } from 'react';

const HomePage = () => {
  const navigate = useNavigate();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6 }
    })
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#4CAF7D] selection:text-white">

      {/* --- HERO SECTION --- */}
      <section className="relative pt-12 pb-32 px-8 overflow-hidden bg-white">
        {/* Abstract background decorations */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-150 bg-slate-50 rounded-full blur-[120px] opacity-60"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 border border-slate-100 bg-white rounded-full shadow-sm mb-10"
          >
            <Sparkles size={16} className="text-[#4CAF7D]" />
            <span className="text-[10px] sm:text-xs font-black tracking-widest text-[#4CAF7D] uppercase">New Themes Added Every Week</span>
          </motion.div>

          <motion.h1 
            custom={0} variants={fadeIn} initial="hidden" animate="visible"
            className="text-5xl md:text-8xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter"
          >
            Zero Code. <br />
            <span className="text-slate-300">Pure Craft.</span>
          </motion.h1>

          <motion.p 
            custom={1} variants={fadeIn} initial="hidden" animate="visible"
            className="text-xl md:text-2xl text-slate-500 max-w-3xl mb-12 leading-relaxed"
          >
            Create stunning, professional portfolios by just <span className="text-slate-900 font-bold">clicking</span>. Less typing, no debugging, just high-end design in minutes.
          </motion.p>

          <motion.div 
            custom={2} variants={fadeIn} initial="hidden" animate="visible"
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <button 
              onClick={() => navigate('/select-profession')}
              className="px-10 py-5 bg-slate-900 text-white rounded-[2rem] font-black text-lg hover:bg-slate-800 transition-all shadow-2xl shadow-slate-900/10 flex items-center gap-4 group"
            >
              Start Your Craft <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-5 text-slate-900 font-bold hover:bg-slate-50 rounded-[2rem] transition-all">
              See Showcase
            </button>
          </motion.div>

          {/* Hero Visual */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-24 w-full max-w-5xl bg-white border border-slate-200 rounded-[3rem] p-4 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] relative cursor-default group"
          >
             <div className="absolute top-8 left-10 flex gap-2">
                <div className="w-3 h-3 bg-slate-200 rounded-full"></div>
                <div className="w-3 h-3 bg-slate-200 rounded-full"></div>
                <div className="w-3 h-3 bg-slate-200 rounded-full"></div>
             </div>
             <div className="w-full aspect-video bg-slate-50 rounded-[2.5rem] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#4CAF7D]/5 to-transparent"></div>
                <div className="z-10 text-center px-6">
                   <div className="w-16 h-16 bg-[#4CAF7D] rounded-2xl flex items-center justify-center text-white mb-6 mx-auto shadow-lg">
                      <Zap fill="currentColor" />
                   </div>
                   <h3 className="text-2xl font-black text-slate-900 mb-2">Live Interactive Editor</h3>
                   <p className="text-slate-500 max-w-xs">Change everything without touching a single line of code.</p>
                </div>
                {/* Floating UI Mocks */}
                <div className="absolute top-10 right-10 w-48 h-32 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 transform rotate-6 group-hover:rotate-3 transition-transform">
                   <div className="h-2 w-1/2 bg-slate-100 mb-2 rounded"></div>
                   <div className="h-2 w-full bg-slate-50 mb-2 rounded"></div>
                   <div className="h-6 w-1/4 bg-[#4CAF7D]/20 rounded ml-auto"></div>
                </div>
                <div className="absolute bottom-10 left-10 w-48 h-32 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 transform -rotate-12 group-hover:-rotate-6 transition-transform">
                   <div className="flex gap-2 mb-4">
                      <div className="w-6 h-6 rounded-full bg-slate-200"></div>
                      <div className="h-2 w-3/4 bg-slate-100 mt-2 rounded"></div>
                   </div>
                   <div className="h-2 w-full bg-slate-50 rounded"></div>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* --- FEATURES CROSS-CHECK SECTION --- */}
      <section className="py-24 px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xs font-black tracking-widest text-slate-400 uppercase mb-4">Powerful Features</h2>
            <p className="text-4xl font-black text-slate-900">Why creators choose <span className="text-[#4CAF7D]">Craftfolio.</span></p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'React Powered', desc: 'Every site is optimized React code, fast and clean.', icon: Layout },
              { title: 'Responsive Control', desc: 'Live preview on Desktop, Tablet and Mobile.', icon: Monitor },
              { title: 'No-Code Canvas', desc: 'No terminal, no syntax, just pure creativity.', icon: Zap },
              { title: 'Social Integration', desc: 'One-click links to LinkedIn, GitHub and X.', icon: ShieldCheck },
            ].map((f, i) => (
              <motion.div 
                key={f.title} custom={i} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-[#4CAF7D]/5 transition-all group"
              >
                <div className="p-4 bg-slate-50 rounded-2xl w-fit group-hover:bg-[#4CAF7D] group-hover:text-white transition-colors mb-6">
                  <f.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- BENTO GRID SHOWCASE --- */}
      <section className="py-32 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2 bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden group min-h-[450px]">
                 <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                       <h2 className="text-4xl font-black mb-6 leading-tight">Build with components, <br /> not complexity.</h2>
                       <p className="text-slate-400 max-w-sm mb-10 leading-relaxed text-lg italic">"I spent months on my personal site. With Craftfolio, it was ready in 4 minutes."</p>
                    </div>
                    <button className="w-fit flex items-center gap-2 text-[#4CAF7D] font-black tracking-widest uppercase text-xs group-hover:gap-4 transition-all">
                       Explore Component Library <ArrowRight size={16} />
                    </button>
                 </div>
                 {/* Visual Background Decoration */}
                 <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-slate-800 to-transparent p-12 hidden md:flex items-center">
                    <div className="grid grid-cols-2 gap-4 w-full rotate-12 transform scale-125 opacity-40 group-hover:rotate-6 transition-transform">
                       {[1,2,3,4,5,6].map(i => (
                         <div key={i} className="h-32 bg-slate-700 rounded-2xl"></div>
                       ))}
                    </div>
                 </div>
              </div>
              <div className="bg-[#4CAF7D] rounded-[3rem] p-12 text-white flex flex-col justify-center relative overflow-hidden group">
                 <Layers size={80} className="absolute -bottom-6 -right-6 opacity-20 transform -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                 <h2 className="text-3xl font-black mb-4">Unlimited Layers</h2>
                 <p className="text-white/80 leading-relaxed mb-8">Add, remove, or reorder sections with simple intuitive controls.</p>
                 <div className="mt-auto h-4 w-1/2 bg-white/20 rounded-full relative overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '85%' }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="absolute inset-y-0 left-0 bg-white"
                    ></motion.div>
                 </div>
                 <p className="mt-2 text-[10px] font-bold tracking-widest uppercase opacity-60">85% Faster Deployment</p>
              </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-slate-50 rounded-[3rem] p-12 flex flex-col gap-8 relative overflow-hidden">
                <Palette size={40} className="text-[#4CAF7D]" />
                <h3 className="text-2xl font-black">Color Palettes</h3>
                <p className="text-slate-500">Pick from curated sets or define your brand colors in one click.</p>
                <div className="flex gap-2 mt-4">
                  {['#4CAF7D', '#000000', '#F1F5F9', '#DBEAFE'].map(c => (
                    <div key={c} style={{ backgroundColor: c }} className="w-10 h-10 rounded-full border border-slate-200 shadow-sm"></div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-2 bg-slate-100 rounded-[3rem] p-12 flex items-center justify-between group" >
                 <div className="max-w-xs">
                    <p className="text-[#4CAF7D] font-black uppercase text-xs tracking-widest mb-4">Tech Specs</p>
                    <h3 className="text-3xl font-black mb-4">Pure React 19 Export</h3>
                    <p className="text-slate-500">When you're happy with the result, hit Export and get a full React codebase ready to deploy.</p>
                 </div>
                 <div className="hidden md:flex relative gap-4">
                    <div className="flex flex-col gap-4">
                       <Download className="w-12 h-12 text-slate-300" />
                       <RotateCcw className="w-12 h-12 text-slate-300 transform -rotate-90" />
                    </div>
                    <div className="w-32 h-32 bg-white rounded-3xl shadow-xl flex items-center justify-center border border-slate-200">
                       <Code2 size={40} className="text-slate-900" />
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* --- STEPS SECTION --- */}
      <section className="py-24 px-8 bg-black text-white">
         <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl font-black text-center mb-24">Three simple clicks to <span className="text-[#4CAF7D]">done.</span></h2>
            
            <div className="flex flex-col md:flex-row gap-16 items-start">
               {[
                 { step: '01', title: 'Pick your Craft', desc: 'Tell us your profession and we will suggest themes that rank high in your industry.' },
                 { step: '02', title: 'Customize Layout', desc: 'Click to add sections, drag to move them. Type only when you want to tell your story.' },
                 { step: '03', title: 'Export Code', desc: 'Download the high-performance React source code, ready for any hosting provider.' },
               ].map((s, i) => (
                 <div key={s.step} className="flex-1 group">
                    <span className="text-6xl font-black text-white/10 group-hover:text-[#4CAF7D]/20 transition-colors mb-6 block">{s.step}</span>
                    <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{s.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-32 px-8 bg-white" >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-16">Frequently Asked <span className="text-slate-300 underline underline-offset-8 decoration-8 decoration-[#4CAF7D]/30">Questions.</span></h2>
          <div className="space-y-6">
            {[
              { q: 'Is it free to use?', a: 'Yes, you can build and preview your site for free. Exporting the code requires a pro license.' },
              { q: 'Can I export to plain HTML?', a: 'Currently we focus on high-performance React codebases to ensure best developer experience.' },
              { q: 'How many templates do you add?', a: 'We release 1-2 new premium templates every single week across different industries.' },
              { q: 'Do I need to know how to code?', a: 'Absolutely not. Craftfolio is designed for zero-code building, from layout to styles.' },
            ].map((faq, i) => (
              <AccordionItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section className="py-24 px-8 bg-slate-50">
         <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Simple, transparent <span className="text-[#4CAF7D]">Pricing.</span></h2>
            <p className="text-slate-500">No hidden fees. Pick the plan that suits your growth.</p>
         </div>
         <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <div className="bg-white p-12 rounded-[2.5rem] border border-slate-200 flex flex-col items-center">
               <h3 className="text-xl font-bold mb-2">Hobby</h3>
               <p className="text-4xl font-black mb-6">$0 <span className="text-sm text-slate-400 font-medium">/ forever</span></p>
               <ul className="text-slate-500 space-y-4 mb-10 w-full text-left">
                  <li className="flex items-center gap-3"><Check size={18} className="text-[#4CAF7D]" /> Unlimited Drafts</li>
                  <li className="flex items-center gap-3"><Check size={18} className="text-[#4CAF7D]" /> Free Templates</li>
                  <li className="flex items-center gap-3 text-slate-300"><Check size={18} /> React Export</li>
               </ul>
               <button className="w-full py-4 border-2 border-slate-900 rounded-full font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-colors">Current Plan</button>
            </div>
            {/* Pro Plan */}
            <div className="bg-slate-900 p-12 rounded-[2.5rem] text-white flex flex-col items-center relative overflow-hidden">
               <div className="absolute top-6 right-6 bg-[#4CAF7D] px-3 py-1 rounded text-[10px] font-black tracking-widest">MOST POPULAR</div>
               <h3 className="text-xl font-bold mb-2">Professional</h3>
               <p className="text-4xl font-black mb-6">$19 <span className="text-sm text-slate-500 font-medium">/ month</span></p>
               <ul className="text-slate-400 space-y-4 mb-10 w-full text-left">
                  <li className="flex items-center gap-3"><Check size={18} className="text-[#4CAF7D]" /> Everything in Hobby</li>
                  <li className="flex items-center gap-3"><Check size={18} className="text-[#4CAF7D]" /> Weekly Premium Themes</li>
                  <li className="flex items-center gap-3"><Check size={18} className="text-[#4CAF7D]" /> React Source Export</li>
               </ul>
               <button onClick={() => navigate('/select-profession')} className="w-full py-4 bg-[#4CAF7D] text-white rounded-full font-black text-sm uppercase tracking-widest hover:bg-[#3d8b63] transition-colors shadow-xl shadow-[#4CAF7D]/20">Get Started Now</button>
            </div>
         </div>
      </section>

      {/* --- FINAL CTA SECTION --- */}
      <section className="py-20 px-8">
         <div className="max-w-7xl mx-auto">
            <div className="bg-[#4CAF7D] rounded-[3rem] p-12 md:p-24 text-white text-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
               <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter">Your career deserves <br /> a better frame.</h2>
               <button onClick={() => navigate('/select-profession')} className="inline-flex items-center gap-4 bg-white text-[#4CAF7D] px-10 py-5 rounded-full font-black text-xl hover:scale-105 transition-transform shadow-2xl">
                  Build Your Site <ArrowRight size={20} />
               </button>
               <p className="mt-8 text-white/60 font-medium">Join 5,000+ creators building on Craftfolio.</p>
            </div>
         </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 px-8 border-t border-slate-100 bg-white">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16">
            <div className="max-w-xs">
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                   <Code2 className="w-4 h-4 text-white" />
                 </div>
                 <span className="font-black text-xl tracking-tight text-slate-900">Craftfolio</span>
               </div>
               <p className="text-slate-500 text-sm leading-relaxed mb-8">
                  The ultimate React builder for designers, developers, and makers. Export clean code by default.
               </p>
               <div className="flex gap-4">
                  <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"><RotateCcw size={18} /></div>
                  <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"><Download size={18} /></div>
               </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 sm:gap-24">
               <div>
                  <h4 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-6">Product</h4>
                  <ul className="space-y-4 text-sm font-bold text-slate-600">
                     <li className="hover:text-slate-900 cursor-pointer">Components</li>
                     <li className="hover:text-slate-900 cursor-pointer">Themes</li>
                     <li className="hover:text-slate-900 cursor-pointer">Pricing</li>
                  </ul>
               </div>
               <div>
                  <h4 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-6">Community</h4>
                  <ul className="space-y-4 text-sm font-bold text-slate-600">
                     <li className="hover:text-slate-900 cursor-pointer">Discord</li>
                     <li className="hover:text-slate-900 cursor-pointer">Showcase</li>
                     <li className="hover:text-slate-900 cursor-pointer">X / Twitter</li>
                  </ul>
               </div>
               <div>
                  <h4 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-6">Support</h4>
                  <ul className="space-y-4 text-sm font-bold text-slate-600">
                     <li className="hover:text-slate-900 cursor-pointer">Documentation</li>
                     <li className="hover:text-slate-900 cursor-pointer">Contact</li>
                     <li className="hover:text-slate-900 cursor-pointer">Privacy</li>
                  </ul>
               </div>
            </div>
         </div>
         <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-slate-50 flex flex-col sm:flex-row justify-between text-xs font-bold text-slate-400 gap-4">
            <p>© 2026 Craftfolio AI. Built with React and Love.</p>
            <p>DESIGNED FOR THE NEXT GENERATION OF MAKERS</p>
         </div>
      </footer>
    </div>
  );
};

const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-slate-100 rounded-3xl overflow-hidden hover:border-slate-200 transition-all shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 flex items-center justify-between text-left font-bold text-lg hover:bg-slate-50 transition-colors"
      >
        <span>{question}</span>
        <ChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <motion.div 
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="px-8 pb-8 text-slate-500 leading-relaxed font-medium">
          {answer}
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
