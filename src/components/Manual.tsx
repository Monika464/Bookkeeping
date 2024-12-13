import React from "react";
export interface INavbarProps {}

const Manual: React.FunctionComponent<INavbarProps> = () => {
  return (
    <>
      <div>
        <h2>Kroki obsługi programu:</h2>
        <ol>
          <li>Wprowadzenie kontrahentów według nazw.</li>
          <li>Wprowadzenie rachunków według dat.</li>
          <li>Podgląd i zestawienie roczne rachunków w zakładce *Rok*.</li>
          <li>Wynik finansowy i bilans w zakładce *Bilans*.</li>
        </ol>
      </div>

      <div>
        <h3>Dodawanie kontrahentów:</h3>
        <ol>
          <li>Wejdź w zakładkę *Kontrahent*</li>
          <li>Kliknij w pole *dodaj konrahenta* i uzupełnij dane </li>
          <li>Usuń kontrahenta z bazy *Edytuj w celu usunięcia*</li>
        </ol>
      </div>

      <div>
        <h3>Dodawanie rachunków:</h3>
        <ol>
          <li>Wejdź w zakładkę kalendarz.</li>
          <li>Kliknij w pole z wybraną datą.</li>
          <li>
            Kliknij w wybranej kategorii kosztów lub przychodów przycisk: *Dodaj
            pozycję*.
          </li>
          <li>
            Wypełnij pola danymi do rachunku (dwa pierwsze pola są obowiązkowe).
          </li>
          <li>
            Pole *opłacone/nieopłacone* możesz edytować w późniejszym czasie.
          </li>
          <li>
            Żeby podejrzeć wprowadzone rachunki pod konkretną datą, trzeba
            odświeżyć pole, klikając w datę.
          </li>
          <li>
            Jeżeli na dole wyświetlają się parzyste pozycje w kolorze czerwonym,
            to oznacza, że w twojej bazie pojawiły się duplikaty rachunków.
          </li>
        </ol>
      </div>
    </>
  );
};

export default Manual;

// export interface INavbarProps {}

// const Manual: React.FunctionComponent<INavbarProps> = () => {
//   return (
//     <>
//       <div>
//         <p>Dodawanie faktur:</p>
//         <ul>
//           <li> Wejdz w zakładke kalendarz</li>
//           <li> Kliknij w pole z wybrana datą</li>
//           <li>
//             Kliknij w wybranej kategorii kosztów lub przychodów przycisk: dodaj
//             pozycje
//           </li>
//           <li>
//             Wypełnij pola danymi do rachunku (dwa pierwsze pola sa obowiazkowe)
//           </li>
//           <li>
//             Pole opłacone/ nieopłacone możesz edytowac w późniejszym czasie
//           </li>
//           <li>
//             Żeby podejrzeć wprowadzone rachunki pod konkretną datą trzeba
//             odświeżyc pole klikając w datę
//           </li>
//           <li>
//             jezeli na dole wyświetlają sie parzyste pozycje w kolorze czerwonym
//             to oznacza ze w twojej bazie pojawiały się duplikaty rachunków
//           </li>
//         </ul>
//       </div>
//       <div>
//         <ul>
//           <p>Kroki obsługi programu</p>
//           <li>Wprowadzenie kontrahentów według nazw</li>
//           <li>Wprowadzenie rachunków według dat</li>
//           <li>Podgląd i zestawienie roczne rachunków w zakladce rok</li>
//           <li>Wynik finansowy i bilans w zakładce bilans </li>
//         </ul>
//       </div>
//       ;
//     </>
//   );
// };

// export default Manual;
