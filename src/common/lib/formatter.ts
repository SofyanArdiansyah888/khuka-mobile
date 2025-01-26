import moment from "moment/moment";

export function tanggal(value: string) {
  return moment(value).format("DD MMMM YYYY");
}

export function jam(value: string) {
  return moment(value).format("DD MMMM YYYY hh:mm:ss");
}

export function formatRupiah(value: number, withRupiah: boolean = false) {
  const options = {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  };
  if (withRupiah) { // @ts-ignore
      return value.toLocaleString("id-ID", options);
  }
  return value.toLocaleString("id-ID");
}

export function jamMenit(input: string){
    return moment(input,'HH:mm').format('HH:mm');
}

export function sanitizeModalDetailObject({
  items,
  excludeKeys = [],
  dateFormatKeys = [],
  dateTimeFormatKeys = [],
  rupiahFormatKeys = [],
}: {
  items: object;
  excludeKeys?: string[];
  dateFormatKeys?: string[];
  dateTimeFormatKeys?: string[];
  rupiahFormatKeys?: string[];
}) {
  return Object.entries(items)
    .filter((item) => !["deleted_at", "id", ...excludeKeys].includes(item[0]))
    .map((item) => {
      let value = item[1];
      if (["created_at", "updated_at", ...dateFormatKeys].includes(item[0])) {
        value = tanggal(value);
      }
      if (
        ["created_at", "updated_at", ...dateTimeFormatKeys].includes(item[0])
      ) {
        value = jam(value);
      }
      if (rupiahFormatKeys.includes(item[0])) {
        value = formatRupiah(value, true);
      }
      return {
        key: item[0].replace("_", " "),
        value,
      };
    });
}
