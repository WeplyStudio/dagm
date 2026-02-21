'use client';

/**
 * @fileOverview Layanan utilitas untuk mengunggah gambar ke ImgBB API.
 */

export async function uploadImageToImgBB(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('image', file);
  
  // Gunakan API Key dari environment variable. 
  // Jika tidak ada, fungsi ini akan melemparkan kesalahan.
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY || '5608d488950d8804618753239794358a'; 
  
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
    console.error('Kesalahan Unggah ImgBB:', error);
    throw error;
  }
}
