
import Image from 'next/image';
import { 
  Megaphone, 
  FileText, 
  Building2, 
  Lightbulb, 
  Users, 
  Handshake, 
  ChevronRight, 
  Calendar, 
  ArrowUpRight, 
  MapPin, 
  Mail,
  ArrowRight,
  Monitor,
  Files,
  TrendingUp,
  BookOpen,
  Briefcase,
  Menu
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
    { name: "Beranda", href: "#beranda" },
    { name: "E-Aspirasi", href: "#aspirasi" },
    { name: "Sidang Nasional", href: "#event" },
    { name: "Bidang Kerja", href: "#program" },
    { name: "Warta Dewan", href: "#berita" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* NAVIGATION */}
      <nav className="fixed w-full z-50 glass-nav transition-all duration-300">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="flex flex-col justify-center leading-tight">
                <span className="font-bold text-lg text-slate-900 tracking-tight">DAGM</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Dewan Aspirasi Generasi Muda</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1 bg-white/60 p-1.5 rounded-full border border-slate-200/60 shadow-sm backdrop-blur-md">
              {NavLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="px-5 py-2 text-sm font-semibold text-slate-600 hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Right Actions (Desktop) */}
            <div className="hidden lg:flex items-center gap-3">
              <Button variant="outline" className="rounded-full font-bold">Autentikasi</Button>
              <Button className="rounded-full font-bold bg-emerald-900 hover:bg-emerald-800 text-white">
                Penerimaan Delegasi
              </Button>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Menu className="h-6 w-6 text-slate-900" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px] pt-12">
                  <SheetHeader className="text-left mb-8">
                    <SheetTitle className="text-2xl font-bold text-primary">DAGM</SheetTitle>
                    <SheetDescription className="text-xs font-bold uppercase tracking-widest">
                      Dewan Aspirasi Generasi Muda
                    </SheetDescription>
                  </SheetHeader>
                  <div className="flex flex-col gap-4">
                    {NavLinks.map((link) => (
                      <a 
                        key={link.name} 
                        href={link.href} 
                        className="text-lg font-semibold text-slate-700 hover:text-primary py-2 border-b border-slate-50 transition-colors"
                      >
                        {link.name}
                      </a>
                    ))}
                    <div className="flex flex-col gap-3 mt-6">
                      <Button variant="outline" className="w-full rounded-xl font-bold py-6">Autentikasi</Button>
                      <Button className="w-full rounded-xl font-bold bg-emerald-900 hover:bg-emerald-800 text-white py-6">
                        Penerimaan Delegasi
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="beranda" className="relative pt-32 pb-0 overflow-hidden lg:min-h-screen flex flex-col items-center">
        <div className="absolute inset-0 -z-10 bg-dot-pattern opacity-15"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-50/60 rounded-full blur-[100px] -z-10 -translate-x-1/4 translate-y-1/4"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center mt-8 relative z-10 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-full shadow-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-accent"></span>
            <span className="text-xs font-bold text-slate-600 tracking-wide uppercase">Institusi Representatif Generasi Muda Indonesia</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-[4rem] font-extrabold tracking-tight leading-[1.1] mb-8 text-slate-900 font-headline">
            Dewan Aspirasi <br />
            <span className="text-primary relative inline-block">
              Generasi Muda
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-emerald-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none"/></svg>
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
            Lembaga formal bagi generasi muda untuk berdialektika secara intelektual, merumuskan rekomendasi kebijakan, dan melakukan advokasi terhadap sistem pendidikan nasional.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-20">
            <Button className="px-8 py-6 rounded-full font-bold bg-emerald-900 hover:bg-primary transition-all shadow-lg min-w-[180px] text-lg">
              <Megaphone className="mr-2" size={20} /> Ajukan Aspirasi
            </Button>
            <Button variant="outline" className="px-8 py-6 rounded-full font-bold bg-white text-emerald-900 border-slate-200 transition-all shadow-sm min-w-[180px] text-lg">
              <FileText className="mr-2" size={20} /> Program Kerja
            </Button>
          </div>
        </div>

        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 relative z-10 mt-auto animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <div className="bg-white rounded-t-[3rem] shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.08)] border-t border-x border-slate-100 h-[380px] md:h-[480px] relative overflow-hidden">
            <div className="absolute inset-x-8 top-8 bottom-0 bg-secondary/50 rounded-t-3xl border-t border-x border-emerald-100 p-6 md:p-10 flex flex-col items-center">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="w-64 h-64 bg-gradient-to-tr from-emerald-100 to-white rounded-full flex items-center justify-center shadow-inner mb-12">
                  <Building2 size={120} className="text-primary opacity-80" />
                </div>
                
                <div className="absolute top-1/4 left-10 md:left-20 bg-white p-4 rounded-2xl shadow-card border border-slate-50 animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-accent"><Lightbulb size={20} /></div>
                    <div className="space-y-1.5">
                      <div className="h-2 w-20 bg-slate-100 rounded"></div>
                      <div className="h-2 w-12 bg-slate-100 rounded"></div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-1/3 right-10 md:right-20 bg-white p-4 rounded-2xl shadow-card border border-slate-50 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"><Users size={20} /></div>
                    <div className="space-y-1.5">
                      <div className="h-2 w-24 bg-slate-100 rounded"></div>
                      <div className="h-2 w-16 bg-slate-100 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EVENT SECTION */}
      <section id="event" className="py-24 bg-white relative">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="bg-emerald-50 text-primary border border-emerald-100 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">Agenda Paripurna</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-6 font-headline">Sidang & Musyawarah Nasional</h2>
            <p className="text-slate-500 mt-3 max-w-2xl mx-auto">Forum tertinggi pengambilan keputusan kolektif-kolegial dan perumusan rekomendasi kebijakan strategis.</p>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-emerald-950 rounded-[2.5rem] shadow-2xl overflow-hidden text-white relative">
            <div className="absolute inset-0 opacity-10 bg-dot-pattern"></div>
            
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-full">
                <Image 
                  src="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=1350&q=80" 
                  alt="Legislative Summit" 
                  fill
                  className="object-cover opacity-80 mix-blend-overlay"
                  data-ai-hint="legislative meeting"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent lg:bg-gradient-to-r"></div>
                <div className="absolute bottom-8 left-8">
                  <div className="bg-accent text-white px-4 py-1.5 rounded-lg text-xs font-bold inline-block mb-2 shadow-lg">Tahap Persiapan</div>
                  <h4 className="text-xl font-bold">Gedung Merdeka, Bandung</h4>
                </div>
              </div>

              <div className="lg:w-1/2 p-8 md:p-12 lg:p-16 relative z-10 flex flex-col justify-center">
                <h3 className="text-3xl md:text-4xl font-extrabold mb-2 leading-tight font-headline">DAGM Youth<br /><span className="text-emerald-400">Legislative Summit</span> 2026</h3>
                <p className="text-slate-300 mb-8 text-lg font-light border-l-4 border-accent pl-4 py-1 mt-4">
                  "Mewujudkan Parlemen Muda yang Kritis, Progresif, dan Memiliki Integritas Konstitusional."
                </p>

                <div className="grid grid-cols-2 gap-6 mb-10">
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Pelaksanaan</p>
                    <p className="text-lg font-semibold">28 Oktober 2026</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Delegasi</p>
                    <p className="text-lg font-semibold">500 Representatif</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button className="px-8 py-6 bg-white text-emerald-900 rounded-full font-bold hover:bg-emerald-50 transition-colors shadow-lg">
                    Registrasi Delegasi <ArrowRight className="ml-2" size={18} />
                  </Button>
                  <Button variant="outline" className="px-8 py-6 bg-transparent border-white/20 text-white rounded-full font-bold hover:bg-white/10 transition-colors">
                    Telaah Naskah Konsep
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ASPIRASI FORM SECTION */}
      <AspirasiSection />

      {/* DEPARTEMEN SECTION */}
      <section id="program" className="py-24 bg-white relative">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="bg-blue-50 text-blue-600 border border-blue-100 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">Bidang Kerja</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-6 font-headline">Departemen & Komisi</h2>
            <p className="text-slate-500 mt-3 max-w-2xl mx-auto">Unit pelaksana teknis yang bergerak spesifik untuk menjalankan roda organisasi secara profesional.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Dept 1: Aspirasi */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-emerald-100/50 hover:border-primary transition-all group duration-300">
              <div className="w-14 h-14 bg-emerald-100 text-primary rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                <Megaphone size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 font-headline">Aspirasi Dan Advokasi</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">Bertugas menjaring, mengkaji, dan mengawal aspirasi konstituen muda untuk diajukan sebagai rekomendasi kebijakan strategis.</p>
              <a href="#" className="inline-flex items-center text-xs font-bold text-primary uppercase tracking-wide group-hover:underline">Program Kerja <ArrowRight className="ml-1" size={14} /></a>
            </div>

            {/* Dept 2: Media Kreatif */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-blue-100/50 hover:border-blue-500 transition-all group duration-300">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                <Monitor size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 font-headline">Media Kreatif</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">Mengelola citra digital, publikasi kreatif, dan penyebaran informasi terkait aktivitas legislasi dewan kepada publik.</p>
              <a href="#" className="inline-flex items-center text-xs font-bold text-blue-600 uppercase tracking-wide group-hover:underline">Program Kerja <ArrowRight className="ml-1" size={14} /></a>
            </div>

            {/* Dept 3: Humas & Kemitraan */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-teal-100/50 hover:border-teal-500 transition-all group duration-300">
              <div className="w-14 h-14 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                <Handshake size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 font-headline">Humas & Kemitraan</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">Membangun sinergi strategis dengan lembaga pemerintahan, organisasi kepemudaan, dan mitra internasional.</p>
              <a href="#" className="inline-flex items-center text-xs font-bold text-teal-600 uppercase tracking-wide group-hover:underline">Program Kerja <ArrowRight className="ml-1" size={14} /></a>
            </div>

            {/* Dept 4: Pengembangan Organisasi */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-amber-100/50 hover:border-amber-500 transition-all group duration-300">
              <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 font-headline">Pengembangan Organisasi</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">Fokus pada penguatan kapasitas kepemimpinan fungsionaris dan pengembangan sistem internal lembaga.</p>
              <a href="#" className="inline-flex items-center text-xs font-bold text-amber-600 uppercase tracking-wide group-hover:underline">Program Kerja <ArrowRight className="ml-1" size={14} /></a>
            </div>

            {/* Dept 5: Pendidikan Literasi */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-purple-100/50 hover:border-purple-500 transition-all group duration-300">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                <BookOpen size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 font-headline">Pendidikan Literasi</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">Menyelenggarakan kajian akademik dan program edukasi untuk meningkatkan kesadaran konstitusional generasi muda.</p>
              <a href="#" className="inline-flex items-center text-xs font-bold text-purple-600 uppercase tracking-wide group-hover:underline">Program Kerja <ArrowRight className="ml-1" size={14} /></a>
            </div>

            {/* Dept 6: Kewirausahaan */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-rose-100/50 hover:border-rose-500 transition-all group duration-300">
              <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                <Briefcase size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 font-headline">Kewirausahaan</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">Menginisiasi program pemberdayaan ekonomi kreatif bagi pemuda dan pengelolaan dana mandiri organisasi.</p>
              <a href="#" className="inline-flex items-center text-xs font-bold text-rose-600 uppercase tracking-wide group-hover:underline">Program Kerja <ArrowRight className="ml-1" size={14} /></a>
            </div>

            {/* Dept 7: Sekretariat jenderal */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-400 transition-all group duration-300 lg:col-span-1">
              <div className="w-14 h-14 bg-slate-200 text-slate-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                <Files size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 font-headline">Sekretariat Jenderal</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">Pusat pengelolaan administrasi, kearsipan dokumentasi legislatif, dan koordinasi fungsional antar departemen.</p>
              <a href="#" className="inline-flex items-center text-xs font-bold text-slate-600 uppercase tracking-wide group-hover:underline">Program Kerja <ArrowRight className="ml-1" size={14} /></a>
            </div>
          </div>
        </div>
      </section>

      {/* BERITA SECTION */}
      <section id="berita" className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-primary font-bold uppercase tracking-wider text-xs">Publikasi Resmi</span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-2 font-headline">Warta & Opini Strategis</h2>
            </div>
            <Button variant="outline" className="rounded-full font-bold bg-white group">
              Arsip Publikasi <ArrowRight className="ml-2" size={16} />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                tag: "Laporan Anggota", 
                title: "Hasil Reses Dewan: 5 Isu Prioritas Konstituen Muda Jabar", 
                date: "12 Agt 2026", 
                img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80",
                hint: "business meeting",
                desc: "Rangkuman hasil penyerapan aspirasi dari 27 Kota/Kabupaten yang akan diajukan ke sidang paripurna."
              },
              { 
                tag: "Opini Kebijakan", 
                title: "Efektivitas 'Student Government' dalam Ekosistem Demokrasi Digital", 
                date: "10 Agt 2026", 
                img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
                hint: "writing paper",
                desc: "Analisis terhadap urgensi kesadaran politik dan kepemimpinan pemuda sebagai instrumen kemajuan bangsa."
              },
              { 
                tag: "Rilis Pers", 
                title: "Siaran Pers: Pelantikan Fungsionaris Dewan Periode 2026-2027", 
                date: "05 Agt 2026", 
                img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
                hint: "press release",
                desc: "DAGM secara resmi telah melantik fungsionaris baru yang terpilih melalui proses seleksi kompetensi yang ketat."
              }
            ].map((article, idx) => (
              <article key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group flex flex-col h-full">
                <div className="h-52 overflow-hidden relative">
                  <Image src={article.img} alt={article.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" data-ai-hint={article.hint} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide border border-emerald-100">
                    {article.tag}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-3 font-medium">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span>Sekretariat DAGM</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors leading-tight font-headline">
                    {article.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                    {article.desc}
                  </p>
                  <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 group-hover:text-primary transition-colors">Baca Publikasi</span>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            <div className="max-w-md">
              <div className="flex items-center gap-3 mb-6">
                 <div className="flex flex-col">
                   <span className="font-bold text-2xl tracking-tight leading-none">DAGM</span>
                   <span className="text-xs text-slate-400 font-medium tracking-widest uppercase">Indonesia</span>
                 </div>
              </div>
              <p className="text-slate-400 leading-relaxed font-medium">
                Institusi independen yang mendedikasikan diri sebagai jembatan aspirasi strategis generasi muda dengan otoritas pemangku kebijakan.
              </p>
            </div>

            <div className="flex flex-wrap gap-12 lg:gap-24">
              <div>
                <h4 className="font-bold text-white mb-6">Kelembagaan</h4>
                <ul className="space-y-4 text-slate-400 font-medium text-sm">
                  <li><a href="#" className="hover:text-primary transition-colors">Profil Institusi</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Visi & Misi</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Anggaran Dasar</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Fungsionaris</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-white mb-6">Sekretariat</h4>
                <ul className="space-y-4 text-slate-400 font-medium text-sm">
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 text-primary" size={16} />
                    <span>Gedung Pemuda,<br />Jawa Barat, Indonesia</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="text-primary" size={16} />
                    sekretariat@dagm.org
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 font-medium">
            <p>&copy; 2026 Dewan Aspirasi Generasi Muda. Seluruh hak cipta dilindungi undang-undang.</p>
            <div className="flex gap-6">
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
