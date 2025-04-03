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
// ambil riwayat Reward
export const fetchRiwayatReward = async (userId: number | string) => {
  try {
    const response = await api.get(`/riwayat-redeem/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching riwayat reward data:', error);
    throw error;
  }
};
// ambil Syarat Redeem
export const fetchSyarat = async () => {
  try {
    const response = await api.get(`/syarat-reward`);
    return response.data;
  } catch (error) {
    console.error('Error fetching riwayat cashback data:', error);
    throw error;
  }
};
export const forgotPassword = async (payload: { kode_ref: string; no_hp: string }) => {
  try {
    const response = await api.post('/check-referall', payload);
    return response.data;
  } catch (error) {
    console.error('Error calling forgot password API:', error);
    throw error;
  }
};
export const otpCheck = async (payload: { otp: string }) => {
  try {
    const response = await api.post('/check-otp', payload);
    return response.data;
  } catch (error) {
    console.error('Error calling forgot password API:', error);
    throw error;
  }
};

// ambil riwayat Cashback
export const fetchRiwayatCashback = async (userId: number | string) => {
  try {
    const response = await api.get(`/riwayat-cashback/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching riwayat cashback data:', error);
    throw error;
  }
};

// Fetch paginated list of members
export const fetchListMember = async (userId: number | string, page: number = 1) => {
  try {
    const response = await api.get(`/list-member/${userId}?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching list member data:', error);
    throw error;
  }
};




