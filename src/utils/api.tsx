import api from '../utils/axios';




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

// ambil riwayat
export const fetchRiwayat = async (userId: number | string) => {
  try {
    const response = await api.get(`/riwayat/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching riwayat data:', error);
    throw error;
  }
};



