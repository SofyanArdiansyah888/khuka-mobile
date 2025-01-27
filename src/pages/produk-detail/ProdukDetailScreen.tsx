import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useLocation, useParams } from 'react-router-dom';
import logo from '../../assets/logo-khukha.png';
import point from '../../assets/diamond.png';
import cashback from '../../assets/cashback.png';
import { baseImgURL } from '../../utils/axios';
import './ProdukDetail.css';
// Define the type for product data
interface Product {
  id: string;
  judul: string;
  deskripsi_singkat: string;
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
}
// Define the type for location state
interface LocationState {
  produk: Product;
}
const ProdukDetail: React.FC = () => {
  const location = useLocation<LocationState>(); // Get location state
  const { id } = useParams<{ id: string }>(); // Get dynamic id from the URL
  const produk = location.state?.produk;
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(storedUser);
  }, []);

  if (!produk) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Produk Detail</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="no-produk">No produk data available for ID: {id}</div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
     
      <IonContent>
        <div className="produk-detail produk-card">
          <div className="produk-list-header">
            <div className="produk-logo">
              <img src={logo} alt="" />
              <span>
                {' '}
                OFFICIAL
                <br />
                STORE
              </span>
            </div>
            <div className="produk-desc">{produk.deskripsi_singkat}</div>
            <div
              className={`produk-satuan ${
                produk.judul.includes('MyColon')
                  ? 'mycolon'
                  : produk.judul.includes('Fit Zim')
                  ? 'fitzim'
                  : produk.judul.includes('Gun Tea')
                  ? 'biogun'
                  : produk.judul.includes('Mybiodima')
                  ? 'biodima'
                  : ''
              }`}
            >
              {produk.total_isi} {produk.satuan.nama}
            </div>
            <div className="produk-image">
              <img src={baseImgURL + 'produk/' + produk.link_gambar} alt="" />
            </div>
          </div>
          <div className="produk-info">
            <h3> Rp. {new Intl.NumberFormat('id-ID').format(produk.harga)}</h3>
            <h2>{produk.judul}</h2>
          </div>
          <div className='produk-cash-poin'>
            <div className='cash-poin-img'>
            <img src={point} alt="Points" />
            </div>
            <div className='cash-poin-text'>
            <p>Dapatkan poin sebesar {' '}<b>
                {
                  user?.member_level === 'AO'
                    ? produk.ao_poin
                    : user?.member_level === 'Agent'
                    ? produk.agen_poin
                    : produk.konsumen_poin
                } poin </b>
                </p> 
            </div>           
          </div>
          <div className='produk-cash-poin'>
            <div className='cash-poin-img'>
            <img src={cashback} alt="Cashback" />
            </div>            
            <div className='cash-poin-text'>
            <p>Dapatkan cashback sebesar Rp {' '}<b>
                {new Intl.NumberFormat('id-ID').format(
                  user?.member_level === 'AO'
                    ? produk.ao_cashback
                    : user?.member_level === 'Agent'
                    ? produk.agen_cashback
                    : produk.konsumen_cashback
                )}</b>
                </p> 
            </div>
          </div>
          
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProdukDetail;
