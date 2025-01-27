import { MasterProduk } from './MasterProduk';

export interface Produk {
  id: string;
  judul: string;
  deskripsi_singkat: string;
  kategori: string;
  harga: number;
  ao_cashback: number;
  agen_cashback: number;
  konsumen_cashback: number;
  ao_poin: number;
  agen_poin: number;
  konsumen_poin: number;
  total_isi: number;
  satuan: { nama: string };
  link_gambar: string;
  masterproduk: MasterProduk;
}
