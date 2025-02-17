export const getUserPoints = (user: any, produk: any) => {
    if (!user || !produk) return 0;
  
    switch (user.member_level) {
      case 'Owner':
        return produk.owner_poin;
      case 'AO':
        return produk.ao_poin;
      case 'Stokis':
        return produk.stokis_poin;
      case 'Agent':
        return produk.agen_poin;
      default:
        return produk.konsumen_poin;
    }
  };
  
  export const getUserCashback = (user: any, produk: any) => {
    if (!user || !produk) return 0;
  
    switch (user.member_level) {
      case 'Owner':
        return produk.owner_cashback;
      case 'AO':
        return produk.ao_cashback;
      case 'Stokis':
        return produk.stokis_cashback;
      case 'Agent':
        return produk.agen_cashback;
      default:
        return produk.konsumen_cashback;
    }
  };
  