import React, { useEffect, useState } from 'react';
import { IonContent, IonFooter, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { dataMetode, dataTempat, dataBank } from '../../utils/api';
import { baseImgURL } from '../../utils/axios';
import {
  pesananData,
  PesananProduk,
  updatePesananData,
} from '../../utils/pesananData';
import Swal from 'sweetalert2';
import shoppingIcon from '../../assets/shopping-bag.svg';
import cardIcon from '../../assets/credit-card.svg';
import fileIcon from '../../assets/file-text.svg';
import './Checkout.css';

const Checkout: React.FC = () => {
  const history = useHistory();
  const [bank, setBank] = useState<any[]>([]);
  const [tempat, setTempat] = useState<any[]>([]);
  const [metode, setMetode] = useState<any[]>([]);
  const totalPembayaran = pesananData.total_pembayaran || 0;
  const historyBack = () => {
    history.goBack();
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const databank = await dataBank();
        setBank(databank.data);
        const datatempat = await dataTempat();
        setTempat(datatempat.data);
        const datametode = await dataMetode();
        setMetode(datametode.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  console.log('Updated Pesanan Data:', JSON.stringify(pesananData, null, 2));
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="checkout_header_wrap header-with-back padding-lr-20 no-default-header">
          <div
            className="history-back non-absolute"
            onClick={historyBack}
          ></div>
          <h4 className="header_title">Checkout</h4>
        </div>
        <div className="padding-lr-20">
          <div className="checkout_header">
            <div className="checkout_icon">
              <img src={shoppingIcon} alt="shopping-icon" />
            </div>
            <div className="checkout_title">Pengambilan Barang</div>
          </div>
        </div>
        <div className="items_wraps">
          {tempat.map((item, index) => (
            <div className="item with_bottom_border">
              <div className="padding-lr-20">
                <div className="checkout_tempat">
                  <div className="nama_tempat">{item.nama_tempat}</div>
                  <div className="tempat_radio">
                    <label className="radio-container">
                      <input type="radio" name="custom-radio" />
                      <span className="radio-custom"></span>
                    </label>
                  </div>
                </div>
                <div className="checkout_alamat">{item.alamat}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="bn-divider"></div>
        <div className="padding-lr-20">
          <div className="checkout_header">
            <div className="checkout_icon">
              <img src={cardIcon} alt="card-icon" />
            </div>
            <div className="checkout_title">Metode Pembayaran</div>
          </div>
        </div>
        <div className="items_wraps">
          {metode.map((item, index) => {
            // Find the corresponding bank item where item.judul contains bank.nama_bank
            const matchedBank = bank.find((b) =>
              item.judul.toLowerCase().includes(b.nama_bank.toLowerCase())
            );

            return (
              <div className="item with_bottom_border" key={index}>
                <div className="padding-lr-20">
                  <div className="checkout_metode">
                    <div className="bank_img">
                      {matchedBank && (
                        <img
                          src={baseImgURL + 'bank/' + matchedBank.link_gambar}
                          alt={matchedBank.nama_bank}
                        />
                      )}
                    </div>
                    <div className="nama_bank">{item.judul}</div>
                    <div className="bank_radio">
                    <label className="radio-container">
                      <input type="radio" name="custom-radio" />
                      <span className="radio-custom"></span>
                    </label>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="bn-divider"></div>
        <div className="padding-lr-20">
          <div className="checkout_header">
            <div className="checkout_icon">
              <img src={fileIcon} alt="file-icon" />
            </div>
            <div className="checkout_title">Ringkasan Transaksi</div>
          </div>
          <div className="ringkasan_item">
            <div>Total Harga Produk</div>
            <div className="total_harga">
              Rp.{new Intl.NumberFormat('id-ID').format(totalPembayaran)}
            </div>
          </div>
          <div className="ringkasan_item">
            <div>Gunakan Cashback?</div>
            <div className="total_harga">
              -Rp.{new Intl.NumberFormat('id-ID').format(totalPembayaran)}
            </div>
          </div>
          <div className="ringkasan_item">
            <div>Total Pembayaran</div>
            <div className="total_pembayaran">
              Rp.{new Intl.NumberFormat('id-ID').format(totalPembayaran)}
            </div>
          </div>
        </div>
        <div className="footer footer-detail">
          <button className="checkout_btn btn_khu">Bayar Sekarang</button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Checkout;
