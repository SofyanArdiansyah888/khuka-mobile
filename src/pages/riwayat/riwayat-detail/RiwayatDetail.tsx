import { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { IonContent, IonPage } from '@ionic/react';
import { baseImgURL } from '../../../utils/axios';
import fileIcon from '../../../assets/file-text.svg';
import shoppingIcon from '../../../assets/shopping-bag.svg';
import cardIcon from '../../../assets/credit-card.svg';
import logo from '../../../assets/logo-khukha.png';
import '../Riwayat.css';

const RiwayatDetail: React.FC = () => {
  const history = useHistory();
  const location = useLocation<{ riwayatData: any }>();
  const [showAll, setShowAll] = useState(false);
  const riwayatItem = location.state?.riwayatData;
  const historyBack = () => {
    history.goBack();
  };
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="header-with-back padding-lr-20 no-default-header riwayat_detail_header">
          <div
            className="history-back non-absolute"
            onClick={historyBack}
          ></div>
          <h4 className="header_title">Detail Pesanan</h4>
        </div>
        <div className="riwayat_detail_items">
          <div className="padding-lr-20">
            <div className="checkout_header">
              <div className="checkout_icon">
                <img src={fileIcon} alt="file-icon" />
              </div>
              <div className="checkout_title">Pesanan Selesai</div>
            </div>
          </div>
          <div className="padding-lr-20">
            <div className="ringkasan_item">
              <div>Nomor Pesanan</div>
              <div>{riwayatItem.nomor_penjualan}</div>
            </div>
            <div className="ringkasan_item">
              <div>Tanggal Pemesanan</div>
              <div>
                {new Date(riwayatItem.tgl_penjualan).toLocaleDateString(
                  'id-ID',
                  {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  }
                )}
              </div>
            </div>
          </div>
          <div className="bn-divider"></div>
          <div className="padding-lr-20">
            <div className="checkout_header">
              <div className="checkout_icon">
                <img src={shoppingIcon} alt="shopping-icon" />
              </div>
              <div className="checkout_title">Info Pengambilan Barang</div>
            </div>
          </div>
          <div className="padding-lr-20 pengambilan_item">
            <div className="ringkasan_item">
              <div className="itemx">Lokasi</div>
              <div>{riwayatItem.pengambilan.nama_tempat}</div>
            </div>
            <div className="ringkasan_item">
              <div className="itemx">Alamat</div>
              <div>{riwayatItem.pengambilan.alamat}</div>
            </div>
          </div>
          <div className="riwayat_produk riwayat_detail_produk">
            {riwayatItem.detail
              ?.slice(0, showAll ? riwayatItem.detail.length : 1)
              .map((detail: any, index: number) => (
                <div key={index} className="produk_item">
                  <div className="produk_thumb">
                    <div className="produk-logo">
                      <img src={logo} alt="" />
                      <span>
                        OFFICIAL
                        <br />
                        STORE
                      </span>
                    </div>
                    <img
                      className="img_riwayat"
                      src={`${baseImgURL}produk/${detail.produk.link_gambar}`}
                      alt=""
                    />
                  </div>
                  <div className="produk_judul riwayat_item">
                    {detail.produk.judul}
                  </div>
                  <div className="produk_x_qty">X{detail.qty}</div>
                  <div className="produk_x_harga">
                    {' '}
                    Rp.{' '}
                    {new Intl.NumberFormat('id-ID').format(detail.total_harga)}
                  </div>
                </div>
              ))}
            {riwayatItem.detail && riwayatItem.detail.length > 1 && (
              <div
                className="lihat_semua_btn"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? 'Tutup' : 'Lihat Semua'}
              </div>
            )}
          </div>
          <div className="riwayat_total_bayar">
            <span>Total {riwayatItem.detail.length} produk:</span> Rp.{' '}
            {new Intl.NumberFormat('id-ID').format(
              riwayatItem.total_pembayaran
            )}
          </div>
          <div className="bn-divider"></div>
          <div className="padding-lr-20">
            <div className="checkout_header">
              <div className="checkout_icon">
                <img src={cardIcon} alt="card-icon" />
              </div>
              <div className="checkout_title">Rincian Pembayaran</div>
            </div>
          </div>
          <div className="padding-lr-20">
            <div className="ringkasan_item">
              <div>Metode Pembayaran</div>
              <div>{riwayatItem.metode.judul}</div>
            </div>
            <div className="ringkasan_item">
              <div>Subtotal Harga Produk</div>
              <div>
                Rp.{' '}
                {new Intl.NumberFormat('id-ID').format(riwayatItem.total_harga)}
              </div>
            </div>
            <div className="ringkasan_item">
              <div>Diskon</div>
              <div>
                Rp.{' '}
                {new Intl.NumberFormat('id-ID').format(
                  riwayatItem.cashback_diskon
                )}
              </div>
            </div>
            <div className="ringkasan_item">
              <div>Total Pembayaran</div>
              <div>
                Rp.{' '}
                {new Intl.NumberFormat('id-ID').format(
                  riwayatItem.total_pembayaran
                )}
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RiwayatDetail;
