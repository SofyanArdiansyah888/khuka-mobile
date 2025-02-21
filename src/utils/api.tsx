import api from '../utils/axios';



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
    console.error('Error fetching poin data:', error);
    throw error;
  }
};
// ambil data Kabupaten
export const fetchKabupaten = async () => {
  try {
    const response = await api.get('/kabupaten');
    return response.data;
  } catch (error) {
    console.error('Error fetching kabupaten data:', error);
    throw error;
  }
};
// ambil data metode
export const fetchMetode = async () => {
  try {
    const response = await api.get('/metode');
    return response.data;
  } catch (error) {
    console.error('Error fetching metode data:', error);
    throw error;
  }
};
// ambil data pengambilan
export const fetchPengambilan = async () => {
  try {
    const response = await api.get('/pengambilan-barang');
    return response.data;
  } catch (error) {
    console.error('Error fetching pengambilan barang data:', error);
    throw error;
  }
};


