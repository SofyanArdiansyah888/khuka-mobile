import React, { useEffect, useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import keranjangkosong from '../../assets/keranjang-kosong.svg';
import './Keranjang.css';

const KeranjangScreen: React.FC = () => {
  const [keranjangData, setKeranjangData] = useState<any[]>([]);
  const history = useHistory();
  useEffect(() => {
    const storedKeranjang = JSON.parse(
      localStorage.getItem('keranjang') || '[]'
    );
    setKeranjangData(storedKeranjang);
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="keranjang-header padding-lr-20 no-default-header">
          <h4 className="header_title">Keranjang Saya</h4>
          <p className="header_subtitle">Kumpulkan poin dan cashback</p>
        </div>
        {keranjangData.length === 0 ? (
          <div className="keranjang-kosong">
            <div className="img-wrap">
              <img src={keranjangkosong} alt="Keranjang Kosong" />
            </div>
            <p className="keranjang-title">Keranjang belanja masih kosong</p>
            <p className="keranjang-subtitle">
              Silahkan telusuri produk dan cashback menarik dari Khu-Kha!
            </p>
            <div
              className="belanja-sekarang bn-btn"
              onClick={() => history.push('/produk')}
            >
              Belanja Sekarang
            </div>
          </div>
        ) : (
          <div>
            <h3>Items in Keranjang</h3>
            {keranjangData.map((item, index) => (
              <div
                key={index}
                style={{ padding: '10px', borderBottom: '1px solid #ccc' }}
              >
                <h4>{item.judul}</h4>
                <p>
                  Harga: Rp. {new Intl.NumberFormat('id-ID').format(item.harga)}
                </p>
                <p>Jumlah: {item.quantity || 1}</p>{' '}
              </div>
            ))}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default KeranjangScreen;
