export  const calculateMemberDuration = (tgl_member: string) => {
    const currentDate = new Date();
    const memberDate = new Date(tgl_member);

    // Check if the date is the same as today
    const isToday =
      currentDate.getFullYear() === memberDate.getFullYear() &&
      currentDate.getMonth() === memberDate.getMonth() &&
      currentDate.getDate() === memberDate.getDate();

    if (isToday) {
      return 'hari ini';
    }

    const diffTime = currentDate.getTime() - memberDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffMonths / 12);

    if (diffYears >= 1) {
      return `${diffYears} tahun lalu`;
    } else if (diffMonths >= 1) {
      return `${diffMonths} bulan lalu`;
    } else {
      return `${diffDays} hari lalu`;
    }
  };