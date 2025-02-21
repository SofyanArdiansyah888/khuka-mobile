import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonToast } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import { pesananData, updatePesananData } from '../../utils/pesananData';
import { baseImgURL } from '../../utils/axios'; // Ensure this import is correct
import './Checkout.css';

const Pembayaran: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const state = location.state as { nomor_order?: string; metode?: any } || {};

  const [nomorPesanan, setNomorPesanan] = useState<string>(state.nomor_order || '');
  const [selectedMetode, setSelectedMetode] = useState<any>(state.metode || null);
  const [filteredMetode, setFilteredMetode] = useState<any[]>([]);
  const [deadline, setDeadline] = useState<Date>(new Date());
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const paymentDeadline = new Date();
    paymentDeadline.setHours(paymentDeadline.getHours() + 4);
    setDeadline(paymentDeadline);
  }, []);

  useEffect(() => {
    if (selectedMetode) {
      let metodeArray = Array.isArray(selectedMetode) ? selectedMetode : [selectedMetode];
      const matchedMetode = metodeArray.find((item: any) => item.id === pesananData.id_metode);
      setFilteredMetode(matchedMetode ? [matchedMetode] : []);
    }
  }, [selectedMetode, pesananData.id_metode]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = deadline.getTime() - now;
      
      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft('Waktu pembayaran telah berakhir');
      } else {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${hours} jam ${minutes} menit ${seconds} detik`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [deadline]);

  const historyBack = () => {
    updatePesananData({
      cashback_diskon: 0,
      id_metode: '',
      id_ambil: '',
      total_pembayaran: 0,
    });
    history.push('/riwayat');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => setShowToast(true));
  };

  const handleSendWhatsApp = () => {
    const message = `Halo Khukha, mau konfirmasi pembayaran pesanan #${nomorPesanan}`;
    const phoneNumber = '+6282292878275';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <IonPage>
      <IonContent>
        <div className="checkout_header_wrap header-with-back padding-lr-20 no-default-header">
          <div className="history-back non-absolute" onClick={historyBack}></div>
          <h4 className="header_title">Pembayaran</h4>
        </div>
        <div className="padding-lr-20">
          <p className="transfer_title">Transfer sesuai nominal dibawah ini:</p>
          <h3 className="transfer_harga">Rp. {new Intl.NumberFormat('id-ID').format(pesananData.total_pembayaran)}</h3>
        </div>
        <div className="item with_bottom_border bayar_page">
          <div className="padding-lr-20">
            <div className="checkout_tempat">
              <div className="batas_akhir">Batas Akhir Pembayaran</div>
              <div className="batas_tgl">{deadline.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
            </div>
            <div className="checkout_tempat">
              <div className="batas_akhir">Batas Waktu</div>
              <div className="batas_tgl bts_jam">{timeLeft}</div>
            </div>
          </div>
        </div>
        <div className="padding-lr-20">
          <p className="transfer_title">Pembayaran dilakukan ke rekening a/n</p>
          {filteredMetode.map((item, index) => (
            <div key={index}>
              {item.detailbank.map((bank: any, bankIndex: number) => (
                <div key={bankIndex} className="bank_transfer_section">
                  <p className="nama_rekening">{bank.nama_rekening}</p>
                  <div className="bank_transfer_copy">
                    <img src={baseImgURL + 'bank/' + item.link_gambar} alt="Bank Logo" />
                    <div className="nomor_rekening">{bank.nomor_rekening}</div>
                    <div className="copy_nomor" onClick={() => copyToClipboard(bank.nomor_rekening)}>Copy</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
          <div className="bank_transfer_copy info">
            <div className="copy_nomor">Transfer sebelum <span>batas waktu</span> atau transaksi kamu otomatis dibatalkan oleh sistem.</div>
          </div>
        </div>
        <div className="footer footer-detail">
          <button className="checkout_btn btn_khu" onClick={handleSendWhatsApp}>Kirim Bukti Pembayaran</button>
        </div>
      </IonContent>
      <IonToast isOpen={showToast} onDidDismiss={() => setShowToast(false)} message="Nomor rekening tercopy" duration={2000} position='middle' />
    </IonPage>
  );
};

export default Pembayaran;
