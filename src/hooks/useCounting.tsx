const useCounting = (datafromBase: any) => {
  let totalExpenses = 0;
  Object.values(datafromBase).forEach((exp: any) => {
    totalExpenses += parseFloat(exp.amount);
    // setYearExpenses((prevState) => prevState + exp.amount);
  });

  return totalExpenses;
};

export default useCounting;
