export const numberWithCommas = (x: string) => {
  const ammount = x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parseFloat(ammount).toFixed(8)
};
