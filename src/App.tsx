import { useState, useEffect } from 'react';
import { Mail, Activity, Microscope, ChevronRight, X } from 'lucide-react';

// --- 导入本地静态资源 ---
import avatarImg from './assets/avatar.jpg';
import nobelPhotoImg from './assets/nobel-photo.jpg';
import medalImg from './assets/medal.png';

// --- 类型声明 ---
interface Publication {
  year: string;
  title: string;
  journal: string;
  doi: string;
  link?: string;
}

interface Profile {
  name: string;
  title: string;
  department: string;
  institution: string;
  email: string;
  orcidLink: string;
}

interface ResearchDir {
  id: string;
  title: string;
  description: string;
  details: string[];
}

interface SiteConfig {
  profile: Profile;
  researchDirs: ResearchDir[];
}

// --- 字体注入 (为诺贝尔奖状添加艺术感) ---
const InjectFonts = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Playfair+Display:ital,wght@0,700;1,400&display=swap');
    .font-nobel-title { font-family: 'Playfair Display', serif; }
    .font-nobel-script { font-family: 'Dancing Script', cursive; }
  `}} />
);

// --- 核心子组件 ---

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

const Hero = ({ profile, onSecretTrigger }: { profile: Profile; onSecretTrigger: () => void }) => {
  const [, setClicks] = useState(0); 
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
          <div className="w-64 h-64 rounded-3xl overflow-hidden border-[12px] border-white shadow-2xl bg-slate-100 select-none">
            <img src={avatarImg} alt={profile.name} className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -z-0"></div>
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] rounded mb-6">Principal Investigator</div>
          <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">{profile.name}</h1>
          <p className="text-xl text-slate-500 font-medium mb-8 leading-relaxed">
            {profile.title} at <span className="text-slate-800">{profile.institution}</span>
          </p>
          
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
               <a href={profile.orcidLink} target="_blank" rel="noreferrer" className="px-6 py-3 bg-slate-900 text-white rounded-full text-sm font-bold shadow-xl hover:bg-blue-600 transition-all">ORCID Profile</a>
               <a href="#publications" className="px-6 py-3 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-600 hover:border-blue-600 transition-all">Selected Works</a>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3 text-slate-500">
              <div className="p-2 bg-slate-100 rounded-full"><Mail size={16} /></div>
              <span className="font-mono text-sm tracking-tighter font-bold border-b border-blue-200">{profile.email}</span>
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
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md" onClick={onClose}>
      <div className="bg-white rounded-3xl max-w-lg w-full p-10 shadow-2xl relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-300 hover:text-slate-900"><X size={28} /></button>
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-blue-600 rounded-2xl text-white"><Microscope size={28} /></div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">{data.title}</h3>
        </div>
        <p className="text-slate-500 mb-8 leading-relaxed text-lg">{data.description}</p>
        <div className="space-y-3">
          {data.details.map((detail, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl text-slate-700 font-bold text-sm border border-slate-100 italic transition-all hover:translate-x-1">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>{detail}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Research = ({ researchDirs }: { researchDirs: ResearchDir[] }) => {
  const [selected, setSelected] = useState<ResearchDir | null>(null);
  return (
    <section id="research" className="py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-12">Research Directions</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {researchDirs.map((item) => (
            <div key={item.id} onClick={() => setSelected(item)} className="p-10 rounded-3xl border border-slate-100 bg-slate-50 hover:bg-white transition-all cursor-pointer shadow-sm hover:shadow-2xl">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight group-hover:text-blue-600">{item.title}</h3>
                <ChevronRight size={20} className="text-slate-300" />
              </div>
              <p className="text-slate-500 leading-relaxed">{item.description}</p>
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
    // 关键点：动态加载爬虫生成的 JSON
    fetch('./publications.json')
      .then(res => res.json())
      .then(data => setPubs(data))
      .catch(() => setPubs([]));
  }, []);

  return (
    <section id="publications" className="py-32 bg-slate-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col gap-3 mb-12">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Latest Publications</h2>
          <p className="text-sm text-slate-500">Updated once per month. Each paper links to its DOI record.</p>
        </div>
        <div className="grid gap-6">
          {pubs.map((pub, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-blue-400 transition-all shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full h-fit tracking-tighter">{pub.year}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-bold text-slate-800 mb-2 leading-tight break-words">
                    {pub.link ? (
                      <a href={pub.link} target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">
                        {pub.title}
                      </a>
                    ) : (
                      pub.title
                    )}
                  </h4>
                  <p className="text-sm text-slate-400 font-bold uppercase tracking-widest italic break-words">
                    {pub.journal}
                    {pub.doi && (
                      <>
                        {' '}
                        (DOI:{' '}
                        <a href={pub.link ?? `https://doi.org/${pub.doi}`} target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors break-all">
                          {pub.doi}
                        </a>
                        )
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {pubs.length === 0 && <p className="text-slate-400 italic">Syncing with ORCID database...</p>}
        </div>
      </div>
    </section>
  );
};

const NobelModal = ({ isOpen, onClose, profile }: { isOpen: boolean; onClose: () => void; profile: Profile }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/98 backdrop-blur-2xl animate-in fade-in duration-700" onClick={onClose}></div>
      <div className="relative w-full max-w-5xl bg-[#fdfbf7] flex flex-col md:flex-row border border-[#d4af37]/20 shadow-2xl overflow-hidden animate-in zoom-in duration-700">
        <button onClick={onClose} className="absolute top-6 right-8 z-[110] text-slate-400 hover:text-slate-900 transition-all"><X size={32} /></button>
        
        {/* 左侧大图：优化展示面积 */}
        <div className="w-full md:w-[42%] p-2 md:p-10 bg-[#f4f1ea] border-r border-[#d4af37]/10 flex items-center justify-center relative">
          <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>
          <div className="w-full max-w-sm aspect-[3/4] bg-white p-1.5 shadow-2xl relative z-10">
            <img src={nobelPhotoImg} alt="Nobel Laureate" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* 右侧文本：注入艺术字 */}
        <div className="w-full md:w-[58%] p-12 md:p-16 flex flex-col items-center text-center justify-center bg-[#fdfbf7]">
          <div className="mb-6 w-28 h-28 relative">
             <div className="absolute inset-0 rounded-full bg-[#d4af37]/20 blur-2xl"></div>
             <img src={medalImg} alt="Medal" className="w-full h-full object-contain relative z-10 drop-shadow-xl" />
          </div>
          <div className="space-y-5">
            <p className="font-nobel-title text-slate-400 uppercase tracking-[0.4em] text-[10px]">The Nobel Assembly at</p>
            <h2 className="font-nobel-title text-3xl font-bold text-slate-900 mb-6 border-b border-[#d4af37]/30 pb-6 uppercase">Karolinska Institutet</h2>
            <p className="font-nobel-title text-slate-500 italic text-sm mb-4 tracking-wider">has today decided to award the</p>
            <div className="py-3 px-6 border-2 border-[#d4af37]/30 inline-block bg-[#d4af37]/5 mb-4">
              <h3 className="font-nobel-title font-bold text-[#aa8400] text-lg uppercase tracking-widest">2030 Nobel Prize in Medicine</h3>
            </div>
            <h1 className="font-nobel-script text-7xl text-slate-900 py-4 select-none drop-shadow-sm">{profile.name}</h1>
            <p className="font-nobel-title text-slate-700 text-lg italic max-w-sm leading-relaxed border-t border-slate-100 pt-6">"for groundbreaking discoveries in smart molecular imaging systems."</p>
          </div>
          <div className="mt-12 w-full flex justify-between px-6 font-nobel-title">
            <div className="text-left"><p className="text-[9px] text-slate-400 uppercase mb-1">Stockholm</p><p className="text-xs font-bold text-slate-800">Dec 10, 2030</p></div>
            <div className="text-right"><p className="text-[9px] text-slate-400 uppercase mb-1">Secretary General</p><p className="font-nobel-script text-xl text-slate-900 h-8">Thomas Perlmann</p></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch('./site_config.json')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(() => setConfig(null));
  }, []);

  if (!config) {
    return (
      <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-600 selection:text-white antialiased">
        <InjectFonts />
        <Header />
        <section className="pt-24 pb-16 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-5xl mx-auto px-6">
            <p className="text-slate-500">Loading site content...</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-600 selection:text-white antialiased">
      <InjectFonts />
      <Header />
      <Hero profile={config.profile} onSecretTrigger={() => setShow(true)} />
      <Research researchDirs={config.researchDirs} />
      <Publications />
      <footer className="py-20 bg-slate-950 text-slate-700 text-[10px] text-center uppercase tracking-[0.4em] font-black">
        <div className="max-w-5xl mx-auto px-6 border-t border-white/5 pt-16">
           &copy; {new Date().getFullYear()} Min Wu Laboratory / West China Hospital
        </div>
      </footer>
      <NobelModal isOpen={show} onClose={() => setShow(false)} profile={config.profile} />
    </div>
  );
}
