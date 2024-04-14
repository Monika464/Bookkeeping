
export interface IShowDataProps {
    dataToShow: {}
}
const ShowData: React.FunctionComponent<IShowDataProps>=(props) => {

    const dataToShow = props.dataToShow;

    return(

      <>
        {Object.values(dataToShow).map((exp, index) => (
            <div key={index}>
        {` numer ${exp.invoiceNum}, kwota ${exp.amount},data ${exp.day}-${exp.month} nazwa ${exp.invoiceName}, sprzedawca ${exp.sellerName}, forma ${exp.paymentForm}, opis ${exp.description},opłacone ${exp.paid} ` }
            </div>
            
        ))}
      </>
    )



}

export default ShowData;