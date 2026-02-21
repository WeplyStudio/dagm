"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, doc, updateDoc, deleteDoc, query, orderBy, setDoc, serverTimestamp, addDoc } from 'firebase/firestore';
import { 
  Users, 
  MessageSquare, 
  Image as ImageIcon, 
  LogOut, 
  Menu,
  Plus,
  Trash2,
  LayoutDashboard,
  Loader2,
  Upload,
  UserPlus,
  ImagePlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadImageToImgBB } from '@/lib/imgbb';

export default function AdminDashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const db = useFirestore();

  // State Management
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [isAddingGallery, setIsAddingGallery] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Form States
  const [memberForm, setMemberForm] = useState({ fullName: '', position: '', school: '', image: null as File | null });
  const [galleryForm, setGalleryForm] = useState({ caption: '', image: null as File | null });

  useEffect(() => {
    const session = localStorage.getItem('dagm_admin_session');
    if (!session) {
      router.push('/admin/login');
    }
  }, [router]);

  const memoAspirations = useMemoFirebase(() => query(collection(db, 'aspirations'), orderBy('submittedAt', 'desc')), [db]);
  const memoMembers = useMemoFirebase(() => query(collection(db, 'members')), [db]);
  const memoGallery = useMemoFirebase(() => query(collection(db, 'gallery_images'), orderBy('uploadedAt', 'desc')), [db]);

  const { data: aspirations, isLoading: loadingAspirations } = useCollection(memoAspirations);
  const { data: members } = useCollection(memoMembers);
  const { data: gallery } = useCollection(memoGallery);

  const handleLogout = () => {
    localStorage.removeItem('dagm_admin_session');
    router.push('/admin/login');
  };

  const updateAspirationStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'aspirations', id), { status: newStatus });
      toast({ title: "Status Diperbarui", description: `Aspirasi kini berstatus ${newStatus}.` });
    } catch (err) {
      toast({ variant: "destructive", title: "Gagal memperbarui status" });
    }
  };

  const deleteAspiration = async (id: string) => {
    if (!confirm('Hapus aspirasi ini secara permanen?')) return;
    try {
      await deleteDoc(doc(db, 'aspirations', id));
      toast({ title: "Terhapus", description: "Aspirasi telah dihapus." });
    } catch (err) {
      toast({ variant: "destructive", title: "Gagal menghapus aspirasi" });
    }
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberForm.image) return toast({ variant: "destructive", title: "Foto Wajib Ada" });
    
    setIsUploading(true);
    try {
      const imageUrl = await uploadImageToImgBB(memberForm.image);
      const memberRef = doc(collection(db, 'members'));
      await setDoc(memberRef, {
        id: memberRef.id,
        fullName: memberForm.fullName,
        position: memberForm.position,
        school: memberForm.school,
        imageUrl,
        positionColor: 'black'
      });
      toast({ title: "Anggota Ditambahkan", description: `${memberForm.fullName} telah terdaftar.` });
      setMemberForm({ fullName: '', position: '', school: '', image: null });
      setIsAddingMember(false);
    } catch (err) {
      toast({ variant: "destructive", title: "Gagal Menambah Anggota" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryForm.image) return toast({ variant: "destructive", title: "Gambar Wajib Ada" });

    setIsUploading(true);
    try {
      const imageUrl = await uploadImageToImgBB(galleryForm.image);
      const imageRef = doc(collection(db, 'gallery_images'));
      await setDoc(imageRef, {
        id: imageRef.id,
        imageUrl,
        caption: galleryForm.caption,
        uploadedAt: new Date().toISOString()
      });
      toast({ title: "Foto Diunggah", description: "Foto baru telah ditambahkan ke galeri." });
      setGalleryForm({ caption: '', image: null });
      setIsAddingGallery(false);
    } catch (err) {
      toast({ variant: "destructive", title: "Gagal Mengunggah Foto" });
    } finally {
      setIsUploading(false);
    }
  };

  const deleteMember = async (id: string) => {
    if (!confirm('Hapus anggota ini dari kepengurusan?')) return;
    try {
      await deleteDoc(doc(db, 'members', id));
      toast({ title: "Terhapus", description: "Data anggota telah dihapus." });
    } catch (err) {
      toast({ variant: "destructive", title: "Gagal menghapus data" });
    }
  };

  const deleteGalleryImage = async (id: string) => {
    if (!confirm('Hapus foto ini dari galeri publik?')) return;
    try {
      await deleteDoc(doc(db, 'gallery_images', id));
      toast({ title: "Terhapus", description: "Foto telah dihapus dari galeri." });
    } catch (err) {
      toast({ variant: "destructive", title: "Gagal menghapus foto" });
    }
  };

  const SidebarNav = () => (
    <div className="flex flex-col h-full bg-white">
      <div className="p-8 border-b border-gray-100 flex items-center gap-3">
        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg">D</div>
        <span className="font-bold tracking-tighter text-xl text-kern">ADMIN DAGM</span>
      </div>
      <nav className="flex-1 p-6 space-y-2">
        <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl bg-gray-50 px-4 h-12 text-black">
          <LayoutDashboard size={18} /> <span className="text-sm font-semibold">Beranda</span>
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl hover:bg-gray-50 px-4 h-12 text-gray-500 hover:text-black transition-all">
          <MessageSquare size={18} /> <span className="text-sm font-semibold">Aspirasi</span>
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl hover:bg-gray-50 px-4 h-12 text-gray-500 hover:text-black transition-all">
          <Users size={18} /> <span className="text-sm font-semibold">Tim Kami</span>
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl hover:bg-gray-50 px-4 h-12 text-gray-500 hover:text-black transition-all">
          <ImageIcon size={18} /> <span className="text-sm font-semibold">Galeri</span>
        </Button>
      </nav>
      <div className="p-6 border-t border-gray-100">
        <Button 
          onClick={handleLogout}
          variant="ghost" 
          className="w-full justify-start gap-3 rounded-xl text-red-500 hover:text-white hover:bg-red-500 px-4 h-12 transition-all"
        >
          <LogOut size={18} /> <span className="text-sm font-semibold">Keluar Sesi</span>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FBFBFB] flex flex-col md:flex-row">
      <aside className="hidden md:flex w-72 border-r border-gray-100 flex-col fixed h-full z-20 bg-white">
        <SidebarNav />
      </aside>

      <main className="flex-1 md:ml-72 p-6 md:p-12 transition-all">
        <header className="flex md:hidden justify-between items-center mb-8 bg-white p-4 -m-6 mb-8 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xs">D</div>
            <span className="font-bold tracking-tighter text-lg">ADMIN DAGM</span>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-xl">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
              <div className="sr-only">
                <SheetTitle>Menu Navigasi Admin</SheetTitle>
                <SheetDescription>Akses pengelolaan konten dewan.</SheetDescription>
              </div>
              <SidebarNav />
            </SheetContent>
          </Sheet>
        </header>

        <header className="hidden md:flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter text-kern text-black uppercase">Panel Kontrol</h1>
            <p className="text-gray-400 mt-1 font-medium text-sm">Kelola seluruh data aspirasi dan profil lembaga.</p>
          </div>
          <Badge variant="outline" className="px-4 py-2 border-gray-200 text-gray-500 font-bold tracking-widest uppercase text-[9px] bg-white">Versi 2.5.0</Badge>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-black text-white hover:scale-[1.02] transition-transform duration-300">
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                  <MessageSquare size={24} />
                </div>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold mb-2 tracking-tighter">{aspirations?.length || 0}</h3>
              <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">Total Aspirasi Masuk</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white hover:scale-[1.02] transition-transform duration-300 border border-gray-100">
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-gray-50 text-black rounded-2xl flex items-center justify-center">
                  <Users size={24} />
                </div>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold mb-2 tracking-tighter text-black">{members?.length || 0}</h3>
              <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">Anggota Aktif</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white hover:scale-[1.02] transition-transform duration-300 border border-gray-100 sm:col-span-2 lg:col-span-1">
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-gray-50 text-black rounded-2xl flex items-center justify-center">
                  <ImageIcon size={24} />
                </div>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold mb-2 tracking-tighter text-black">{gallery?.length || 0}</h3>
              <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">Dokumentasi Galeri</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="aspirations" className="space-y-8">
          <div className="overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            <TabsList className="bg-transparent border-b border-gray-100 rounded-none w-full justify-start p-0 h-auto space-x-6 min-w-[400px]">
              <TabsTrigger value="aspirations" className="border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent rounded-none px-0 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 data-[state=active]:text-black transition-all">
                Daftar Aspirasi
              </TabsTrigger>
              <TabsTrigger value="team" className="border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent rounded-none px-0 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 data-[state=active]:text-black transition-all">
                Manajemen Tim
              </TabsTrigger>
              <TabsTrigger value="gallery" className="border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent rounded-none px-0 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 data-[state=active]:text-black transition-all">
                Galeri Publik
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="aspirations" className="space-y-6 outline-none animate-in fade-in slide-in-from-bottom-2">
            {loadingAspirations ? (
              <div className="py-20 text-center text-gray-400 italic font-medium">Memproses data...</div>
            ) : aspirations?.length === 0 ? (
              <div className="py-24 text-center text-gray-400 italic bg-white rounded-3xl border border-dashed border-gray-200">
                Belum ada aspirasi yang diterima.
              </div>
            ) : (
              aspirations?.map((asp) => (
                <Card key={asp.id} className="border-none shadow-sm rounded-3xl overflow-hidden bg-white hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 md:p-8 flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
                    <div className="flex-1 w-full">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <Badge className="px-3 py-1 font-bold tracking-widest uppercase text-[9px] bg-black text-white border-none rounded-lg">{asp.submissionCode}</Badge>
                        <span className="text-[10px] text-gray-300 uppercase tracking-widest font-bold">{new Date(asp.submittedAt).toLocaleString('id-ID')}</span>
                      </div>
                      <h4 className="text-xl md:text-2xl font-bold mb-3 tracking-tighter text-black">
                        {asp.submitterName} <span className="text-gray-300 font-light mx-2">|</span> <span className="text-gray-400 font-light text-sm">{asp.submitterEmail}</span>
                      </h4>
                      <p className="text-gray-600 font-light leading-relaxed mb-6 text-sm md:text-base">{asp.content}</p>
                      
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] uppercase tracking-widest font-bold ${
                        asp.status === 'Selesai' ? 'bg-green-50 text-green-600' :
                        asp.status === 'Proses' ? 'bg-blue-50 text-blue-600' : 'bg-yellow-50 text-yellow-600'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          asp.status === 'Selesai' ? 'bg-green-500' :
                          asp.status === 'Proses' ? 'bg-blue-500' : 'bg-yellow-500'
                        }`}></div>
                        {asp.status}
                      </div>
                    </div>
                    
                    <div className="flex flex-row lg:flex-col gap-2 w-full lg:w-auto mt-4 lg:mt-0 pt-6 lg:pt-0 border-t lg:border-t-0 border-gray-50">
                      <Button 
                        onClick={() => updateAspirationStatus(asp.id, 'Proses')}
                        variant="outline" 
                        className="flex-1 lg:w-32 rounded-xl h-10 text-[9px] uppercase tracking-widest font-bold border-gray-100 hover:bg-blue-50 hover:text-blue-600 transition-all"
                      >
                        Tindak Lanjut
                      </Button>
                      <Button 
                        onClick={() => updateAspirationStatus(asp.id, 'Selesai')}
                        variant="outline" 
                        className="flex-1 lg:w-32 rounded-xl h-10 text-[9px] uppercase tracking-widest font-bold border-gray-100 hover:bg-green-50 hover:text-green-600 transition-all"
                      >
                        Selesaikan
                      </Button>
                      <Button 
                        onClick={() => deleteAspiration(asp.id)}
                        variant="ghost" 
                        className="rounded-xl h-10 text-[9px] uppercase tracking-widest font-bold text-red-300 hover:text-red-500 hover:bg-red-50"
                      >
                        <Trash2 size={14} className="mr-2" /> Hapus
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="team" className="outline-none animate-in fade-in slide-in-from-bottom-2">
            <Card className="border-none shadow-sm rounded-3xl bg-white p-6 md:p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h4 className="text-xl md:text-2xl font-bold tracking-tighter text-black uppercase">Struktur Kepengurusan</h4>
                  <p className="text-xs text-gray-400 font-medium">Kelola profil anggota dewan strategis.</p>
                </div>
                <Dialog open={isAddingMember} onOpenChange={setIsAddingMember}>
                  <DialogTrigger asChild>
                    <Button className="bg-black text-white rounded-xl shadow-lg hover:scale-105 transition-all gap-2 px-6">
                      <UserPlus size={18} /> <span className="text-[10px] uppercase font-bold tracking-widest">Tambah Anggota</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="rounded-[2rem] max-w-lg">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold tracking-tighter">Profil Baru</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAddMember} className="space-y-6 pt-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Nama Lengkap</Label>
                        <Input value={memberForm.fullName} onChange={e => setMemberForm({...memberForm, fullName: e.target.value})} placeholder="Contoh: Andi Pratama" required />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Jabatan / Peran</Label>
                        <Input value={memberForm.position} onChange={e => setMemberForm({...memberForm, position: e.target.value})} placeholder="Contoh: Ketua Dewan" required />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Asal Institusi / Sekolah</Label>
                        <Input value={memberForm.school} onChange={e => setMemberForm({...memberForm, school: e.target.value})} placeholder="Contoh: SMA Negeri 1 Jakarta" required />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Foto Anggota (Unggah)</Label>
                        <div className="flex items-center gap-4">
                          <Input type="file" onChange={e => setMemberForm({...memberForm, image: e.target.files?.[0] || null})} className="cursor-pointer" accept="image/*" required />
                        </div>
                      </div>
                      <DialogFooter className="pt-4">
                        <Button type="submit" disabled={isUploading} className="w-full bg-black text-white rounded-xl h-12 uppercase font-bold tracking-widest text-[10px]">
                          {isUploading ? <Loader2 className="animate-spin" /> : "Daftarkan Anggota"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {members?.map(m => (
                  <div key={m.id} className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50 group hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100">
                    <img src={m.imageUrl} className="w-16 h-16 rounded-2xl object-cover shadow-sm grayscale group-hover:grayscale-0 transition-all" alt={m.fullName} />
                    <div className="flex-1 overflow-hidden">
                      <p className="font-bold text-sm text-black truncate">{m.fullName}</p>
                      <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold truncate">{m.position}</p>
                      <p className="text-[8px] text-gray-300 font-medium truncate">{m.school}</p>
                    </div>
                    <Button onClick={() => deleteMember(m.id)} variant="ghost" size="icon" className="md:opacity-0 group-hover:opacity-100 text-red-200 hover:text-red-500 hover:bg-red-50 transition-all rounded-xl"><Trash2 size={16} /></Button>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="gallery" className="outline-none animate-in fade-in slide-in-from-bottom-2">
            <Card className="border-none shadow-sm rounded-3xl bg-white p-6 md:p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h4 className="text-xl md:text-2xl font-bold tracking-tighter text-black uppercase">Arsip Dokumentasi</h4>
                  <p className="text-xs text-gray-400 font-medium">Unggah jejak langkah kegiatan dewan.</p>
                </div>
                <Dialog open={isAddingGallery} onOpenChange={setIsAddingGallery}>
                  <DialogTrigger asChild>
                    <Button className="bg-black text-white rounded-xl shadow-lg hover:scale-105 transition-all gap-2 px-6">
                      <ImagePlus size={18} /> <span className="text-[10px] uppercase font-bold tracking-widest">Unggah Foto</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="rounded-[2rem] max-w-lg">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold tracking-tighter">Dokumentasi Baru</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAddGallery} className="space-y-6 pt-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Takarir / Keterangan Foto</Label>
                        <Input value={galleryForm.caption} onChange={e => setGalleryForm({...galleryForm, caption: e.target.value})} placeholder="Contoh: Rapat Kerja Nasional I 2026" required />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Berkas Gambar</Label>
                        <Input type="file" onChange={e => setGalleryForm({...galleryForm, image: e.target.files?.[0] || null})} className="cursor-pointer" accept="image/*" required />
                      </div>
                      <DialogFooter className="pt-4">
                        <Button type="submit" disabled={isUploading} className="w-full bg-black text-white rounded-xl h-12 uppercase font-bold tracking-widest text-[10px]">
                          {isUploading ? <Loader2 className="animate-spin" /> : "Simpan ke Galeri"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {gallery?.map(g => (
                  <div key={g.id} className="aspect-square rounded-2xl overflow-hidden relative group shadow-sm bg-gray-100">
                    <img src={g.imageUrl} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" alt={g.caption} />
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center p-4 text-center">
                      <p className="text-[9px] text-white font-bold uppercase tracking-widest mb-4 leading-tight">{g.caption}</p>
                      <Button onClick={() => deleteGalleryImage(g.id)} variant="ghost" size="icon" className="text-red-400 hover:text-white hover:bg-red-500 rounded-xl transition-all"><Trash2 size={18} /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
