export interface PesananProduk {
    id_produk: number;
    quantity: number;
    harga: number;
    total_harga: number;
  }
  
  export interface PesananData {
    id_member: string;
    metode_pembayaran: string;
    cashback_discount: string;
    id_ambil_barang: string;
    total_pembayaran: number;
    pesananproduk: PesananProduk[];
  }
  
  // Get user ID from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  export let pesananData: PesananData = {
    id_member: user.id || '', // Set from localStorage
    metode_pembayaran: '',
    cashback_discount: '',
    id_ambil_barang: '',
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
  