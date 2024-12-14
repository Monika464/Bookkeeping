const translations = {
  en: {
    title: "Steps for using the program:",
    steps: [
      "Enter contractors by name.",
      "Enter invoices by date.",
      "View and summarize annual invoices in the 'Year' tab.",
      "Financial results and balance sheet in the 'Balance' tab.",
    ],
    addContractors: {
      title: "Adding contractors:",
      instructions: [
        "Go to the 'Contractor' tab.",
        "Click the 'Add contractor' field and fill in the data.",
        "Delete a contractor from the database using 'Edit to delete'.",
      ],
    },
    addInvoices: {
      title: "Adding invoices:",
      instructions: [
        "Go to the calendar tab.",
        "Click on the field with the chosen date.",
        "Click the 'Add item' button in the chosen category of costs or revenues.",
        "Fill in the fields with invoice data (the first two fields are mandatory).",
        "The 'paid/unpaid' field can be edited later.",
        "To view entered invoices for a specific date, refresh the field by clicking on the date.",
        "If even-numbered items in red appear at the bottom, it means there are duplicate invoices in your database.",
      ],
    },
  },
  pl: {
    title: "Kroki obsługi programu:",
    steps: [
      "Wprowadzenie kontrahentów według nazw.",
      "Wprowadzenie rachunków według dat.",
      "Podgląd i zestawienie roczne rachunków w zakładce 'Rok'.",
      "Wynik finansowy i bilans w zakładce 'Bilans'.",
    ],
    addContractors: {
      title: "Dodawanie kontrahentów:",
      instructions: [
        "Wejdź w zakładkę 'Kontrahent'.",
        "Kliknij w pole 'Dodaj kontrahenta' i uzupełnij dane.",
        "Usuń kontrahenta z bazy używając 'Edytuj w celu usunięcia'.",
      ],
    },
    addInvoices: {
      title: "Dodawanie rachunków:",
      instructions: [
        "Wejdź w zakładkę kalendarz.",
        "Kliknij w pole z wybraną datą.",
        "Kliknij w wybranej kategorii kosztów lub przychodów przycisk: 'Dodaj pozycję'.",
        "Wypełnij pola danymi do rachunku (dwa pierwsze pola są obowiązkowe).",
        "Pole 'opłacone/nieopłacone' możesz edytować w późniejszym czasie.",
        "Żeby podejrzeć wprowadzone rachunki pod konkretną datą, trzeba odświeżyć pole, klikając w datę.",
        "Jeżeli na dole wyświetlają się parzyste pozycje w kolorze czerwonym, to oznacza, że w twojej bazie pojawiły się duplikaty rachunków.",
      ],
    },
  },
};

export default translations;
