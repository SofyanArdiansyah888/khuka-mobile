import React, { useEffect, useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { calculateMemberDuration } from '../../utils/calculateDuration';
import whitelogo from '../../assets/khukha-white.svg';
import point from '../../assets/diamond.png';
import cashback from '../../assets/cashback.png';
import profilIcon from '../../assets/profil.svg';
import passIcon from '../../assets/password.svg';
import termIcon from '../../assets/terms.svg';
import privacyIcon from '../../assets/privacy.svg';
import logOutIcon from '../../assets/logout.svg';
import chatIcon from '../../assets/hubungi.svg';
import leftArrow from '../../assets/chevron-left.svg';
import './Akun.css';

const AkunScreen: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [memberDuration, setMemberDuration] = useState<string>('');
    const [poinCashback, setPoinCashback] = useState<any>(null);
  const history = useHistory();

 
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(storedUser);
    if (storedUser?.tgl_member) {
      const durationText = calculateMemberDuration(storedUser.tgl_member);
      setMemberDuration(durationText);
    }
    const storedPoinCashback = JSON.parse(localStorage.getItem('poincashback') || '{}');
    setPoinCashback(storedPoinCashback);
  }, []);
  const handleLogout = () => {
    const keranjang = localStorage.getItem('keranjang'); // Save keranjang data
    
    localStorage.clear(); // Clear all localStorage items
  
    if (keranjang) {
      localStorage.setItem('keranjang', keranjang); // Restore keranjang
    }
  
    history.push('/login'); // Redirect to login page
  };
  
  const daftarMember = () => {
    history.push('/akun/daftar-member');
  };
  const profil = () => {
    history.push('/akun/profil');
  };
  const sections = [
    {
      title: 'Akun',
      items: [
        { icon: profilIcon, label: 'Profil', onClick: profil },
        { icon: passIcon, label: 'Ubah Password', onClick: null },
      ],
    },
    {
      title: 'Member',
      items: [
        { icon: profilIcon, label: 'Daftarkan Member', onClick: daftarMember },
        { icon: passIcon, label: 'List Member Anda', onClick: null },
        { icon: passIcon, label: 'Request Redeem', onClick: null },
      ],
    },
    {
      title: 'Tentang KHU-KHA',
      items: [
        { icon: termIcon, label: 'Syarat dan ketentuan', onClick: null },
        { icon: privacyIcon, label: 'Kebijakan Privacy', onClick: null },
        { icon: chatIcon, label: 'Hubungi Kami', onClick: null },
        { icon: logOutIcon, label: 'Logout', onClick: handleLogout },
      ],
    },
  ];

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="user-info-wrap akun-wrap">
          <div className="user-info">
            <div className="user-details">
              <div className="user-avatar">
                <img src={whitelogo} alt="User Logo" />
              </div>
              <div className="user-data">
                <h2>{user?.nama}</h2>
                <p>Member sejak {memberDuration}</p>
              </div>
            </div>
            <div className="points-balance">
              <div className="points">
                <img src={point} alt="Points" />
                <p>{poinCashback.total_poin} poin</p>
              </div>
              <div className="cashback">
                <img src={cashback} alt="Cashback" />
                <p>
                  Rp.
                  {new Intl.NumberFormat('id-ID').format(
                    poinCashback.total_cashback
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {sections.map((section, sectionIndex) => (
          <React.Fragment key={sectionIndex}>
            {sectionIndex > 0 && <div className="bn-divider"></div>}
            <div className="akun-container padding-lr-20 no-default-header">
              <h4 className="header_title">{section.title}</h4>
              {section.items.map((item, index) => (
                <div
                  key={index}
                  className="akun-item-wrap"
                  onClick={item.onClick ? item.onClick : undefined}
                >
                  <div className="akun-item small-item">
                    <img src={item.icon} alt={item.label} />
                  </div>
                  <div className="akun-item">{item.label}</div>
                  <div className="akun-item small-item text-right">
                    <img src={leftArrow} alt="Arrow" />
                  </div>
                </div>
              ))}
            </div>
          </React.Fragment>
        ))}
      </IonContent>
    </IonPage>
  );
};
export default AkunScreen;
