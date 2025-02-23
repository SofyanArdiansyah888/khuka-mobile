import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonToast } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import { pesananData, updatePesananData } from '../../utils/pesananData';
import { baseImgURL } from '../../utils/axios'; // Ensure this import is correct
import './Checkout.css';

const Pembayaran: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  // const state = location.state as { nomor_order?: string; metode?: any } || {};
  const state = location.state as { 
    nomor_order?: string; 
    metode?: any; 
    riwayat_metode?: any; 
    total_pembayaran?: number; 
    waktu_akhir_pembayaran?: string; 
  } || {};
  const [nomorPesanan, setNomorPesanan] = useState<string>(state.nomor_order || '');
  const [selectedMetode, setSelectedMetode] = useState<any>(state.metode || null);
  const [filteredMetode, setFilteredMetode] = useState<any[]>([]);
  const [deadline, setDeadline] = useState<Date>(new Date());
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [showToast, setShowToast] = useState(false);
  const [totalPembayaran, setTotalPembayaran] = useState<number>(state.total_pembayaran || pesananData.total_pembayaran);
  const [isExpired, setIsExpired] = useState<boolean>(false);

  useEffect(() => {
    if (state.waktu_akhir_pembayaran) {
      // If coming from history, use the provided deadline
      setDeadline(new Date(state.waktu_akhir_pembayaran));
    } else {
      // If coming from checkout, set a new 4-hour deadline
      const paymentDeadline = new Date();
      paymentDeadline.setHours(paymentDeadline.getHours() + 4);
      setDeadline(paymentDeadline);
    }
  }, []);
//  console.log(state.riwayat_metode)
  // useEffect(() => {
  //   if (selectedMetode?.data?.length) {
  
  //     // Ensure selectedMetode.data is an a rray
  //     const metodeArray = Array.isArray(selectedMetode.data) ? selectedMetode.data : [];
  
  //     // Find the matching metode
  //     const matchedMetode = metodeArray.find((item: { id: string; }) => item.id === pesananData.id_metode);
  
  //     // Update state with the matched metode or an empty array
  //     setFilteredMetode(matchedMetode ? [matchedMetode] : []);
  //   }
  // }, [selectedMetode, pesananData.id_metode]);
  useEffect(() => {
    if (state.riwayat_metode) {
      // If from history, use the method directly
      setSelectedMetode(state.riwayat_metode);
      setFilteredMetode([state.riwayat_metode]); // Directly use the metode from history
    } else if (pesananData.id_metode && selectedMetode?.data?.length) {
      // If from checkout, find the matching metode
      const metodeArray = Array.isArray(selectedMetode.data) ? selectedMetode.data : [];
  
          // Find the matching metode
          const matchedMetode = metodeArray.find((item: { id: string; }) => item.id === pesananData.id_metode);
      
          // Update state with the matched metode or an empty array
          setFilteredMetode(matchedMetode ? [matchedMetode] : []);
    }
  }, [state.riwayat_metode,state.metode, pesananData.id_metode]);
  

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = deadline.getTime() - now;
      
      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft('Waktu pembayaran telah berakhir');
        setIsExpired(true);
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
          <h3 className="transfer_harga">Rp. {new Intl.NumberFormat('id-ID').format(totalPembayaran)}</h3>
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
        {!isExpired && (
        <div className="footer footer-detail">
          <button className="checkout_btn btn_khu" onClick={handleSendWhatsApp}>
            Kirim Bukti Pembayaran
          </button>
        </div>
      )}
      </IonContent>
      <IonToast isOpen={showToast} onDidDismiss={() => setShowToast(false)} message="Nomor rekening tercopy" duration={2000} position='middle' />
    </IonPage>
  );
};

export default Pembayaran;
