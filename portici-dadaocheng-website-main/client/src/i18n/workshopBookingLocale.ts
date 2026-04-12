import type { Lang } from "@/contexts/LangContext";

export type WorkshopsBookingCopy = {
  gateInviteBlurb: string;
  gateOpenFlow: string;
  gateContactPrefix: string;
  gateContactLink: string;
  navSessions: string;
  navConfirm: string;
  listKicker: string;
  listTitle: string;
  listIntroBeforeSessionsLink: string;
  listIntroAfterSessionsLink: string;
  backToList: string;
  sessionBoxTitle: string;
  nextToYourDetails: string;
  changeDate: string;
  formTitle: string;
  formIntro: string;
  labelFullName: string;
  labelEmail: string;
  labelPhone: string;
  labelCountry: string;
  labelParticipants: string;
  labelNotes: string;
  placeholderNotes: string;
  countryPlaceholder: string;
  priceLinePerson: string;
  depositLabel: string;
  balanceNote: (amount: string) => string;
  submitBooking: string;
  submitProcessing: string;
  reviewOk: string;
  reviewTitle: string;
  reviewCodeLead: string;
  reviewCodeHint: string;
  summaryTitle: string;
  summarySession: string;
  summaryDate: string;
  summaryParticipants: string;
  summaryTotal: string;
  summaryPayNow: string;
  summaryBalanceDay: string;
  payRedirecting: string;
  payProceed: (amount: string) => string;
  payStripeNote: string;
  elsewhere: string;
  contacts: string;
  spotsSmall: string;
  spotsStandard: string;
  perPerson: string;
  ctaSelectWorkshop: string;
  sessionEmpty: string;
  sessionFull: string;
  sessionOneLeft: string;
  sessionNLeft: (n: number) => string;
  selected: string;
  maxParticipantsLine: (n: number) => string;
  participantCountOption: (n: number) => string;
};

export function getWorkshopsBookingCopy(lang: Lang): WorkshopsBookingCopy {
  const it: WorkshopsBookingCopy = {
    gateInviteBlurb:
      "Avete già un invito o un link al deposito? Qui resta il flusso dedicato a conferma e pagamento per una sessione già scelta — non è il percorso principale del sito.",
    gateOpenFlow: "Apri conferma e pagamento",
    gateContactPrefix: "Altre domande o richieste?",
    gateContactLink: "Contatti",
    navSessions: "Sessioni",
    navConfirm: "Conferma",
    listKicker: "Flusso riservato",
    listTitle: "Conferma sessione e deposito",
    listIntroBeforeSessionsLink:
      "Questa area serve quando una sessione è già stata comunicata e volete scegliere data e completare il deposito. Per nuove linee e interesse collettivo, usate la pagina ",
    listIntroAfterSessionsLink: ".",
    backToList: "← Torna all'elenco",
    sessionBoxTitle: "Conferma partecipazione",
    nextToYourDetails: "Avanti — i vostri dati",
    changeDate: "← Cambia data",
    formTitle: "I tuoi dati",
    formIntro:
      "Inserisci i tuoi dati per confermare la richiesta e procedere al deposito per questa sessione.",
    labelFullName: "Nome completo *",
    labelEmail: "Email *",
    labelPhone: "Telefono",
    labelCountry: "Paese",
    labelParticipants: "Numero di partecipanti *",
    labelNotes: "Note (allergie, richieste speciali)",
    placeholderNotes: "Eventuali note...",
    countryPlaceholder: "Italia",
    priceLinePerson: "persona/e",
    depositLabel: "Acconto (50%)",
    balanceNote: (amount) => `Il saldo di €${amount} sarà dovuto il giorno della sessione.`,
    submitBooking: "Conferma la richiesta e il deposito (50%)",
    submitProcessing: "Elaborazione...",
    reviewOk: "Ok",
    reviewTitle: "Richiesta registrata",
    reviewCodeLead: "Il tuo codice di conferma è:",
    reviewCodeHint: "Conserva questo codice per il giorno della sessione.",
    summaryTitle: "Riepilogo sessione",
    summarySession: "Sessione",
    summaryDate: "Data",
    summaryParticipants: "Partecipanti",
    summaryTotal: "Totale",
    summaryPayNow: "Da pagare ora (50%)",
    summaryBalanceDay: "Saldo il giorno della sessione",
    payRedirecting: "Reindirizzamento a Stripe...",
    payProceed: (amount) => `Procedi al deposito · €${amount}`,
    payStripeNote:
      "Sarai reindirizzato a Stripe per il pagamento sicuro. Usa la carta di test: 4242 4242 4242 4242.",
    elsewhere: "Altrove",
    contacts: "Contatti",
    spotsSmall: "Piccolo gruppo",
    spotsStandard: "Gruppo standard",
    perPerson: "/ persona",
    ctaSelectWorkshop: "Conferma partecipazione",
    sessionEmpty:
      "Nessuna sessione disponibile al momento. Contattaci per organizzare una data privata.",
    sessionFull: "Completo",
    sessionOneLeft: "Resta un posto",
    sessionNLeft: (n) => `Restano ${n} posti`,
    selected: "Selezionato",
    maxParticipantsLine: (n) => `Fino a ${n} persone`,
    participantCountOption: (n) => `${n} ${n === 1 ? "persona" : "persone"}`,
  };

  const en: WorkshopsBookingCopy = {
    gateInviteBlurb:
      "Already have an invite or deposit link? This is the path to confirm participation and pay the deposit for a session you were offered — not the main route through the site.",
    gateOpenFlow: "Open confirmation and deposit",
    gateContactPrefix: "Other questions?",
    gateContactLink: "Contact",
    navSessions: "Sessions",
    navConfirm: "Confirm",
    listKicker: "Reserved path",
    listTitle: "Confirm participation and deposit",
    listIntroBeforeSessionsLink:
      "Use this when a session has already been offered and you need to pick a date and complete the deposit. For new lines and collective interest, start from the ",
    listIntroAfterSessionsLink: " page.",
    backToList: "← Back to list",
    sessionBoxTitle: "Confirm participation",
    nextToYourDetails: "Next — your details",
    changeDate: "← Change date",
    formTitle: "Your details",
    formIntro:
      "We use this to hold your place and record the deposit for the session you selected.",
    labelFullName: "Full name *",
    labelEmail: "Email *",
    labelPhone: "Phone",
    labelCountry: "Country",
    labelParticipants: "Number of participants *",
    labelNotes: "Notes (allergies, access needs)",
    placeholderNotes: "Anything we should keep in mind...",
    countryPlaceholder: "Italy",
    priceLinePerson: "participant(s)",
    depositLabel: "Deposit (50%)",
    balanceNote: (amount) => `The remaining €${amount} is due on the day of the session.`,
    submitBooking: "Confirm request and deposit (50%)",
    submitProcessing: "Processing...",
    reviewOk: "Ok",
    reviewTitle: "Request recorded",
    reviewCodeLead: "Your confirmation code:",
    reviewCodeHint: "Keep this code for the day of the session.",
    summaryTitle: "Session summary",
    summarySession: "Session",
    summaryDate: "Date",
    summaryParticipants: "Participants",
    summaryTotal: "Total",
    summaryPayNow: "To pay now (50%)",
    summaryBalanceDay: "Balance on the day of the session",
    payRedirecting: "Redirecting to Stripe...",
    payProceed: (amount) => `Proceed to deposit · €${amount}`,
    payStripeNote:
      "You will be redirected to Stripe for payment. Test card: 4242 4242 4242 4242.",
    elsewhere: "Elsewhere",
    contacts: "Contact",
    spotsSmall: "Small group",
    spotsStandard: "Standard group",
    perPerson: "/ person",
    ctaSelectWorkshop: "Confirm participation",
    sessionEmpty:
      "No open session right now. Write us if you need a private date.",
    sessionFull: "Full",
    sessionOneLeft: "One place left",
    sessionNLeft: (n) => `${n} places left`,
    selected: "Selected",
    maxParticipantsLine: (n) => `Up to ${n} people`,
    participantCountOption: (n) => `${n} ${n === 1 ? "person" : "people"}`,
  };

  return lang === "en" ? en : it;
}
