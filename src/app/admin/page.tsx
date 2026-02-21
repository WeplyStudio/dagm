
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { 
  Users, 
  MessageSquare, 
  Image as ImageIcon, 
  LogOut, 
  CheckCircle2, 
  Clock, 
  MoreHorizontal,
  Plus,
  Trash2,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const db = useFirestore();

  useEffect(() => {
    const session = localStorage.getItem('dagm_admin_session');
    if (!session) {
      router.push('/admin/login');
    }
  }, [router]);

  const memoAspirations = useMemoFirebase(() => query(collection(db, 'aspirations'), orderBy('submittedAt', 'desc')), [db]);
  const memoMembers = useMemoFirebase(() => query(collection(db, 'members')), [db]);
  const memoGallery = useMemoFirebase(() => query(collection(db, 'gallery_images')), [db]);

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
      toast({ title: "Status Diperbarui", description: `Aspirasi ${id} kini berstatus ${newStatus}.` });
    } catch (err) {
      toast({ variant: "destructive", title: "Gagal memperbarui status" });
    }
  };

  const deleteAspiration = async (id: string) => {
    if (!confirm('Hapus aspirasi ini?')) return;
    try {
      await deleteDoc(doc(db, 'aspirations', id));
      toast({ title: "Terhapus", description: "Aspirasi telah dihapus dari sistem." });
    } catch (err) {
      toast({ variant: "destructive", title: "Gagal menghapus" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-100 flex flex-col fixed h-full z-10">
        <div className="p-8 border-b border-gray-100 flex items-center gap-3">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xs">D</div>
          <span className="font-bold tracking-tighter text-xl">DAGM ADMIN</span>
        </div>
        <nav className="flex-1 p-6 space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl hover:bg-gray-50 px-4 h-12">
            <MessageSquare size={18} /> <span className="text-sm font-medium">Aspirasi</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl hover:bg-gray-50 px-4 h-12">
            <Users size={18} /> <span className="text-sm font-medium">Struktur Dewan</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl hover:bg-gray-50 px-4 h-12">
            <ImageIcon size={18} /> <span className="text-sm font-medium">Galeri</span>
          </Button>
        </nav>
        <div className="p-6 border-t border-gray-100">
          <Button 
            onClick={handleLogout}
            variant="ghost" 
            className="w-full justify-start gap-3 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50 px-4 h-12"
          >
            <LogOut size={18} /> <span className="text-sm font-medium">Keluar</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 p-12">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter">Dashboard Pengelolaan</h1>
            <p className="text-gray-400 mt-1 font-medium text-sm">Kelola seluruh aspirasi dan konten situs secara real-time.</p>
          </div>
          <div className="flex gap-4">
            <Badge variant="outline" className="px-4 py-2 border-gray-200 text-gray-500 font-bold tracking-widest uppercase text-[10px]">Ver. 2.0.1</Badge>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-black text-white">
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                  <MessageSquare size={24} />
                </div>
                <Badge className="bg-white/20 text-white border-none uppercase text-[8px] tracking-widest">Real-time</Badge>
              </div>
              <h3 className="text-5xl font-bold mb-2">{aspirations?.length || 0}</h3>
              <p className="text-gray-400 text-xs uppercase tracking-widest font-bold">Total Aspirasi Masuk</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                  <Users size={24} />
                </div>
              </div>
              <h3 className="text-5xl font-bold mb-2">{members?.length || 0}</h3>
              <p className="text-gray-400 text-xs uppercase tracking-widest font-bold">Anggota Dewan Aktif</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                  <ImageIcon size={24} />
                </div>
              </div>
              <h3 className="text-5xl font-bold mb-2">{gallery?.length || 0}</h3>
              <p className="text-gray-400 text-xs uppercase tracking-widest font-bold">Foto Dokumentasi</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="aspirations" className="space-y-8">
          <TabsList className="bg-transparent border-b border-gray-100 rounded-none w-full justify-start p-0 h-auto space-x-8">
            <TabsTrigger value="aspirations" className="border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent rounded-none px-0 py-4 text-sm font-bold uppercase tracking-widest text-gray-400 data-[state=active]:text-black">
              Kelola Aspirasi
            </TabsTrigger>
            <TabsTrigger value="content" className="border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent rounded-none px-0 py-4 text-sm font-bold uppercase tracking-widest text-gray-400 data-[state=active]:text-black">
              Konten Situs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="aspirations" className="space-y-6 outline-none">
            {loadingAspirations ? (
              <div className="py-20 text-center text-gray-400 italic font-light">Memuat aspirasi...</div>
            ) : aspirations?.length === 0 ? (
              <div className="py-20 text-center text-gray-400 italic font-light bg-white rounded-3xl border border-dashed border-gray-200">
                Belum ada aspirasi yang masuk.
              </div>
            ) : (
              aspirations?.map((asp) => (
                <Card key={asp.id} className="border-none shadow-sm rounded-3xl overflow-hidden bg-white hover:shadow-md transition-all group">
                  <CardContent className="p-8 flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge variant="outline" className="px-3 py-1 font-bold tracking-widest uppercase text-[9px] bg-gray-50 border-none">{asp.id}</Badge>
                        <span className="text-[10px] text-gray-300 uppercase tracking-widest font-bold">{new Date(asp.submittedAt).toLocaleString()}</span>
                      </div>
                      <h4 className="text-2xl font-bold mb-4 tracking-tighter">{asp.submitterName} <span className="text-gray-300 font-light">&bull; {asp.submitterEmail}</span></h4>
                      <p className="text-gray-600 font-light leading-relaxed mb-6">{asp.content}</p>
                      
                      <div className="flex flex-wrap gap-4">
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] uppercase tracking-widest font-bold ${
                          asp.status === 'Selesai' ? 'bg-green-50 text-green-600' :
                          asp.status === 'Proses' ? 'bg-blue-50 text-blue-600' : 'bg-yellow-50 text-yellow-600'
                        }`}>
                          <Clock size={12} /> {asp.status}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 w-full md:w-auto">
                      <Button 
                        onClick={() => updateAspirationStatus(asp.id, 'Proses')}
                        variant="outline" 
                        className="rounded-xl h-10 px-6 text-[10px] uppercase tracking-widest font-bold border-gray-100 hover:bg-blue-50 hover:text-blue-600 transition-all"
                      >
                        Set Proses
                      </Button>
                      <Button 
                        onClick={() => updateAspirationStatus(asp.id, 'Selesai')}
                        variant="outline" 
                        className="rounded-xl h-10 px-6 text-[10px] uppercase tracking-widest font-bold border-gray-100 hover:bg-green-50 hover:text-green-600 transition-all"
                      >
                        Set Selesai
                      </Button>
                      <Button 
                        onClick={() => deleteAspiration(asp.id)}
                        variant="ghost" 
                        className="rounded-xl h-10 px-6 text-[10px] uppercase tracking-widest font-bold text-red-300 hover:text-red-500 hover:bg-red-50 transition-all"
                      >
                        <Trash2 size={14} className="mr-2" /> Hapus
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="content" className="outline-none">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-none shadow-sm rounded-3xl bg-white p-8">
                <div className="flex justify-between items-center mb-8">
                  <h4 className="text-xl font-bold tracking-tighter">Pengelolaan Tim</h4>
                  <Button size="icon" className="bg-black text-white rounded-xl"><Plus size={18} /></Button>
                </div>
                <div className="space-y-4">
                  {members?.map(m => (
                    <div key={m.id} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 group">
                      <img src={m.imageUrl} className="w-12 h-12 rounded-xl object-cover" />
                      <div className="flex-1">
                        <p className="font-bold text-sm">{m.fullName}</p>
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{m.position}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 text-red-300 transition-all"><Trash2 size={16} /></Button>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="border-none shadow-sm rounded-3xl bg-white p-8">
                <div className="flex justify-between items-center mb-8">
                  <h4 className="text-xl font-bold tracking-tighter">Pengelolaan Galeri</h4>
                  <Button size="icon" className="bg-black text-white rounded-xl"><Plus size={18} /></Button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {gallery?.map(g => (
                    <div key={g.id} className="aspect-square rounded-2xl overflow-hidden relative group">
                      <img src={g.imageUrl} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
                        <Button variant="ghost" size="icon" className="text-white"><Trash2 size={16} /></Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
