"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { ShieldCheck, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/firebase';
import { signInAnonymously } from 'firebase/auth';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Verifikasi kredensial statis sesuai permintaan (admin / admin123)
    if (username === 'admin' && password === 'admin123') {
      try {
        // Melakukan autentikasi ke Firebase agar request.auth tidak null di Security Rules
        await signInAnonymously(auth);
        localStorage.setItem('dagm_admin_session', 'true');
        
        toast({ title: "Login Berhasil", description: "Selamat datang di Dashboard Admin DAGM." });
        router.push('/admin');
      } catch (err) {
        toast({ 
          variant: "destructive", 
          title: "Kesalahan Autentikasi", 
          description: "Gagal menghubungkan ke layanan keamanan Firebase." 
        });
      }
    } else {
      toast({ 
        variant: "destructive", 
        title: "Login Gagal", 
        description: "Kredensial yang Anda masukkan salah." 
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <Card className="w-full max-w-md border-none shadow-2xl rounded-[2rem] overflow-hidden">
        <CardHeader className="bg-black text-white py-12 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={32} />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tighter uppercase text-kern">Panel Kontrol Admin</CardTitle>
          <p className="text-gray-400 text-[10px] tracking-[0.3em] mt-2 uppercase font-bold">Dewan Aspirasi Generasi Muda</p>
        </CardHeader>
        <CardContent className="p-10 pt-12">
          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Username</Label>
              <Input 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="rounded-xl border-gray-100 bg-gray-50 h-12"
                placeholder="admin"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Password</Label>
              <Input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl border-gray-100 bg-gray-50 h-12"
                placeholder="••••••••"
                required
              />
            </div>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-black text-white h-12 rounded-xl text-[10px] uppercase tracking-widest font-bold hover:bg-gray-800 transition-all"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Masuk ke Dashboard"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="p-10 pt-0 text-center">
          <a href="/" className="text-[10px] uppercase tracking-widest font-bold text-gray-300 hover:text-black transition mx-auto">Kembali ke Situs Utama</a>
        </CardFooter>
      </Card>
    </div>
  );
}