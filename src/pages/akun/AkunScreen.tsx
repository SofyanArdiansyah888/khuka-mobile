import React, { useEffect, useState } from 'react';
import {IonContent, IonPage} from '@ionic/react';
import {useHistory} from 'react-router-dom';
import {removeItem} from '../../utils/khukhaDBTemp';
import profilIcon from '../../assets/profil.svg';
import passIcon from '../../assets/password.svg';
import termIcon from '../../assets/terms.svg';
import privacyIcon from '../../assets/privacy.svg';
import logOutIcon from '../../assets/logout.svg';
import chatIcon from '../../assets/hubungi.svg';
import leftArrow from '../../assets/chevron-left.svg';
import cashback from "../../assets/cashback.svg";
import addMemberIcon from "../../assets/addmember.svg";
import membersIcon from "../../assets/members.svg";
import riwayatIcon from '../../assets/riwayat.svg';
import './Akun.css';
import HeaderPoint from "../../components/HeaderPoint";
import useAuth from '../../common/hooks/useAuth';

const AkunScreen: React.FC = () => {
  const history = useHistory();
  const { getUser } = useAuth();
  const [userLevel, setUserLevel] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = await getUser();
      if (storedUser) {       
        setUserLevel(storedUser.member_level || null);
      }
    };
    fetchUserData();
  }, []);
  const handleLogout = async () => {
    await removeItem('user');
    await removeItem('auth_token');
    await removeItem('isAuthenticated');
    await removeItem('sessionExpiration');
    history.push('/login');
  };

  const daftarMember = () => {
    history.push('/akun/daftar-member');
  };
  const profil = () => {
    history.push('/akun/profil');
  };
  const handleSendWhatsApp = () => {
    const message = `Halo Khukha`;
    const phoneNumber = '+6282292878275';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };
  function ubahPasswordClick(){
    history.push('/akun/ubah-password');
  }
 
  const sections = [
    {
      title: 'Akun',
      items: [
        { icon: profilIcon, label: 'Profil', onClick: profil },
        { icon: passIcon, label: 'Ubah Password', onClick: ubahPasswordClick },
      ],
    },
    {
      title: 'Member',
      items: [
        ...(userLevel !== 'Konsumen' ? [{ icon: addMemberIcon, label: 'Daftarkan Member', onClick: daftarMember }] : []),
        ...(userLevel !== 'Konsumen' ? [{ icon: membersIcon, label: 'List Member Anda',onClick: () =>    history.push('/akun/list-member') }] : []),
      ],
    },
    {
      title: 'Redeem',
      items: [      
        { icon: cashback, label: 'Request Redeem Cashback', onClick: () =>    history.push('/akun/request-redeem') },
        { icon: riwayatIcon, label: 'Riwayat Redeem',  onClick: null },
      ],
    },
    {
      title: 'Tentang KHU-KHA',
      items: [
        { icon: termIcon, label: 'Syarat dan ketentuan', onClick: null },
        { icon: privacyIcon, label: 'Kebijakan Privacy', onClick: null },
        { icon: chatIcon, label: 'Hubungi Kami', onClick: handleSendWhatsApp },
        { icon: logOutIcon, label: 'Logout', onClick: handleLogout },
      ],
    },
  ];

  return (
    <IonPage>
      <IonContent fullscreen>
        <HeaderPoint ukuran={'besar'} />
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
