const useCounting = (datafromBase: any) => {
  let totalExpenses = 0;
  Object.values(datafromBase).forEach((exp: any) => {
    console.log("suma wydatków", exp.amount);
    totalExpenses += parseFloat(exp.amount);
    // setYearExpenses((prevState) => prevState + exp.amount);
  });
  console.log("co tu jest", datafromBase);
  return totalExpenses;
};

export default useCounting;
