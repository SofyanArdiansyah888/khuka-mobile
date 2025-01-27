export interface MasterProduk {
  id: number;
  nama_produk: string;
  deskripsi: string;
  satuan: { id: number; nama: string };
}
