import React from "react";
export interface IInvoice {
  invoiceNum: string;
  amount: number;
  day: number;
  month: number;
  invoiceName: string;
  sellerName: string;
  paymentForm: string;
  description: string;
  paid: boolean;
}

export interface IShowDataProps {
  dataToShow: IInvoice[];
}
const ShowData: React.FunctionComponent<IShowDataProps> = (props) => {
  const dataToShow = props.dataToShow;
  //console.log("data to show", dataToShow);

  return (
    <>
      {Object.values(dataToShow).map((exp, index) => (
        <div key={index}>
          {` numer ${exp.invoiceNum}, kwota ${exp.amount},data ${exp.day}-${exp.month} nazwa ${exp.invoiceName}, sprzedawca ${exp.sellerName}, forma ${exp.paymentForm}, opis ${exp.description},opłacone ${exp.paid} `}
        </div>
      ))}
    </>
  );
};

export default ShowData;
