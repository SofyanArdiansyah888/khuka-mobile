import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonToast } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { pesananData, updatePesananData } from '../../utils/pesananData';
import { baseImgURL } from '../../utils/axios'; // Ensure this import is correct
import './Checkout.css';

const Pembayaran: React.FC = () => {
  const history = useHistory();
  const [metode, setMetode] = useState<any[]>([]);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Retrieve the 'metodeList' from localStorage
    const storedMetodeList = localStorage.getItem('metode');
    if (storedMetodeList) {
      try {
        // Parse the JSON string into an array
        const metodeList = JSON.parse(storedMetodeList);
        // Find the metode with the matching id
        const selectedMetode = metodeList.find(
          (item: any) => item.id === pesananData.id_metode
        );
        // If selectedMetode is found and is an object, wrap it in an array
        if (selectedMetode && typeof selectedMetode === 'object') {
          setMetode([selectedMetode]);
        }
      } catch (error) {
        console.error('Error parsing metodeList from localStorage:', error);
      }
    }
  }, []);

  const historyBack = () => {
    updatePesananData({
      cashback_diskon: 0,
      id_metode: '',
      id_ambil: '',
      total_pembayaran: 0,
    });
    history.push('/riwayat');
  };

  // Function to copy text to clipboard
  const copyToClipboard = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(
        () => {
            setShowToast(true); 
        },
        (err) => {
          console.error('Failed to copy: ', err);
          // Optionally, show an error message to the user
        }
      );
    } else {
      // Fallback for browsers that do not support the Clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.setAttribute('readonly', '');
      textArea.style.position = 'absolute';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setShowToast(true); 
    }
  };

  return (
    <IonPage>
      <IonContent>
        <div className="checkout_header_wrap header-with-back padding-lr-20 no-default-header">
          <div
            className="history-back non-absolute"
            onClick={historyBack}
          ></div>
          <h4 className="header_title">Pembayaran</h4>
        </div>
        <div className="padding-lr-20">
          <p className="transfer_title">Transfer sesuai nominal dibawah ini:</p>
          <h3 className="transfer_harga">
            Rp.{' '}
            {new Intl.NumberFormat('id-ID').format(
              pesananData.total_pembayaran
            )}
          </h3>
        </div>
        <div className="item with_bottom_border bayar_page">
          <div className="padding-lr-20">
            <div className="checkout_tempat">
              <div className="batas_akhir">Batas Akhir Pembayaran</div>
              <div className="batas_tgl">13 Februari 2025</div>
            </div>
            <div className="checkout_tempat">
              <div className="batas_akhir">Batas Waktu</div>
              <div className="batas_tgl bts_jam">03:59:33</div>
            </div>
          </div>
        </div>
        <div className="padding-lr-20">
          <p className="transfer_title">Pembayaran dilakukan ke rekening a/n</p>
          {metode.length > 0 &&
            metode.map((item, index) => (
              <div key={index}>
                {item.detailbank.map((bank: any, bankIndex: number) => (
                  <div key={bankIndex} className="bank_transfer_section">
                    <p className="nama_rekening">{bank.nama_rekening}</p>
                    <div className="bank_transfer_copy">
                      <img
                        src={baseImgURL + 'bank/' + item.link_gambar}
                        alt="Bank Logo"
                      />
                      <div className="nomor_rekening">
                        {bank.nomor_rekening}
                      </div>
                      <div
                        className="copy_nomor"
                        onClick={() => copyToClipboard(bank.nomor_rekening)}
                      >
                        Copy
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          <div className="bank_transfer_copy info">
            <div className="copy_nomor">
              Transfer sebelum <span>batas waktu</span> atau transaksi kamu
              otomatis dibatalkan oleh sistem.
            </div>
          </div>
        </div>

        <div className="footer footer-detail">
          <button className="checkout_btn btn_khu">
            Kirim Bukti Pembayaran
          </button>
        </div>
      </IonContent>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Nomor rekening tercopy"
        duration={2000}
        position='middle'
      />
    </IonPage>
  );
};

export default Pembayaran;
