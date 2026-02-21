
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
        description: "Aspirasi Anda telah diregistrasi dalam sistem database dewan untuk proses penelaahan lebih lanjut."
      });
    }, 1500);
  };

  if (submitted) {
    return (
      <section id="aspiration" className="py-40 bg-black text-white flex items-center justify-center">
        <div className="max-w-2xl px-6 text-center reveal-form">
          <div className="w-20 h-20 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-10">
            <CheckCircle2 size={40} />
          </div>
          <h3 className="text-4xl md:text-5xl font-medium tracking-tighter mb-6">Registrasi Berhasil</h3>
          <p className="text-gray-400 text-lg font-light leading-relaxed mb-12">
            Kontribusi pemikiran Anda telah tercatat secara resmi sebagai bagian dari database aspirasi strategis nasional.
          </p>
          <Button 
            onClick={() => {
              setSubmitted(false);
              setAspiration('');
            }}
            className="rounded-full bg-white text-black hover:bg-gray-200 px-10 py-6 text-[10px] uppercase tracking-[0.4em] font-bold h-auto"
          >
            Ajukan Aspirasi Baru
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section id="aspiration" className="py-40 bg-black text-white">
      <div className="max-w-4xl mx-auto px-8">
        <div className="mb-32 text-center reveal-form">
          <h2 className="text-[10px] uppercase tracking-[1.2em] text-gray-700 mb-10 font-bold">Ruang Partisipasi</h2>
          <h3 className="text-6xl font-light tracking-tighter leading-none text-kern">Sampaikan <br /> Aspirasi Anda.</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-16 reveal-form">
          <div className="grid md:grid-cols-2 gap-20">
            <div className="border-b border-gray-800 py-6 focus-within:border-white transition-all duration-300">
              <Label htmlFor="name" className="text-[10px] uppercase font-bold text-gray-500 block mb-4 tracking-widest">Nama Lengkap</Label>
              <Input 
                id="name" 
                className="w-full bg-transparent border-none outline-none text-2xl font-light p-0 h-auto placeholder:text-gray-800 text-white focus-visible:ring-0" 
                placeholder="Identiti Rasmi" 
                required 
              />
            </div>
            <div className="border-b border-gray-800 py-6 focus-within:border-white transition-all duration-300">
              <Label htmlFor="email" className="text-[10px] uppercase font-bold text-gray-500 block mb-4 tracking-widest">Alamat E-mel</Label>
              <Input 
                id="email" 
                type="email"
                className="w-full bg-transparent border-none outline-none text-2xl font-light p-0 h-auto placeholder:text-gray-800 text-white focus-visible:ring-0" 
                placeholder="email@institusi.com" 
                required 
              />
            </div>
          </div>

          <div className="border-b border-gray-800 py-6 focus-within:border-white transition-all duration-300">
            <Label htmlFor="aspiration" className="text-[10px] uppercase font-bold text-gray-500 block mb-4 tracking-widest">Mesej Aspirasi</Label>
            <Textarea 
              id="aspiration" 
              className="w-full bg-transparent border-none outline-none text-2xl font-light min-h-[160px] p-0 resize-none placeholder:text-gray-800 text-white focus-visible:ring-0" 
              placeholder="Huraikan gagasan atau cadangan anda untuk bangsa..." 
              value={aspiration}
              onChange={(e) => setAspiration(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-center pt-12">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-white text-black px-12 py-6 rounded-full text-[10px] uppercase tracking-[0.4em] font-bold hover:invert transition-all duration-500 h-auto shadow-xl"
            >
              {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : <Send className="mr-2" size={16} />}
              Hantar Aspirasi Sekarang
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
