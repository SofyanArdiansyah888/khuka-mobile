import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchPoin } from '../../../utils/api';
import './Member.css';

const DetailMember: React.FC = () => {
  const history = useHistory();
  const location = useLocation<{
    id: string;
    nama: string;
    pembelian: any[];
  }>();

  const { id, nama, pembelian } = location.state || {
    id: '',
    nama: '',
    pembelian: [],
  };

  const [poinCashback, setPoinCashback] = useState<any>({
    total_poin: 0,
    total_cashback: 0,
  });

  const sortedPembelian = [...pembelian].sort((a, b) => b.id - a.id);

  // Pagination States
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(sortedPembelian.length / itemsPerPage);

  // Calculate Status Counts
  const totalKadaluarsa = sortedPembelian.filter(
    (item) => item.status_penjualan === 'Kadaluarsa'
  ).length;
  const totalOrder = sortedPembelian.filter(
    (item) => item.status_penjualan === 'Order'
  ).length;
  const totalTerbayar = sortedPembelian.filter(
    (item) => item.status_penjualan === 'Terbayar'
  ).length;

  // Paginate Data
  const paginatePembelian = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedPembelian.slice(startIndex, startIndex + itemsPerPage);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    (async () => {
      const storedPoinCashback = await fetchPoin(id);
      setPoinCashback(storedPoinCashback.data);
    })();
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="header-with-back padding-lr-20 no-default-header">
          <div
            className="history-back non-absolute"
            onClick={() => history.goBack()}
          ></div>
          <h4 className="header_title">Detail Member {nama}</h4>
        </div>

        <div className="padding-lr-20" style={{ marginTop: '22px' }}>
          <div className="history_title">
            <p>
              Poin : <strong>{poinCashback?.total_poin ?? 0} poin</strong>
            </p>
            <p>
              Cashback :{' '}
              <strong>
                Rp.
                {new Intl.NumberFormat('id-ID').format(
                  poinCashback?.total_cashback ?? 0
                )}
              </strong>
            </p>
          </div>

          <div>
            <h1 className="riwayatbeli">Riwayat Pembelian Produk</h1>

            {paginatePembelian().length > 0 ? (
              <div className="listMember listPembelian">
                <div className="total_pembelian">
                  <p>Total Pembelian: {sortedPembelian.length}</p>
                  <p>Total Terbayar: {totalTerbayar}</p>
                  <p>Total Order: {totalOrder}</p>
                  <p>Total Kadaluarsa: {totalKadaluarsa}</p>
                </div>
                {paginatePembelian().map((item, index) => (
                  <div key={index} className="member-item">
                    <div className="member-detail detailx">
                      <div className="user_detail">
                        <div>
                          <strong>{item.nomor_penjualan}</strong>
                        </div>
                        <div className="tgl_member">
                          Tanggal:{' '}
                          {new Date(item.tgl_penjualan).toLocaleDateString(
                            'id-ID',
                            { day: '2-digit', month: 'short', year: 'numeric' }
                          )}
                        </div>
                      </div>
                      <div
                        className={`pembelian_status ${
                          item.status_penjualan === 'Terbayar'
                            ? 'terbayar'
                            : item.status_penjualan === 'Order'
                            ? 'order'
                            : 'kadaluarsa'
                        }`}
                      >
                        {item.status_penjualan}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Belum ada riwayat pembelian</p>
            )}

            {/* Pagination Controls */}
            {sortedPembelian.length > itemsPerPage && (
              <div className="pagination-container">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={currentPage === index + 1 ? 'active' : ''}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </button>
              </div>
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DetailMember;
