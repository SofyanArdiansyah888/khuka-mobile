import api from '../utils/axios';
// ambil data promo
export const fetchPromo = async (tipe: string) => {
  try {
    const response = await api.get('/promo', {
      params: { tipe }, // Add tipe as a query parameter
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching promo data:', error);
    throw error;
  }
};
// ambil data produk
export const fetchProduk = async (limit: string, kategori: string) => {
  try {
    const response = await api.get('/produk', {
      params: { limit, kategori },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching produk data:', error);
    throw error;
  }
};

// ambil data rewards
export const fetchRewards = async () => {
  try {
    const response = await api.get('/rewards');
    return response.data;
  } catch (error) {
    console.error('Error fetching rewards data:', error);
    throw error;
  }
};
// ambil data bank
export const dataBank = async () => {
  try {
    const response = await api.get('/bank');
    return response.data;
  } catch (error) {
    console.error('Error fetching bank data:', error);
    throw error;
  }
};
// ambil data metode pembayaran
export const dataMetode = async () => {
  try {
    const response = await api.get('/metode');
    return response.data;
  } catch (error) {
    console.error('Error fetching metode pembayaran data:', error);
    throw error;
  }
};
// ambil data pengambilan barang
export const dataTempat = async () => {
  try {
    const response = await api.get('/pengambilan-barang');
    return response.data;
  } catch (error) {
    console.error('Error fetching tempat data:', error);
    throw error;
  }
};
