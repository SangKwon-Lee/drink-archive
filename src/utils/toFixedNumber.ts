export const toFixedNumber = (number: number) => {
  if (number) {
    return Number(number.toFixed(2));
  } else {
    return 0;
  }
};
