'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowUpRight, 
  ChevronLeft, 
  ChevronRight, 
  X,
  Palette,
  Globe,
  Briefcase,
  BookOpen,
  Megaphone,
  Users,
  ShieldCheck
} from "lucide-react";
import { AspirasiSection } from "@/components/AspirasiSection";
import { Toaster } from "@/components/ui/toaster";
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, limit, orderBy } from 'firebase/firestore';

export default function Home() {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const sideMenuRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const teamTrackRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const [teamIndex, setTeamIndex] = useState(0);

  const db = useFirestore();

  // Mengambil data nyata dari Firestore
  const aspirationsQuery = useMemoFirebase(() => query(collection(db, 'aspirations')), [db]);
  const membersQuery = useMemoFirebase(() => query(collection(db, 'members')), [db]);
  const galleryQuery = useMemoFirebase(() => query(collection(db, 'gallery_images'), orderBy('uploadedAt', 'desc'), limit(10)), [db]);

  const { data: aspirations, isLoading: loadingAspirations } = useCollection(aspirationsQuery);
  const { data: members, isLoading: loadingMembers } = useCollection(membersQuery);
  const { data: gallery, isLoading: loadingGallery } = useCollection(galleryQuery);

  const aspirationCount = aspirations?.length || 0;

  // Efek Pemuatan Persentase
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAppLoading) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 99) {
            if (!loadingAspirations && !loadingMembers && !loadingGallery) {
              return 100;
            }
            return 99;
          }
          return prev + 1;
        });
      }, 20);
    }

    return () => clearInterval(interval);
  }, [isAppLoading, loadingAspirations, loadingMembers, loadingGallery]);

  // Efek Transisi Selesai Muat
  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        const tl = gsap.timeline();
        tl.to(".loader-percentage", { y: -20, opacity: 0, duration: 0.6, ease: "power4.in" });
        tl.to(loaderRef.current, { 
          clipPath: "inset(0 0 100% 0)", 
          duration: 1.2, 
          ease: "expo.inOut",
          onComplete: () => setIsAppLoading(false)
        }, "-=0.2");
        tl.from(".hero-reveal", { 
          y: 40, 
          opacity: 0, 
          duration: 1.5, 
          stagger: 0.3, 
          ease: "power4.out" 
        }, "-=0.5");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  // Efek Cursor dan ScrollTrigger
  useEffect(() => {
    if (isAppLoading) return;

    gsap.registerPlugin(ScrollTrigger);

    const cursor = cursorRef.current;
    if (cursor) {
      const onMouseMove = (e: MouseEvent) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
      };
      document.addEventListener('mousemove', onMouseMove);
      
      const hoverables = document.querySelectorAll('a, button, .team-card, .stack-item');
      hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => gsap.to(cursor, { scale: 5, backgroundColor: 'rgba(255,255,255,0.1)' }));
        el.addEventListener('mouseleave', () => gsap.to(cursor, { scale: 1, backgroundColor: 'black' }));
      });
    }

    const stackItems = gsap.utils.toArray(".stack-item");
    stackItems.forEach((card: any, i, arr) => {
      if (i !== arr.length - 1) {
        gsap.to(card, {
          scale: 1 - ((arr.length - i) * 0.035),
          opacity: 0.4,
          scrollTrigger: {
            trigger: card,
            start: "top 12%",
            endTrigger: ".stack-item:last-child",
            end: "top 12%",
            scrub: true
          }
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isAppLoading]);

  // Efek Galeri Horizontal
  useEffect(() => {
    if (isAppLoading || !gallery || gallery.length === 0 || !horizontalTrackRef.current) return;

    ScrollTrigger.refresh();

    const track = horizontalTrackRef.current;
    const animation = gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: "#gallery-horizontal",
        start: "top top",
        end: () => `+=${track.scrollWidth - window.innerWidth}`,
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
        anticipatePin: 1
      }
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [isAppLoading, gallery]);

  // Efek Auto-Slide Tim
  useEffect(() => {
    if (isAppLoading || !members || members.length <= 1) return;

    const interval = setInterval(() => {
      moveTeam(1);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAppLoading, members]);

  const openMenu = () => {
    const tl = gsap.timeline();
    tl.to(sideMenuRef.current, { right: 0, duration: 0.8, ease: "expo.inOut" });
    tl.to(".menu-link", { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "-=0.3");
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    const tl = gsap.timeline();
    tl.to(".menu-link", { opacity: 0, y: 30, duration: 0.3, stagger: 0.05 });
    tl.to(sideMenuRef.current, { right: "-100%", duration: 0.8, ease: "expo.inOut" });
    document.body.style.overflow = 'auto';
  };

  const moveTeam = (dir: number) => {
    if (!teamTrackRef.current || !members) return;
    const cards = members.length;
    const visibleCards = window.innerWidth >= 768 ? 3 : 1;
    const maxIndex = Math.max(0, cards - visibleCards);
    
    setTeamIndex((prev) => {
      let next = prev + dir;
      if (next < 0) next = maxIndex;
      if (next > maxIndex) next = 0;
      
      const cardElement = teamTrackRef.current?.children[0] as HTMLElement;
      if (cardElement) {
        const cardWidth = cardElement.offsetWidth + 24;
        gsap.to(teamTrackRef.current, { x: -next * cardWidth, duration: 1, ease: "expo.out" });
      }
      return next;
    });
  };

  const Pillars = [
    { id: "01", title: "Media Kreatif", desc: "Pusat narasi visual dan pengelola konten digital strategis untuk menjangkau khalayak secara luas.", icon: Palette },
    { id: "02", title: "Hubungan Masyarakat", desc: "Membangun kemitraan strategis dengan pemangku kepentingan nasional maupun internasional.", icon: Globe },
    { id: "03", title: "Wirausaha & Masyarakat", desc: "Mendorong kemandirian ekonomi pemuda dan aksi pemberdayaan sosial berbasis komunitas.", icon: Briefcase },
    { id: "04", title: "Pendidikan Literasi", desc: "Meningkatkan kapasitas intelektual pemuda menghadapi era disrupsi informasi nasional.", icon: BookOpen },
    { id: "05", title: "Aspirasi & Advokasi", desc: "Garda terdepan dalam menyerap suara pemuda Indonesia untuk diolah menjadi rekomendasi kebijakan.", icon: Megaphone },
    { id: "06", title: "Pengembangan Organisasi", desc: "Menjamin kelestarian organisasi melalui pengelolaan sumber daya manusia profesional dan sistem internal.", icon: Users },
    { id: "HQ", title: "Sekretariat Jenderal", desc: "Pusat kendali administrasi dan koordinasi lintas departemen untuk sinkronisasi program kerja.", icon: ShieldCheck }
  ];

  return (
    <div className="bg-white">
      {/* Layar Pemuatan (Persentase) */}
      <div 
        ref={loaderRef}
        className="fixed inset-0 z-[10000] bg-black flex items-center justify-center overflow-hidden"
        style={{ clipPath: "inset(0 0 0 0)" }}
      >
        <div className="loader-percentage">
          <h2 className="text-white text-8xl md:text-[12rem] font-black tracking-tighter animate-in fade-in zoom-in duration-500">
            {progress}%
          </h2>
        </div>
      </div>

      <div id="cursor" ref={cursorRef} className="hidden lg:block"></div>

      <div id="side-menu" ref={sideMenuRef}>
        <button onClick={closeMenu} className="absolute top-10 right-10 text-white group flex flex-col items-end">
          <div className="text-[10px] uppercase tracking-[0.4em] mb-2 opacity-50 group-hover:opacity-100 transition-opacity">Tutup</div>
          <X size={40} strokeWidth={1.5} />
        </button>
        <div className="flex flex-col text-white">
          <a href="#departments" onClick={closeMenu} className="menu-link text-kern">Pilar</a>
          <a href="#team" onClick={closeMenu} className="menu-link text-kern">Struktur</a>
          <a href="#gallery" onClick={closeMenu} className="menu-link text-kern">Jejak</a>
          <a href="#aspiration" onClick={closeMenu} className="menu-link text-kern">Aspirasi</a>
          <a href="mailto:sekretariat@dagm.org" onClick={closeMenu} className="menu-link text-kern">Hubungi</a>
        </div>
        <div className="mt-20 flex gap-10 text-white opacity-30 text-[10px] uppercase tracking-[0.5em]">
          <a href="https://instagram.com/dewan.aspirasi.generasi.muda" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition">Instagram</a>
        </div>
      </div>

      <nav className="fixed w-full z-[100] bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
          <a href="#" className="flex items-center">
            <span className="text-xl font-bold tracking-tighter uppercase">DAGM</span>
            <span className="text-[10px] text-gray-400 font-medium tracking-[0.2em] uppercase ml-6 hidden sm:inline">Dewan Aspirasi Generasi Muda</span>
          </a>

          <div className="flex items-center space-x-12">
            <div className="hidden md:flex space-x-12 text-[10px] uppercase tracking-[0.3em] font-medium text-gray-400">
              <a href="#departments" className="hover:text-black transition text-kern font-bold">Pilar</a>
              <a href="#team" className="hover:text-black transition text-kern font-bold">Struktur</a>
              <a href="#aspiration" className="hover:text-black transition text-kern font-bold">Aspirasi</a>
            </div>
            <button onClick={openMenu} className="flex flex-col gap-1.5 group">
              <div className="h-0.5 w-8 bg-black transition-all group-hover:w-10"></div>
              <div className="h-0.5 w-10 bg-black transition-all group-hover:w-8"></div>
              <div className="h-0.5 w-6 bg-black transition-all group-hover:w-10"></div>
            </button>
          </div>
        </div>
      </nav>

      <section className="min-h-screen flex flex-col justify-center px-8 relative overflow-hidden">
        <div className="max-w-6xl mx-auto w-full pt-48 pb-20">
          <h2 className="text-[11px] uppercase tracking-[0.6em] text-gray-600 mb-10 hero-reveal text-kern font-bold">EST. 2026 / INSTITUSI ASPIRASI</h2>
          <h1 className="text-6xl md:text-[4.5rem] font-bold tracking-tighter leading-[0.9] mb-16 hero-reveal">
            Masa Depan <br /> Bangsa Berawal <br /> dari <span className="italic text-gray-200">Gagasan.</span>
          </h1>
          <div className="flex flex-col md:flex-row md:items-start gap-12 hero-reveal">
            <p className="text-xl font-light text-gray-400 max-w-sm leading-relaxed text-kern">
              Dewan Aspirasi Generasi Muda hadir sebagai katalisator kebijakan strategis bagi pemuda Indonesia.
            </p>
            <div className="flex flex-col gap-4">
              <a href="#aspiration" className="text-[10px] uppercase tracking-widest font-bold border-b border-black pb-2 w-fit hover:text-gray-500 transition">Sampaikan Suara Anda</a>
            </div>
          </div>
        </div>
      </section>

      <section id="departments" className="py-40 bg-gray-50/20">
        <div className="max-w-5xl mx-auto px-8">
          <div className="mb-32">
            <h2 className="text-[10px] uppercase tracking-[0.6em] text-gray-400 mb-6 text-kern font-bold">Pilar Strategis</h2>
            <h3 className="text-5xl font-bold tracking-tight text-kern">Arsitektur Perubahan</h3>
          </div>
          <div className="relative">
            {Pillars.map((p, idx) => (
              <div key={idx} className="stack-item bg-white border border-gray-100 p-8 md:p-20 rounded-[3rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="flex justify-between items-start mb-10 md:mb-12">
                  <div className="flex flex-col gap-6">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-black shadow-sm">
                      <p.icon size={28} className="md:w-8 md:h-8" strokeWidth={1.5} />
                    </div>
                    <h4 className="text-2xl md:text-5xl font-bold tracking-tight leading-tight">{p.title}</h4>
                  </div>
                  <span className="text-[10px] md:text-xs font-bold text-gray-200 tracking-[0.5em]">{p.id}</span>
                </div>
                <p className="text-gray-500 font-light leading-relaxed max-w-xl text-kern text-base md:text-lg">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 border-y border-gray-100 py-32">
            <div className="text-center">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-8">Aspirasi Terkelola</span>
              <h3 className="text-7xl font-light tracking-tighter text-kern">{aspirationCount}</h3>
              <p className="text-[10px] text-gray-300 mt-4 uppercase tracking-widest italic font-bold">+ Pembaruan Waktu Nyata</p>
            </div>
            <div className="text-center md:border-x border-gray-100 px-10">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-8">Provinsi Dijangkau</span>
              <h3 className="text-7xl font-light tracking-tighter text-kern">38</h3>
              <p className="text-[10px] text-gray-300 mt-4 uppercase tracking-widest italic font-bold">Cakupan Nasional</p>
            </div>
            <div className="text-center">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-8">Program Strategis</span>
              <h3 className="text-7xl font-light tracking-tighter text-kern">12</h3>
              <p className="text-[10px] text-gray-300 mt-4 uppercase tracking-widest italic font-bold">Sasaran 2026</p>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="py-40 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-kern">
            <div className="max-w-xl">
              <h2 className="text-[10px] uppercase tracking-[0.8em] text-gray-400 mb-6 font-bold">Kepemimpinan</h2>
              <h3 className="text-5xl font-bold tracking-tighter">Dewan Strategis.</h3>
            </div>
            <div className="flex space-x-4 mb-2">
              <button onClick={() => moveTeam(-1)} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300">
                <ChevronLeft size={20} />
              </button>
              <button onClick={() => moveTeam(1)} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <div className="team-slider-container">
            <div className="team-track" ref={teamTrackRef}>
              {members?.map((member) => (
                <div key={member.id} className="team-card group">
                  <img src={member.imageUrl} alt={member.fullName} />
                  <div className="team-arrow"><ArrowUpRight size={16} strokeWidth={2} /></div>
                  <div className="team-overlay">
                    <h4 className="text-xl font-bold">{member.fullName}</h4>
                    <p className="text-[10px] uppercase tracking-widest opacity-70 mt-1 font-bold">{member.position}</p>
                    <p className="text-[8px] uppercase tracking-widest opacity-50 mt-1 font-bold">{member.school}</p>
                  </div>
                </div>
              ))}
              {(!members || members.length === 0) && (
                <div className="py-20 text-center w-full text-gray-300 font-light italic">
                  Belum ada data kepemimpinan yang ditambahkan.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="py-20 bg-[#0a0a0a] border-t border-gray-900">
        <div id="gallery-horizontal">
          <div className="horizontal-sticky">
            <div className="horizontal-track" ref={horizontalTrackRef}>
              <div className="flex flex-col justify-center min-w-[350px] mr-24 px-8">
                <h2 className="text-[10px] uppercase tracking-[0.5em] text-gray-600 mb-8 font-bold">Dokumentasi</h2>
                <h3 className="text-5xl font-bold tracking-tighter leading-tight text-white text-kern">Jejak Langkah Kolektif.</h3>
                <p className="text-gray-500 mt-6 font-light text-sm max-w-xs italic">Geser ke bawah untuk menjelajahi momen kegiatan kami.</p>
              </div>
              {gallery?.map((img) => (
                <div key={img.id} className="horizontal-item">
                  <img src={img.imageUrl} className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700" alt={img.caption || 'Galeri Dokumentasi'} />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-[9px] uppercase tracking-[0.3em] text-white font-bold bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg inline-block">{img.caption || 'Kegiatan DAGM'}</p>
                  </div>
                </div>
              ))}
              {(!gallery || gallery.length === 0) && (
                <div className="flex items-center text-gray-700 italic px-20">Belum ada dokumentasi kegiatan yang diunggah.</div>
              )}
            </div>
          </div>
        </div>
      </section>

      <AspirasiSection />

      <footer className="bg-[#0a0a0a] text-white pt-40 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-12 gap-16 mb-40">
            <div className="md:col-span-6">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight mb-12 text-kern">Mari ciptakan dampak <br /> besar bersama DAGM.</h2>
              <a href="mailto:sekretariat@dagm.org" className="flex items-center gap-6 group cursor-pointer w-fit">
                <div className="w-16 h-16 rounded-full border border-gray-800 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <ArrowUpRight size={24} />
                </div>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Hubungi Sekarang</span>
              </a>
            </div>
            <div className="md:col-span-2 md:col-start-8">
              <h4 className="text-[10px] uppercase tracking-[0.5em] text-gray-500 mb-8 font-bold">Eksplorasi</h4>
              <ul className="space-y-4 text-sm font-light text-gray-400">
                <li><a href="#" className="hover:text-white transition">Filosofi</a></li>
                <li><a href="#departments" className="hover:text-white transition">Pilar Strategis</a></li>
                <li><a href="#team" className="hover:text-white transition">Struktur</a></li>
              </ul>
            </div>
            <div className="md:col-span-2">
              <h4 className="text-[10px] uppercase tracking-[0.5em] text-gray-500 mb-8 font-bold">Ikuti Kami</h4>
              <ul className="space-y-4 text-sm font-light text-gray-400">
                <li><a href="https://instagram.com/dewan.aspirasi.generasi.muda" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Instagram</a></li>
              </ul>
            </div>
          </div>

          <div className="relative py-20">
            <h1 className="text-[15vw] md:text-[22vw] font-extrabold tracking-tighter leading-none text-white opacity-[0.02] select-none text-center">DAGM</h1>
          </div>

          <div className="pt-10 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] uppercase tracking-[0.4em] text-gray-600 font-bold">
            <p>&copy; 2026 Dewan Aspirasi Generasi Muda. Hak Cipta Dilindungi Undang-Undang.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition">Kebijakan Privasi</a>
              <a href="#" className="hover:text-white transition">Ketentuan Layanan</a>
            </div>
          </div>
        </div>
      </footer>

      <Toaster />
    </div>
  );
}
