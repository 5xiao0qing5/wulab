import React, { useState, useEffect } from 'react';
import { Mail, MapPin, ExternalLink, BookOpen, Microscope, Award, ChevronRight, Activity, X } from 'lucide-react';

// --- 字体注入 (诺贝尔奖状艺术感) ---
const InjectFonts = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Playfair+Display:ital,wght@0,700;1,400&display=swap');
    .font-nobel-title { font-family: 'Playfair Display', serif; }
    .font-nobel-script { font-family: 'Dancing Script', cursive; }
  `}} />
);

interface Publication {
  year: string;
  title: string;
  journal: string;
  doi: string;
}

interface ResearchDir {
  id: string;
  title: string;
  description: string;
  details: string[];
}

const PROFILE = {
  name: "Min Wu, Ph.D.",
  title: "Professor & Ph.D. Supervisor",
  department: "Department of Radiology",
  institution: "West China Hospital, Sichuan University",
  email: "wuminscu@scu.edu.cn",
  orcidLink: "https://orcid.org/0000-0002-7733-2498",
  // 1. 日常头像
  avatar: "http://www.754956.xyz:40078/?explorer/share/file&hash=d30fUcnL1EhvkiHKpy8g8V0H64zfwfk3twAqrCFIMZi0XJoMr_eZ6n0Nq-l7esXESzs",
  // 2. 诺贝尔艺术照 (已经调整为更大展示面积)
  nobelPhoto: "http://www.754956.xyz:40078/?explorer/share/file&hash=5c5f19CI5PYMT9urt2QXkVxOkFKYEmRjTF1gZRf0zOElg6r03OnYtqGuHmNy52knm6Y"
};

const RESEARCH_DIRS: ResearchDir[] = [
  {
    id: "m-imaging",
    title: "Molecular Imaging",
    description: "Multi-modality imaging of biological processes at the molecular level.",
    details: ["MRI/CT Contrast Agents", "Optical Imaging in NIR-II window", "Micro-PET/CT Evaluation"]
  },
  {
    id: "smart-nanoprobe",
    title: "Smart Nanoprobes",
    description: "Responsive nanoplatforms for precise tumor targeting and sensing.",
    details: ["Stimuli-responsive Release", "Targeted Delivery (Glioblastoma)", "Signal Amplification Strategies"]
  },
  {
    id: "hydrogels",
    title: "Theranostic Hydrogels",
    description: "Injectable and biodegradable hydrogels for local therapy and monitoring.",
    details: ["Post-operative Recurrence Prevention", "Controlled Drug Delivery", "Tissue Engineering Matrix"]
  },
  {
    id: "brain-disorders",
    title: "CNS Diseases Diagnosis",
    description: "Advanced diagnostic strategies for Glioblastoma and Alzheimer's disease.",
    details: ["BBB Penetration", "Aβ Plaque Visualization", "Neuroinflammation Imaging"]
  }
];

// --- 核心组件 ---

const Header = () => (
  <header className="bg-white/80 border-b border-slate-200 sticky top-0 z-40 backdrop-blur-md">
    <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center space-x-2 text-slate-800">
        <Activity className="w-5 h-5 text-blue-600" />
        <span className="font-bold text-lg tracking-tight uppercase">Wu Lab</span>
      </div>
      <nav className="hidden md:flex space-x-8 text-xs font-bold text-slate-500">
        {['About', 'Research', 'Publications'].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-blue-600 transition-colors uppercase tracking-[0.2em]">{item}</a>
        ))}
      </nav>
    </div>
  </header>
);

const Hero = ({ onSecretTrigger }: { onSecretTrigger: () => void }) => {
  const [clicks, setClicks] = useState(0);
  const handleAvatarClick = () => {
    setClicks(prev => {
      if (prev + 1 >= 5) { onSecretTrigger(); return 0; }
      return prev + 1;
    });
  };

  return (
    <section id="about" className="pt-24 pb-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
        <div className="relative cursor-pointer" onClick={handleAvatarClick}>
          {/* 头像：完全静止 */}
          <div className="w-64 h-64 rounded-3xl overflow-hidden border-[12px] border-white shadow-2xl bg-slate-200 relative z-10 select-none">
            <img src={PROFILE.avatar} alt={PROFILE.name} className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -z-0"></div>
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] rounded mb-6">Principal Investigator</div>
          <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">{PROFILE.name}</h1>
          <p className="text-xl text-slate-500 font-medium mb-8 leading-relaxed">
            {PROFILE.title} at <span className="text-slate-800">{PROFILE.institution}</span>
          </p>
          
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
               <a href={PROFILE.orcidLink} target="_blank" rel="noreferrer" className="px-6 py-3 bg-slate-900 text-white rounded-full text-sm font-bold shadow-xl hover:bg-blue-600 transition-all">ORCID Profile</a>
               <a href="#publications" className="px-6 py-3 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-600 hover:border-blue-600 transition-all">Selected Works</a>
            </div>
            {/* 邮箱：静止，明文展示 */}
            <div className="flex items-center justify-center md:justify-start gap-3 text-slate-500">
              <div className="p-2 bg-slate-100 rounded-full">
                <Mail size={16} />
              </div>
              <span className="font-mono text-sm tracking-tighter font-bold border-b border-blue-200">
                {PROFILE.email}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ResearchModal = ({ data, onClose }: { data: ResearchDir | null, onClose: () => void }) => {
  if (!data) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <div className="bg-white rounded-3xl max-w-lg w-full p-10 shadow-2xl relative animate-in fade-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-300 hover:text-slate-900 transition-colors"><X size={28} /></button>
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-200"><Microscope size={28} /></div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">{data.title}</h3>
        </div>
        <p className="text-slate-500 mb-8 leading-relaxed text-lg">{data.description}</p>
        <div className="space-y-3">
          <p className="text-[10px] uppercase text-slate-400 font-black tracking-[0.2em] mb-4">Core Focus Areas</p>
          {data.details.map((detail, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl text-slate-700 font-bold text-sm border border-slate-100 italic transition-all hover:translate-x-1">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              {detail}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Research = () => {
  const [selected, setSelected] = useState<ResearchDir | null>(null);
  return (
    <section id="research" className="py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Research Directions</h2>
          <p className="text-slate-400 font-medium">Interdisciplinary focus on molecular-level medical solutions.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {RESEARCH_DIRS.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setSelected(item)}
              className="group p-10 rounded-3xl border border-slate-100 bg-slate-50 hover:bg-white transition-all duration-500 cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-blue-100 relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-black text-slate-800 group-hover:text-blue-600 transition-colors uppercase">{item.title}</h3>
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <ChevronRight size={20} />
                  </div>
                </div>
                <p className="text-slate-500 group-hover:text-slate-600 leading-relaxed">{item.description}</p>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
            </div>
          ))}
        </div>
      </div>
      <ResearchModal data={selected} onClose={() => setSelected(null)} />
    </section>
  );
};

const Publications = () => {
  const [pubs, setPubs] = useState<Publication[]>([]);
  useEffect(() => {
    setPubs([
      { year: "2026", title: "A multifunctional injectable MPDA@MTIC–Co hydrogel platform for synergistic chemotherapy–photothermal therapy of postoperative glioblastoma", journal: "Bioactive Materials", doi: "10.1016/j.bioactmat.2025" },
      { year: "2026", title: "Dynamic Visualization of Amyloid-β Plaques with a Novel NIR-II Reporter", journal: "Analytical Chemistry", doi: "10.1021/acs.analchem.5c07821" },
      { year: "2025", title: "Monitoring Acidification Preceding Aβ Deposition in Alzheimer's Disease", journal: "Advanced Healthcare Materials", doi: "10.1002/adhm.2025" }
    ]);
  }, []);

  return (
    <section id="publications" className="py-32 bg-slate-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-end justify-between mb-16 border-b border-slate-200 pb-8">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Publications</h2>
            <p className="text-slate-400 font-medium mt-2 uppercase tracking-widest text-[10px]">Synchronized with <span className="text-blue-600 font-bold">ORCID</span> database</p>
          </div>
        </div>
        <div className="grid gap-6">
          {pubs.map((pub, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:border-blue-400 transition-all hover:shadow-xl group">
              <div className="flex gap-6">
                <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full h-fit tracking-widest leading-none">{pub.year}</span>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-blue-700 transition-colors leading-snug tracking-tight">{pub.title}</h4>
                  <div className="flex flex-wrap items-center gap-6">
                    <p className="text-sm text-slate-400 italic font-medium">{pub.journal}</p>
                    {pub.doi && <span className="text-[10px] font-mono text-slate-300 font-bold uppercase tracking-widest">DOI: {pub.doi}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const NobelModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/98 backdrop-blur-2xl animate-in fade-in duration-1000" onClick={onClose}></div>
      <div className="relative w-full max-w-5xl bg-[#fdfbf7] rounded-sm shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] flex flex-col md:flex-row border-[1px] border-[#d4af37]/20 overflow-hidden animate-in zoom-in-95 duration-700">
        
        <button onClick={onClose} className="absolute top-6 right-8 z-[110] text-slate-400 hover:text-slate-900 hover:scale-110 transition-all">
          <X size={32} strokeWidth={1} />
        </button>

        {/* 左页：艺术照 - 优化了边距，让图片更舒展 */}
        <div className="w-full md:w-[42%] p-2 md:p-10 bg-[#f4f1ea] border-r border-[#d4af37]/10 flex items-center justify-center relative">
          <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>
          
          {/* 这里是修正后的相册容器：边距极窄，消除“框中框”感 */}
          <div className="w-full max-w-sm aspect-[3/4] bg-white p-1.5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] relative z-10">
            <img src={PROFILE.nobelPhoto} alt="Nobel Laureate" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* 右页：证书内容 */}
        <div className="w-full md:w-[58%] p-12 md:p-16 flex flex-col items-center text-center justify-center bg-[#fdfbf7] relative">
          <div className="absolute inset-10 border border-[#d4af37]/5 pointer-events-none"></div>

          {/* 右上角奖章：固定尺寸 */}
          <div className="mb-6 w-28 h-28 relative">
             <div className="absolute inset-0 rounded-full bg-[#d4af37]/20 blur-2xl"></div>
             <img 
               src="http://www.754956.xyz:40078/?explorer/share/file&hash=f71e_SW9jmPW_GbEl1nRdQ0fNyYwdSZm3Ij7czjKvKDhuctv2adbESYmsGiIrx04-QE" 
               alt="Nobel Medal" 
               className="w-full h-full object-contain relative z-10 drop-shadow-xl"
             />
          </div>

          <div className="space-y-5">
            <p className="font-nobel-title text-slate-400 uppercase tracking-[0.4em] text-[10px] mb-2">The Nobel Assembly at</p>
            <h2 className="font-nobel-title text-3xl font-bold text-slate-900 mb-6 border-b border-[#d4af37]/30 pb-6 tracking-tighter uppercase leading-tight">Karolinska Institutet</h2>
            <p className="font-nobel-title text-slate-500 italic text-sm mb-2">has today decided to award the</p>
            <div className="py-3 px-6 border-2 border-[#d4af37]/30 inline-block bg-[#d4af37]/5 mb-2">
              <h3 className="font-nobel-title font-bold text-[#aa8400] text-lg uppercase tracking-[0.2em]">2030 Nobel Prize in Physiology or Medicine</h3>
            </div>
            
            <h1 className="font-nobel-script text-7xl text-slate-900 py-4 select-none drop-shadow-sm">
              Min Wu
            </h1>
            
            <p className="font-nobel-title text-slate-700 text-lg italic max-w-sm leading-relaxed border-t border-slate-100 pt-6">
              "for groundbreaking discoveries in smart molecular imaging and precision theranostic systems."
            </p>
          </div>

          <div className="mt-12 w-full flex justify-between px-6">
              <div className="text-left font-nobel-title">
                <p className="text-[9px] text-slate-400 uppercase tracking-widest mb-1">Stockholm</p>
                <p className="text-xs font-bold text-slate-800">Dec 10, 2030</p>
              </div>
              <div className="text-right font-nobel-title">
                <p className="text-[9px] text-slate-400 uppercase tracking-widest mb-1 tracking-tighter">Secretary General</p>
                <p className="font-nobel-script text-xl text-slate-900 h-8 decoration-[#d4af37]">Thomas Perlmann</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [showNobel, setShowNobel] = useState(false);
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      <InjectFonts />
      <Header />
      <Hero onSecretTrigger={() => setShowNobel(true)} />
      <Research />
      <Publications />
      <footer className="py-20 bg-slate-950 text-slate-700 text-[10px] text-center uppercase tracking-[0.4em] font-black">
        <div className="max-w-5xl mx-auto px-6 border-t border-white/5 pt-16">
           &copy; {new Date().getFullYear()} Min Wu Laboratory / West China Hospital
        </div>
      </footer>
      <NobelModal isOpen={showNobel} onClose={() => setShowNobel(false)} />
    </div>
  );
}