import api from '../utils/axios';
// Fetch promo data
export const fetchPromo = async (tipe: string) => {
    try {
        const response = await api.get('/promo', {
            params: { tipe },  // Add tipe as a query parameter
        });
      return response.data;
    } catch (error) {
      console.error('Error fetching promo data:', error);
      throw error;
    }
  };
  export const fetchProduk = async (limit: string,kategori:string) => {
    try {
        const response = await api.get('/produk', {
            params: { limit,kategori },  
        });
      return response.data;
    } catch (error) {
      console.error('Error fetching produk data:', error);
      throw error;
    }
  };