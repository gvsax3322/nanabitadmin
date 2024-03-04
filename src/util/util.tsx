export const API_SERVER_HOST = "";

export const getNum = (check: string | number, basic: string | number) => {
  if (!check) {
    return basic;
  }
  return check;
};
