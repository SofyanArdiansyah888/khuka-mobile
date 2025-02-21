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
// ambil data poin dan cashback
export const fetchPoin = async (userId: number | string) => {
  try {
    const response = await api.get(`/poincashback/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching rewards data:', error);
    throw error;
  }
};


