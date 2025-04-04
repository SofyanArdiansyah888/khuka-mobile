import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonRefresher, IonRefresherContent, IonInput } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { fetchListMember } from '../../../utils/api';
import useAuth from '../../../common/hooks/useAuth';
import profilIcon from '../../../assets/profil.svg';
import searchIcon from '../../../assets/search.svg';
import Skeleton from 'react-loading-skeleton';
import './Member.css';
import 'react-loading-skeleton/dist/skeleton.css';


const Member: React.FC = () => {
  const history = useHistory();
  const [memberData, setMemberData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const { getUser } = useAuth();

  const fetchUserData = async (newPage: number, isRefreshing = false) => {
    if (isRefreshing) {
      setIsLoading(true);
      setPage(1);
    } else {
      setIsLoadingMore(true);
    }

    try {
      const storedUser = await getUser();
      if (storedUser) {
        const datas = await fetchListMember(storedUser.id, newPage);

        if (isRefreshing) {
          setMemberData(datas.data);
        } else {
          setMemberData((prev) => [...prev, ...datas.data]);
        }

        setHasMore(datas.next_page_url !== null);
      }
    } catch (error) {
      console.error('Error fetching member data:', error);
    }

    setIsLoading(false);
    setIsLoadingMore(false);
  };

  useEffect(() => {
    fetchUserData(1, true);
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredData(memberData);
    } else {
      const filtered = memberData.filter(
        (item) =>
          item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.no_hp.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.kabupaten.nama.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, memberData]);

  const handleRefresh = async (event: CustomEvent) => {
    await fetchUserData(1, true);
    event.detail.complete();
  };

  const loadMore = async () => {
    if (!hasMore || isLoadingMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchUserData(nextPage);
  };



  return (
    <IonPage>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        {/* Header */}
        <div className="header-with-back padding-lr-20 no-default-header">
          <div
            className="history-back non-absolute"
            onClick={() => history.goBack()}
          ></div>
          <h4 className="header_title">List Member Anda</h4>
          <img
            src={searchIcon}
            alt="Search"
            className="search-icon"
            width={24}
            height={24}
            onClick={() => setShowSearch(!showSearch)}
          />
        </div>

        {/* Search Input */}
        {showSearch && (
          <div className="search-container padding-lr-20">
            <IonInput
              value={searchTerm}
              placeholder="Filter berdasarkan nama, kabupaten, atau no HP..."
              onIonInput={(e) => setSearchTerm(e.detail.value!)}
            />
          </div>
        )}

        {/* Member List */}
        {isLoading ? (
          <div className="padding-lr-20 listMember">
            {[1, 2, 3,4,5,6,7].map((index) => (
              <div key={index} className="member-item">
                <div className="member-detail">
                <div className="user_icon">
                  <Skeleton circle width={40} height={40} />
                </div>
                <div className="user_detail">
                  <div className="nama_member"> <Skeleton width={200} height={20} /></div>
                  <div className="hp_member"><Skeleton width={150} height={15} /></div>
                  <div className="kabupaten"><Skeleton width={150} height={15} /></div>
                  <div className="tgl_member"><Skeleton width={150} height={15} /></div>
                </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {filteredData.length > 0 ? (
              <div className="padding-lr-20 listMember">
                {filteredData.map((item, index) => (
                  <div
                  key={index}
                  className="member-item"
                  onClick={() =>
                    history.push('/akun/list-member/detail-member', {
                      id: item.id,
                      nama: item.nama,
                      pembelian: item.pembelian,
                    })
                  }
                >
                    <div className="member-detail">
                      <div className="user_icon">
                        <img src={profilIcon} alt="user icon" />
                      </div>
                      <div className="user_detail">
                        <div className="nama_member">{item.nama} ({item.member_level})</div>
                        <div className="hp_member">{item.no_hp}</div>
                        <div className="kabupaten">{item.kabupaten.nama}</div>
                        <div className="tgl_member">
                          Bergabung:{' '}
                          {new Date(item.tgl_member).toLocaleDateString(
                            'id-ID',
                            { day: '2-digit', month: 'short', year: 'numeric' }
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="padding-lr-20">
                <div>
                  <p className="title_no_member">Tidak ada hasil yang cocok</p>
                </div>
              </div>
            )}
            {hasMore && (
              <div className="load-more-container padding-lr-20">
                <div className="bn-btn" onClick={loadMore}>
                  {isLoadingMore ? 'Memuat...' : 'Muat Lebih Banyak'}
                </div>
              </div>
            )}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Member;
