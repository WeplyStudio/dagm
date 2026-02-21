"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AspirasiSection() {
  const [aspiration, setAspiration] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast({
        title: "Dokumen Aspirasi Diterima",
        description: "Aspirasi Anda telah terdaftar dalam sistem dewan untuk proses penelaahan lebih lanjut secara resmi."
      });
    }, 1500);
  };

  if (submitted) {
    return (
      <section id="aspiration" className="py-40 bg-white text-black flex items-center justify-center">
        <div className="max-w-2xl px-6 text-center reveal-form">
          <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-10">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="text-4xl md:text-5xl font-medium tracking-tighter mb-6">Registrasi Berhasil</h3>
          <p className="text-gray-500 text-lg font-light leading-relaxed mb-12">
            Kontribusi pemikiran Anda telah tercatat secara resmi sebagai bagian dari pangkalan data aspirasi strategis nasional.
          </p>
          <Button 
            onClick={() => {
              setSubmitted(false);
              setAspiration('');
            }}
            className="rounded-full bg-black text-white hover:bg-gray-800 px-8 py-4 text-[10px] uppercase tracking-[0.4em] font-bold h-auto"
          >
            Ajukan Aspirasi Baru
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section id="aspiration" className="py-40 bg-white text-black">
      <div className="max-w-4xl mx-auto px-8">
        <div className="mb-32 text-center reveal-form">
          <h2 className="text-[10px] uppercase tracking-[1.2em] text-gray-400 mb-10 font-bold">Ruang Partisipasi</h2>
          <h3 className="text-6xl font-light tracking-tighter leading-none text-kern">Sampaikan <br /> Aspirasi Anda.</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-16 reveal-form">
          <div className="grid md:grid-cols-2 gap-20">
            <div className="border-b border-gray-100 py-6 focus-within:border-black transition-all duration-300">
              <Label htmlFor="name" className="text-[10px] uppercase font-bold text-gray-400 block mb-4 tracking-widest">Nama Lengkap</Label>
              <Input 
                id="name" 
                className="w-full bg-transparent border-none outline-none text-2xl font-light p-0 h-auto placeholder:text-gray-200 text-black focus-visible:ring-0" 
                placeholder="Identitas Resmi" 
                required 
              />
            </div>
            <div className="border-b border-gray-100 py-6 focus-within:border-black transition-all duration-300">
              <Label htmlFor="email" className="text-[10px] uppercase font-bold text-gray-400 block mb-4 tracking-widest">Alamat Surel</Label>
              <Input 
                id="email" 
                type="email"
                className="w-full bg-transparent border-none outline-none text-2xl font-light p-0 h-auto placeholder:text-gray-200 text-black focus-visible:ring-0" 
                placeholder="nama@institusi.com" 
                required 
              />
            </div>
          </div>

          <div className="border-b border-gray-100 py-6 focus-within:border-black transition-all duration-300">
            <Label htmlFor="aspiration" className="text-[10px] uppercase font-bold text-gray-400 block mb-4 tracking-widest">Pesan Aspirasi</Label>
            <Textarea 
              id="aspiration" 
              className="w-full bg-transparent border-none outline-none text-2xl font-light min-h-[160px] p-0 resize-none placeholder:text-gray-200 text-black focus-visible:ring-0" 
              placeholder="Uraikan gagasan atau rekomendasi Anda untuk bangsa..." 
              value={aspiration}
              onChange={(e) => setAspiration(e.target.value)}
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
              Kirim Aspirasi Sekarang
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}