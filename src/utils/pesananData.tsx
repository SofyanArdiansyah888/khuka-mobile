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
    id_metode: string;
    cashback_diskon: number;
    id_ambil: string;
    total_harga: number;
    total_pembayaran: number;
    pesananproduk: PesananProduk[];
  }
  
  // Get user ID from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  export let pesananData: PesananData = {
    id_member: user.id || '', // Set from localStorage
    id_metode: '',
    cashback_diskon:0,
    id_ambil: '',
    total_harga: 0,
    total_pembayaran: 0,
    pesananproduk: [],
  };
  
  // Function to update pesananData
  export const updatePesananData = (newData: Partial<PesananData>) => {
    pesananData = { ...pesananData, ...newData };
  };
  
  // Function to update pesananproduk
  export const updatePesananProduk = (produk: PesananProduk[]) => {
    pesananData.pesananproduk = produk;
  };
  