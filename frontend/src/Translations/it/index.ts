/* eslint-disable max-len */
const loader = {
  title: 'Table Football',
  text: '...Sta Caricando'
}
const error = {
  title: 'Errore :(',
  body: 'Oops, qualcosa è andato storto!',
  button: 'Indietro alla pagina Home',
  logout: 'Indietro alla pagina di LogIn'
}
const home = {
  logout: 'Log Out',
  players: 'Giocatori',
  team: 'Squadre',
  matches: 'Partite',
  stats: 'Statistiche',
  info: 'Utente'
}
const login = {
  signin: 'Sign In',
  language: 'Seleziona Languaggio',
  error: 'Errore di Autenticazione',
  emailLabel: 'Email',
  emailRequired: "L'email è obbligatoria",
  emailError: "Inserisci un'indirizzo email valido",
  passLabel: 'Password',
  passRequired: 'La password è obbligatoria',
  passError: 'La password deve essere lunga minimo 8 caratteri ed avere almeno 1 numero, 1 Lettera Maiuscola, 1 lettera minuscola ed 1 carattere speciale'
}
const table = {
  select: 'Seleziona'
}
const Player = {
  title: 'Giocatori',
  id: 'ID Giocatore',
  name: 'Nome Giocatore',
  type: 'Icona',
  create: 'Crea un Giocatore',
  createButton: 'Crea',
  edit: 'Modifica Giocatore Esistente',
  editButton: 'Modifica',
  delete: 'Cancella un Giocatore',
  browse: 'Esamina un Giocatore',
  validationError: 'Non inserire caratteri non sicuri!',
  goalsConceded: 'Gol Subiti',
  goalsConcededPerMatch: 'Gol Subiti (per Partita)',
  goalsScored: 'Gol Segnati',
  goalsScoredPerMatch: 'Gol Segnati (per Partita)',
  gamesPlayed: 'Partite Giocate'
}
const confirmationDialog = {
  title: "Conferma l'azione",
  dialogText: 'Sei sicuro di voler fare questa azione?',
  cancelButtonText: 'Cancella',
  confirmButtonText: 'Conferma'
}
const editModal = {
  title: "Modifica l'elemento",
  edit: 'Modifica'
}
const deletePlayer = {
  title: 'Cancella Personaggio',
  dialogText: 'Sei sicuro di voler cancellare questo Giocatore? ID Giocatore: '
}
const player = {
  title: 'Statistiche Giocatore',
  back: 'Torna alla Pagina dei Giocatori',
  defenderPlayed: 'Partite giocate come difensore: ',
  goalsConceded: 'Goals Subiti: ',
  goalsConcededPerMatch: 'Goals Subiti (per Partita): ',
  playedForBlue: 'Partite giocate per la Squadra blu: ',
  strikerPlayed: 'Partite giocate come attaccante: ',
  goalsScored: 'Goals Segnati: ',
  goalsScoredPerMatch: 'Goals Segnati (per Partita): ',
  playedForRed: 'Partite giocate per la Squadra rossa: '
}
const Team = {
  title: 'Squadre',
  id: 'ID della Squadra',
  defender_name: 'Difensore',
  defender_id: 'ID Difensore',
  striker_name: 'Attaccante',
  striker_id: 'ID Attaccante',
  name: 'Nome Squadra',
  defenderRequired: 'il Difensore è obbligatorio nella formazione di una Squadra',
  strikerRequired: "l'Attaccante è obbligatorio nella formazione di una Squadra",
  nameRequired: 'Il nome è obbligatorio nella creazione di una Squadra',
  sameOption: "l'attaccante ed il difensore devono essere diversi tra loro",
  type: 'Icona',
  create: 'Crea Nuova Squadra',
  createButton: 'Crea',
  edit: 'Modifica Squadra Esistente',
  editButton: 'Modifica',
  delete: 'Cancella Una Squadra',
  browse: 'Esamina una Squadra',
  validationError: 'Non inserire caratteri non sicuri!',
  points: 'Punti',
  goalsScored: 'Segnati',
  goalsConceded: 'Subiti',
  gamesPlayed: 'Giocate'
}
const deleteTeam = {
  title: 'Cancella Squadra',
  dialogText: 'Sei sicuro di voler cancellare la Squadra? ID Squadra: '
}
const team = {
  title: 'Squadra',
  back: 'Torna indietro alla Pagina delle Squadre',
  defenderName: 'Difensore: ',
  goalsConceded: 'Goals Subiti: ',
  gamesPlayed: 'Partite Giocate: ',
  strikerName: 'Attaccante: ',
  goalsScored: 'Goals Segnati: ',
  points: 'Punti: '
}
const matches = {
  title: 'Lista Partite',
  onGoing: 'Partite in corso',
  preparing: 'Partite in preparazione',
  ended: 'Partite terminate',
  stats: 'Guarda le Statistiche',
  teamBlue: 'Blu',
  teamRed: 'Rosso',
  teamPage: 'Vai alla pagina della Squadra',
  live: 'Guarda Partita in corso',
  create: 'Crea Nuova Partita',
  defender: 'Difensore: ',
  striker: 'Attaccante: ',
  edit: 'Modifica questa partita',
  delete: 'Cancella questa partita',
  editTitle: 'Puoi modificare solo partite in preparazione.',
  deletedTitle: 'Puoi modificare solo partite in preparazione o terminate.',
  dialogText: 'Sei sicuro di voler cancellare questa Partita? ID Partita: '
}
const Match = {
  id: 'Id Partita: ',
  title: 'Partita',
  live: 'Partita dal Vivo',
  back: 'Torna alla Pagina delle Partite'
}
const stats = {
  label: 'Scegli la Classifica',
  rankings: 'Classifica della Lega',
  strikers: 'Classifica dei Capocannonieri',
  defenders: 'Classifica dei Difensori'
}
const user = {
  cheerblue: 'Hey, ma io gioco con i BLU!',
  cheerred: 'Hey, ma io gioco con i ROSSI!',
  title: 'Pagina Utente',
  email: 'User email: '
}

const it = {
  loader,
  error,
  login,
  home,
  table,
  Player,
  confirmationDialog,
  editModal,
  deletePlayer,
  player,
  Team,
  deleteTeam,
  team,
  matches,
  Match,
  stats,
  user
}

export default it
