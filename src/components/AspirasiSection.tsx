
"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Megaphone, Send, CheckCircle2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AspirasiSection() {
  const [aspiration, setAspiration] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast({
        title: "Berhasil Terkirim",
        description: "Aspirasi Anda telah kami terima dan akan segera diproses secara administratif."
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
            Wadah digital resmi untuk menyampaikan keresahan, ide, dan harapan demi masa depan pendidikan yang lebih inklusif.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                <Megaphone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Transparansi</h4>
                <p className="text-sm text-slate-500">
                  Setiap aspirasi akan diregistrasi secara resmi dan Anda dapat melacak status tindak lanjutnya melalui portal koordinasi.
                </p>
              </div>
            </div>
          </div>

          <Card className="shadow-card border-slate-100 overflow-hidden">
            <CardHeader className="bg-slate-50/50">
              <CardTitle className="font-headline">Formulir Aspirasi Resmi</CardTitle>
              <CardDescription>Lengkapi detail di bawah ini untuk mengirimkan aspirasi Anda kepada dewan.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input id="name" placeholder="Nama sesuai identitas" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="school">Asal Sekolah</Label>
                    <Input id="school" placeholder="Nama instansi pendidikan" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subjek Isu</Label>
                  <Input id="subject" placeholder="Misal: Evaluasi Infrastruktur Pendidikan" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aspiration">Isi Aspirasi</Label>
                  <Textarea 
                    id="aspiration" 
                    placeholder="Sampaikan aspirasi atau permasalahan Anda secara mendetail dan sistematis..."
                    className="min-h-[200px]"
                    value={aspiration}
                    onChange={(e) => setAspiration(e.target.value)}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : <Send className="mr-2" size={18} />}
                  Kirim Aspirasi
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
