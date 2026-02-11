
"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Megaphone, Sparkles, Send, CheckCircle2, Loader2 } from "lucide-react";
import { summarizeAspiration } from '@/ai/flows/summarize-aspirations';
import { useToast } from "@/hooks/use-toast";

export function AspirasiSection() {
  const [aspiration, setAspiration] = useState('');
  const [summary, setSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSummarize = async () => {
    if (!aspiration.trim()) {
      toast({
        variant: "destructive",
        title: "Input Kosong",
        description: "Silakan masukkan aspirasi Anda terlebih dahulu."
      });
      return;
    }

    setIsSummarizing(true);
    try {
      const result = await summarizeAspiration(aspiration);
      setSummary(result);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal Meringkas",
        description: "Maaf, terjadi kesalahan saat memproses ringkasan."
      });
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast({
        title: "Berhasil Terkirim",
        description: "Aspirasi Anda telah kami terima dan akan segera diproses."
      });
    }, 1500);
  };

  if (submitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto border-emerald-100 shadow-glow animate-fade-up">
        <CardContent className="pt-12 pb-12 text-center">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h3 className="text-2xl font-bold mb-2">Terima Kasih!</h3>
          <p className="text-muted-foreground mb-8">
            Suara Anda sangat berharga bagi kemajuan generasi muda.
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSubmitted(false);
              setAspiration('');
              setSummary('');
            }}
          >
            Kirim Aspirasi Lain
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <section id="aspirasi" className="py-24 bg-background">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            E-Aspirasi Digital
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-6 font-headline">
            Sampaikan Suaramu
          </h2>
          <p className="text-slate-500 mt-3 max-w-2xl mx-auto">
            Wadah digital untuk menyampaikan keresahan, ide, dan harapan demi masa depan pendidikan yang lebih inklusif.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
                <Sparkles size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Dukungan GenAI</h4>
                <p className="text-sm text-slate-500">
                  Platform kami menggunakan kecerdasan buatan untuk membantu meringkas aspirasi panjang Anda agar lebih mudah dipahami oleh anggota dewan.
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                <Megaphone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Transparansi</h4>
                <p className="text-sm text-slate-500">
                  Setiap aspirasi akan diregistrasi dan Anda dapat melacak status tindak lanjutnya melalui portal anggota.
                </p>
              </div>
            </div>
          </div>

          <Card className="shadow-card border-slate-100 overflow-hidden">
            <CardHeader className="bg-slate-50/50">
              <CardTitle className="font-headline">Formulir Aspirasi</CardTitle>
              <CardDescription>Lengkapi detail di bawah ini untuk mengirimkan aspirasi Anda.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input id="name" placeholder="Fulan bin Fulan" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="school">Asal Sekolah</Label>
                    <Input id="school" placeholder="SMAN 1 Bandung" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subjek Isu</Label>
                  <Input id="subject" placeholder="Contoh: Infrastruktur Perpustakaan" required />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="aspiration">Isi Aspirasi</Label>
                    <button 
                      type="button"
                      onClick={handleSummarize}
                      disabled={isSummarizing || !aspiration}
                      className="text-xs font-bold text-emerald-600 flex items-center gap-1 hover:text-emerald-700 disabled:opacity-50 transition-colors"
                    >
                      {isSummarizing ? <Loader2 className="animate-spin" size={12} /> : <Sparkles size={12} />}
                      Ringkas dengan AI
                    </button>
                  </div>
                  <Textarea 
                    id="aspiration" 
                    placeholder="Ceritakan aspirasi atau permasalahan Anda secara mendetail..."
                    className="min-h-[150px]"
                    value={aspiration}
                    onChange={(e) => setAspiration(e.target.value)}
                    required
                  />
                </div>

                {summary && (
                  <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100 animate-fade-up">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles size={14} className="text-emerald-600" />
                      <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Ringkasan AI:</span>
                    </div>
                    <p className="text-sm text-slate-700 italic">"{summary}"</p>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : <Send className="mr-2" size={18} />}
                  Kirim Sekarang
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
