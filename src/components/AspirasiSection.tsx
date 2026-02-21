
"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Loader2, Send, Search, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFirestore, useMemoFirebase, useDoc } from '@/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export function AspirasiSection() {
  const [activeTab, setActiveTab] = useState<'submit' | 'track'>('submit');
  const [formData, setFormData] = useState({ name: '', email: '', content: '' });
  const [trackCode, setTrackCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);
  const { toast } = useToast();
  const db = useFirestore();

  // Tracking logic
  const memoTrackingRef = useMemoFirebase(() => {
    if (!db || !trackCode || trackCode.length < 5) return null;
    return doc(db, 'aspirations', trackCode.toUpperCase());
  }, [db, trackCode]);

  const { data: trackedAspiration, isLoading: isTracking } = useDoc(memoTrackingRef);

  const generateCode = () => {
    return 'DAGM-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) return;
    
    setIsSubmitting(true);
    const code = generateCode();
    
    const docRef = doc(db, 'aspirations', code);
    const aspirationData = {
      submissionCode: code,
      title: formData.content.substring(0, 50) + '...',
      content: formData.content,
      status: 'Menunggu',
      submittedAt: new Date().toISOString(),
      submitterName: formData.name,
      submitterEmail: formData.email,
      category: 'Umum'
    };

    setDoc(docRef, aspirationData)
      .then(() => {
        setIsSubmitting(false);
        setSubmittedCode(code);
        setFormData({ name: '', email: '', content: '' });
        toast({
          title: "Aspirasi Terdaftar",
          description: `Gunakan kode ${code} untuk melacak status aspirasi Anda.`
        });
      })
      .catch((err) => {
        setIsSubmitting(false);
        const error = new FirestorePermissionError({
          path: docRef.path,
          operation: 'create',
          requestResourceData: aspirationData
        });
        errorEmitter.emit('permission-error', error);
      });
  };

  if (submittedCode) {
    return (
      <section id="aspiration" className="py-40 bg-white text-black flex items-center justify-center">
        <div className="max-w-2xl px-6 text-center">
          <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-10">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="text-4xl md:text-5xl font-medium tracking-tighter mb-6">Aspirasi Terkirim</h3>
          <p className="text-gray-500 text-lg font-light leading-relaxed mb-8">
            Terima kasih atas kontribusi Anda. Simpan kode pelacakan di bawah ini untuk melihat perkembangan aspirasi Anda secara berkala.
          </p>
          <div className="bg-gray-50 p-6 rounded-2xl mb-12 border border-gray-100">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Kode Pelacakan Anda</p>
            <p className="text-3xl font-bold tracking-widest">{submittedCode}</p>
          </div>
          <Button 
            onClick={() => setSubmittedCode(null)}
            className="rounded-full bg-black text-white hover:bg-gray-800 px-8 py-4 text-[10px] uppercase tracking-[0.4em] font-bold h-auto"
          >
            Kirim Aspirasi Lain
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section id="aspiration" className="py-40 bg-white text-black">
      <div className="max-w-4xl mx-auto px-8">
        <div className="mb-20 text-center">
          <h2 className="text-[10px] uppercase tracking-[1.2em] text-gray-400 mb-10 font-bold">Ruang Partisipasi</h2>
          <h3 className="text-5xl md:text-6xl font-light tracking-tighter leading-none text-kern mb-12">Suarakan <br /> Gagasan Anda.</h3>
          
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => setActiveTab('submit')}
              className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all ${activeTab === 'submit' ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'}`}
            >
              Kirim Aspirasi
            </button>
            <button 
              onClick={() => setActiveTab('track')}
              className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all ${activeTab === 'track' ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'}`}
            >
              Lacak Aspirasi
            </button>
          </div>
        </div>

        {activeTab === 'submit' ? (
          <form onSubmit={handleSubmit} className="space-y-16">
            <div className="grid md:grid-cols-2 gap-20">
              <div className="border-b border-gray-100 py-6 focus-within:border-black transition-all duration-300">
                <Label htmlFor="name" className="text-[10px] uppercase font-bold text-gray-400 block mb-4 tracking-widest">Nama Lengkap</Label>
                <Input 
                  id="name" 
                  className="w-full bg-transparent border-none outline-none text-2xl font-light p-0 h-auto placeholder:text-gray-200 text-black focus-visible:ring-0" 
                  placeholder="Nama Sesuai KTP" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required 
                />
              </div>
              <div className="border-b border-gray-100 py-6 focus-within:border-black transition-all duration-300">
                <Label htmlFor="email" className="text-[10px] uppercase font-bold text-gray-400 block mb-4 tracking-widest">Alamat Surel</Label>
                <Input 
                  id="email" 
                  type="email"
                  className="w-full bg-transparent border-none outline-none text-2xl font-light p-0 h-auto placeholder:text-gray-200 text-black focus-visible:ring-0" 
                  placeholder="surel@lembaga.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required 
                />
              </div>
            </div>

            <div className="border-b border-gray-100 py-6 focus-within:border-black transition-all duration-300">
              <Label htmlFor="content" className="text-[10px] uppercase font-bold text-gray-400 block mb-4 tracking-widest">Isi Aspirasi</Label>
              <Textarea 
                id="content" 
                className="w-full bg-transparent border-none outline-none text-2xl font-light min-h-[160px] p-0 resize-none placeholder:text-gray-200 text-black focus-visible:ring-0" 
                placeholder="Uraikan gagasan atau rekomendasi Anda secara mendalam..." 
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                required
              />
            </div>

            <div className="flex justify-center pt-12">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-black text-white px-8 py-4 rounded-full text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-gray-800 transition-all duration-500 h-auto shadow-xl"
              >
                {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : <Send className="mr-2" size={16} />}
                Kirim Sekarang
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-12">
            <div className="max-w-xl mx-auto">
              <div className="border-b border-gray-100 py-6 focus-within:border-black transition-all duration-300">
                <Label htmlFor="track-code" className="text-[10px] uppercase font-bold text-gray-400 block mb-4 tracking-widest text-center">Masukkan Kode Pelacakan</Label>
                <div className="flex items-center gap-4">
                  <Input 
                    id="track-code" 
                    className="w-full bg-transparent border-none outline-none text-4xl font-bold p-0 h-auto placeholder:text-gray-100 text-center uppercase tracking-widest focus-visible:ring-0" 
                    placeholder="DAGM-XXXXXX" 
                    value={trackCode}
                    onChange={(e) => setTrackCode(e.target.value)}
                  />
                  <Search className="text-gray-200" size={32} />
                </div>
              </div>
            </div>

            {isTracking && (
              <div className="flex justify-center py-10">
                <Loader2 className="animate-spin text-gray-200" size={40} />
              </div>
            )}

            {trackedAspiration && (
              <div className="max-w-2xl mx-auto bg-gray-50 rounded-[2rem] p-10 border border-gray-100">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Status Aspirasi</p>
                    <div className="flex items-center gap-3">
                      <span className={`w-3 h-3 rounded-full ${
                        trackedAspiration.status === 'Selesai' ? 'bg-green-500' : 
                        trackedAspiration.status === 'Proses' ? 'bg-blue-500' : 'bg-yellow-500'
                      }`}></span>
                      <h4 className="text-2xl font-bold">{trackedAspiration.status}</h4>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Tanggal Kirim</p>
                    <p className="font-medium">{new Date(trackedAspiration.submittedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Isi Aspirasi</p>
                    <p className="text-gray-600 font-light leading-relaxed">{trackedAspiration.content}</p>
                  </div>
                  {trackedAspiration.summary && (
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                      <div className="flex items-center gap-2 mb-3 text-blue-600">
                        <Info size={14} />
                        <p className="text-[10px] uppercase tracking-widest font-bold">Ringkasan AI</p>
                      </div>
                      <p className="text-sm italic text-gray-500">{trackedAspiration.summary}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {!isTracking && trackCode.length >= 5 && !trackedAspiration && (
              <div className="text-center text-gray-300 py-10 font-light">
                Data aspirasi tidak ditemukan. Pastikan kode benar.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
