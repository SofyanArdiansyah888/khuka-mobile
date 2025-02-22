import { getItem } from './khukhaDBTemp';

export interface PesananProduk {
    id_produk: number;
    quantity: number;
    harga: number;
    total_harga: number;
    poin: number;
    cashback: number;
}

export interface PesananData {
    id_member: string;
    nama_member: string;
    telpon_member: string;
    id_metode: string;
    cashback_diskon: number;
    id_ambil: string;
    total_harga: number;
    total_pembayaran: number;
    pesananproduk: PesananProduk[];
}

// Initialize pesananData with default values
export let pesananData: PesananData = {
    id_member: '',
    nama_member: '',
    telpon_member: '',
    id_metode: '',
    cashback_diskon: 0,
    id_ambil: '',
    total_harga: 0,
    total_pembayaran: 0,
    pesananproduk: [],
};

// Function to initialize pesananData
export const initPesananData = async () => {
    const user = JSON.parse((await getItem('user')) || '{}');
    pesananData.id_member = user.id || ''; // Set from IndexedDB
    pesananData.nama_member = user.nama || ''; 
    pesananData.telpon_member = user.no_hp || ''; 
};

// Function to update pesananData
export const updatePesananData = (newData: Partial<PesananData>) => {
    pesananData = { ...pesananData, ...newData };
};

// Function to update pesananproduk
export const updatePesananProduk = (produk: PesananProduk[]) => {
    pesananData.pesananproduk = produk;
};

// Call initPesananData at the start of your app
initPesananData();
