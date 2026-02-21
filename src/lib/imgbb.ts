'use client';

/**
 * @fileOverview Layanan utilitas untuk mengunggah gambar ke ImgBB API.
 */

export async function uploadImageToImgBB(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('image', file);
  
  /**
   * Menggunakan Kunci API ImgBB yang diberikan oleh pengguna.
   * Prioritas pertama menggunakan environment variable jika tersedia,
   * jika tidak menggunakan kunci statis yang telah diperbarui.
   */
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY || '1fa90970c71549cdd68ce59dcf6f3a12'; 
  
  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      return result.data.url;
    } else {
      throw new Error(result.error?.message || 'Gagal mengunggah gambar ke server ImgBB.');
    }
  } catch (error) {
    // Kesalahan ditangani secara terpusat oleh pemanggil fungsi ini (di Dashboard Admin)
    throw error;
  }
}
