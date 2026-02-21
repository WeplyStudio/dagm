import Image from 'next/image';
import { 
  ArrowRight, 
  Menu, 
  ChevronRight,
  TrendingUp,
  Monitor,
  Users,
  BookOpen,
  Megaphone,
  Briefcase,
  Files,
  ArrowUpRight,
  MapPin,
  Mail,
  Instagram,
  Twitter,
  Linkedin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspirasiSection } from "@/components/AspirasiSection";
import { Toaster } from "@/components/ui/toaster";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetDescription 
} from "@/components/ui/sheet";

export default function Home() {
  const NavLinks = [
    { name: "Pilar", href: "#departments" },
    { name: "Struktur", href: "#team" },
    { name: "Jejak", href: "#gallery" },
    { name: "Aspirasi", href: "#aspiration" },
  ];

  const Pillars = [
    { 
      id: "01", 
      title: "Media Kreatif", 
      desc: "Pusat narasi visual dan pengelola konten digital strategis untuk menjangkau audiens secara luas.",
      icon: <Monitor className="w-8 h-8" />
    },
    { 
      id: "02", 
      title: "Hubungan Masyarakat", 
      desc: "Membangun kemitraan strategis dengan pemangku kepentingan nasional maupun internasional.",
      icon: <Users className="w-8 h-8" />
    },
    { 
      id: "03", 
      title: "Wirausaha & Masyarakat", 
      desc: "Mendorong kemandirian ekonomi pemuda dan aksi pemberdayaan sosial berbasis komunitas.",
      icon: <Briefcase className="w-8 h-8" />
    },
    { 
      id: "04", 
      title: "Pendidikan Literasi", 
      desc: "Meningkatkan kapasitas intelektual pemuda menghadapi era disrupsi informasi nasional.",
      icon: <BookOpen className="w-8 h-8" />
    },
    { 
      id: "05", 
      title: "Aspirasi & Advokasi", 
      desc: "Garda terdepan dalam menyerap suara pemuda Indonesia untuk diolah menjadi rekomendasi kebijakan.",
      icon: <Megaphone className="w-8 h-8" />
    },
    { 
      id: "06", 
      title: "Pengembangan Organisasi", 
      desc: "Menjamin kelestarian organisasi melalui pengelolaan SDM profesional dan sistem internal.",
      icon: <TrendingUp className="w-8 h-8" />
    },
    { 
      id: "HQ", 
      title: "Sekretariat Jenderal", 
      desc: "Pusat kontrol administrasi dan koordinasi lintas departemen untuk sinkronisasi program kerja.",
      icon: <Files className="w-8 h-8" />
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* NAVIGATION */}
      <nav className="fixed w-full z-[100] bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <a href="#" className="flex flex-col">
            <span className="text-xl font-bold tracking-tighter uppercase leading-none">DAGM</span>
            <span className="text-[9px] text-slate-400 font-medium tracking-[0.2em] uppercase mt-1">Dewan Aspirasi Generasi Muda</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {NavLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-[10px] uppercase tracking-[0.3em] font-semibold text-slate-400 hover:text-black transition-colors text-kern"
              >
                {link.name}
              </a>
            ))}
            
            <Sheet>
              <SheetTrigger asChild>
                <button className="flex flex-col gap-1.5 group ml-4">
                  <div className="h-0.5 w-8 bg-black transition-all group-hover:w-10"></div>
                  <div className="h-0.5 w-10 bg-black transition-all group-hover:w-8"></div>
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[400px] bg-slate-950 text-white border-none pt-24">
                <SheetHeader className="text-left mb-12">
                  <SheetTitle className="text-4xl font-bold text-white tracking-tighter uppercase">Menu</SheetTitle>
                  <SheetDescription className="text-slate-500 tracking-widest uppercase text-[10px]">Navigasi Utama</SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-8">
                  {NavLinks.map((link) => (
                    <a 
                      key={link.name} 
                      href={link.href} 
                      className="text-5xl font-medium tracking-tighter hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
             <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Menu className="h-6 w-6 text-slate-900" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:w-[400px] pt-12">
                  <SheetHeader className="text-left mb-8">
                    <SheetTitle className="text-2xl font-bold">DAGM</SheetTitle>
                    <SheetDescription className="text-[10px] uppercase tracking-widest">Dewan Aspirasi Generasi Muda</SheetDescription>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 mt-12">
                    {NavLinks.map((link) => (
                      <a 
                        key={link.name} 
                        href={link.href} 
                        className="text-4xl font-medium tracking-tighter text-slate-900 hover:text-primary transition-colors"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-center px-6 relative overflow-hidden bg-white">
        <div className="absolute inset-0 -z-10 bg-dot-pattern opacity-10"></div>
        <div className="max-w-6xl mx-auto w-full pt-32 animate-fade-up">
          <h2 className="text-[11px] uppercase tracking-[0.6em] text-slate-500 mb-10 font-bold text-kern">Est. 2026 / Institusi Aspirasi Nasional</h2>
          <h1 className="text-6xl md:text-[110px] font-medium tracking-tighter leading-[0.85] mb-16 text-slate-900">
            Masa Depan <br /> Bangsa Berawal <br /> dari <span className="italic text-slate-300">Gagasan.</span>
          </h1>
          <div className="flex flex-col md:flex-row md:items-start gap-12">
            <p className="text-xl font-light text-slate-500 max-w-sm leading-relaxed text-kern">
              Dewan Aspirasi Generasi Muda hadir sebagai katalisator kebijakan strategis bagi pemuda Indonesia menuju Indonesia Emas.
            </p>
            <div className="flex flex-col gap-4">
              <a href="#aspiration" className="text-[10px] uppercase tracking-[0.4em] font-bold border-b-2 border-slate-900 pb-2 w-fit hover:text-slate-500 transition-all">Sampaikan Suara Anda</a>
            </div>
          </div>
        </div>
      </section>

      {/* DEPARTMENTS (Stacked Cards) */}
      <section id="departments" className="py-40 bg-slate-50/50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-32">
            <h2 className="text-[10px] uppercase tracking-[0.6em] text-slate-400 mb-6 font-bold text-kern">Pilar Strategis</h2>
            <h3 className="text-5xl font-medium tracking-tighter text-kern text-slate-900">Arsitektur Perubahan</h3>
          </div>
          
          <div className="relative">
            {Pillars.map((pilar, idx) => (
              <div 
                key={idx} 
                className="stack-item bg-white border border-slate-100 p-12 md:p-20 rounded-[3rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)] flex flex-col justify-between"
                style={{ top: `${12 + idx * 2}vh` }}
              >
                <div className="flex justify-between items-start mb-12">
                  <div className="flex flex-col gap-4">
                    <div className="text-primary">{pilar.icon}</div>
                    <h4 className="text-4xl font-medium text-slate-900">{pilar.title}</h4>
                  </div>
                  <span className="text-xs font-bold text-slate-200 tracking-[0.5em]">{pilar.id}</span>
                </div>
                <p className="text-slate-500 font-light text-xl leading-relaxed max-w-xl text-kern">
                  {pilar.desc}
                </p>
                <a href="#" className="mt-12 text-[10px] uppercase tracking-[0.4em] font-bold text-slate-900 flex items-center gap-2 group">
                  Lihat Program Kerja <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION LENS */}
      <section className="relative h-[150vh] bg-white overflow-hidden lens-container">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center bg-slate-950 lens-visual overflow-hidden">
           <div className="max-w-4xl px-12 text-center text-white relative z-10">
              <h2 className="text-[10px] uppercase tracking-[1.2em] mb-16 opacity-40 font-bold">Visi Melampaui Batas</h2>
              <p className="text-4xl md:text-[64px] font-light tracking-tighter leading-tight text-kern">
                "Memberikan wadah bagi setiap <span className="text-slate-500">aspirasi</span> untuk menjadi <span className="italic underline underline-offset-8 decoration-1">perubahan nyata</span>."
              </p>
          </div>
        </div>
      </section>

      {/* IMPACT STATS */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 border-y border-slate-100 py-32">
            <div className="text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-8">Aspirasi Terproses</span>
              <h3 className="text-7xl font-light tracking-tighter text-slate-900 text-kern">1,500+</h3>
              <p className="text-[10px] text-slate-300 mt-4 uppercase tracking-widest italic font-medium">Database Real-Time</p>
            </div>
            <div className="text-center md:border-x border-slate-100 px-10">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-8">Provinsi Dijangkau</span>
              <h3 className="text-7xl font-light tracking-tighter text-slate-900 text-kern">38</h3>
              <p className="text-[10px] text-slate-300 mt-4 uppercase tracking-widest italic font-medium">Jejaring Nasional</p>
            </div>
            <div className="text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-8">Program Strategis</span>
              <h3 className="text-7xl font-light tracking-tighter text-slate-900 text-kern">12</h3>
              <p className="text-[10px] text-slate-300 mt-4 uppercase tracking-widest italic font-medium">Target Capaian 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY / JEJAK */}
      <section id="gallery" className="py-40 bg-slate-50/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <h2 className="text-[10px] uppercase tracking-[0.8em] text-slate-400 mb-6 font-bold">Dokumentasi</h2>
              <h3 className="text-5xl font-medium tracking-tighter text-slate-900">Jejak Langkah Kolektif.</h3>
            </div>
            <Button variant="outline" className="rounded-full px-8 py-6 uppercase tracking-widest text-[10px] font-bold">Lihat Semua Galeri</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="aspect-[4/3] bg-slate-200 rounded-3xl overflow-hidden relative group">
              <Image src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200" alt="Meeting" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" data-ai-hint="business meeting" />
            </div>
            <div className="aspect-[4/3] bg-slate-200 rounded-3xl overflow-hidden relative group">
              <Image src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1200" alt="Audience" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" data-ai-hint="audience stage" />
            </div>
            <div className="aspect-[4/3] bg-slate-200 rounded-3xl overflow-hidden relative group">
              <Image src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200" alt="Workshop" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" data-ai-hint="workshop group" />
            </div>
          </div>
        </div>
      </section>

      {/* ASPIRASI SECTION */}
      <AspirasiSection />

      {/* FOOTER */}
      <footer className="bg-slate-950 text-white pt-40 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-16 mb-40">
            <div className="md:col-span-6">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tighter leading-tight mb-12 text-kern">Mari cipta impak <br /> besar bersama DAGM.</h2>
              <a href="mailto:sekretariat@dagm.org" className="flex items-center gap-6 group cursor-pointer w-fit">
                <div className="w-16 h-16 rounded-full border border-slate-800 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <ArrowUpRight size={24} />
                </div>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Hubungi Sekarang</span>
              </a>
            </div>
            
            <div className="md:col-span-2 md:col-start-8">
              <h4 className="text-[10px] uppercase tracking-[0.5em] text-slate-500 mb-8 font-bold">Eksplorasi</h4>
              <ul className="space-y-4 text-sm font-light text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Profil Institusi</a></li>
                <li><a href="#departments" className="hover:text-white transition-colors">Pilar Strategis</a></li>
                <li><a href="#team" className="hover:text-white transition-colors">Struktur</a></li>
              </ul>
            </div>
            
            <div className="md:col-span-2">
              <h4 className="text-[10px] uppercase tracking-[0.5em] text-slate-500 mb-8 font-bold">Sambungan</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-white hover:text-black transition-all"><Instagram size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-white hover:text-black transition-all"><Twitter size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-white hover:text-black transition-all"><Linkedin size={18} /></a>
              </div>
            </div>
          </div>

          <div className="relative py-20 text-center select-none pointer-events-none">
            <h1 className="text-[15vw] font-black tracking-tighter leading-none text-white opacity-[0.03]">DAGM</h1>
          </div>

          <div className="pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] uppercase tracking-[0.4em] text-slate-600 font-bold">
            <p>&copy; 2026 Dewan Aspirasi Generasi Muda. Hak Cipta Terpelihara.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
              <a href="#" className="hover:text-white transition-colors">Ketentuan Layanan</a>
            </div>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  );
}
