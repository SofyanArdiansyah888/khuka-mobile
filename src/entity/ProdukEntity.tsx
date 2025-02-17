import { MasterProduk } from './MasterProduk';

export interface Produk {
  id: string;
  judul: string;
  deskripsi_singkat: string;
  kategori: string;
  penjualan_detail_count: string;
  harga: number;
  owner_cashback: number;
  ao_cashback: number;
  stokis_cashback: number;
  agen_cashback: number;
  konsumen_cashback: number;
  owner_poin: number;
  ao_poin: number;
  stokis_poin: number;
  agen_poin: number;
  konsumen_poin: number;
  total_isi: number;
  satuan: { nama: string };
  link_gambar: string;
  masterproduk: MasterProduk;
}
