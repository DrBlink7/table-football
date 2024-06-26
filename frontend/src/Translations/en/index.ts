/* eslint-disable max-len */
const loader = {
  title: 'Table Football',
  text: '...Loading'
}
const error = {
  title: 'Error :(',
  body: 'Oops, something went wrong!',
  button: 'Back to Home',
  logout: 'Back to LogIn Page'
}
const home = {
  logout: 'Log Out',
  players: 'Players',
  team: 'Teams',
  matches: 'Matches',
  stats: 'Stats',
  info: 'User Info'
}
const login = {
  signin: 'Sign In',
  language: 'Select Language',
  error: 'Authentication error',
  emailLabel: 'Email',
  emailRequired: 'email is required',
  emailError: 'Enter a valid email address',
  passLabel: 'Password',
  passRequired: 'Password is required',
  passError: 'Password needs to have minimum length of 8, and have at least 1 number, 1 Uppercase, 1 Lowercase and 1 Special character'
}
const table = {
  select: 'Select'
}
const Player = {
  title: 'Players',
  id: 'Player ID',
  name: 'Player Name',
  type: 'Icon',
  create: 'Create',
  createButton: 'Create',
  edit: 'Edit',
  editButton: 'Edit',
  delete: 'Delete',
  browse: 'Stats',
  validationError: 'Do not insert any unsafe value',
  goalsConceded: 'Conceded Goals',
  goalsConcededPerMatch: 'Conceded Goals (Match)',
  goalsScored: 'Scored Goals',
  goalsScoredPerMatch: 'Scored Goals (Match)',
  gamesPlayed: 'Games Played'
}
const confirmationDialog = {
  title: 'Confirm Action',
  dialogText: 'Are you sure you want to perform this action?',
  cancelButtonText: 'Cancel',
  confirmButtonText: 'Confirm'
}
const editModal = {
  title: 'Edit Item',
  edit: 'Edit'
}
const deletePlayer = {
  title: 'Player Delete',
  dialogText: 'Are you sure you want to delete this Player? Player id: '
}
const player = {
  title: 'Player Stats: ',
  back: 'Go Back to Players Page',
  defenderPlayed: 'Match played as defender: ',
  goalsConceded: 'Goals Conceded: ',
  goalsConcededPerMatch: 'Goals Conceded (Match): ',
  playedForBlue: 'Match played for blue team: ',
  strikerPlayed: 'Match played as striker: ',
  goalsScored: 'Goals Scored: ',
  goalsScoredPerMatch: 'Goals Scored (Match): ',
  playedForRed: 'Match played for red team: '
}
const Team = {
  title: 'Teams',
  id: 'Team ID',
  defender_name: 'Defender',
  defender_id: 'Defender ID',
  striker_name: 'Striker',
  striker_id: 'Striker ID',
  name: 'Team Name',
  defenderRequired: 'Defender is required to form a Team',
  strikerRequired: 'Striker is required to form a Team',
  nameRequired: 'Name is required to create a Team',
  sameOption: 'Striker and defender must be different and selected',
  type: 'Icon',
  create: 'Create',
  createButton: 'Create',
  edit: 'Edit',
  editTitle: "You can only edit players in a teams that aren't in any match (you can always change name)",
  editButton: 'Edit',
  delete: 'Delete',
  browse: 'Browse',
  validationError: 'Do not insert any unsafe value',
  points: 'Points',
  goalsScored: 'Scored',
  goalsConceded: 'Conceded',
  gamesPlayed: 'Played'
}
const deleteTeam = {
  title: 'Team Delete',
  dialogText: 'Are you sure you want to delete this Team? Team id: '
}
const team = {
  samePage: 'You are already on the Team Page with id ',
  title: 'Team Stats: ',
  back: 'Go Back to Teams Page',
  defenderName: 'Defender: ',
  goalsConceded: 'Goals Conceded: ',
  gamesPlayed: 'Games Played: ',
  strikerName: 'Striker: ',
  goalsScored: 'Goals Scored: ',
  points: 'Points: '
}
const matches = {
  title: 'Match List',
  onGoing: 'On Going Matches',
  preparing: 'Preparing Matches',
  ended: 'Ended Matches',
  stats: 'See Stats',
  teamPage: 'Go to team page',
  live: 'See Live Match',
  create: 'Create',
  defender: 'Defender: ',
  striker: 'Striker: ',
  edit: 'Edit this match',
  delete: 'Delete this match',
  editTitle: 'You can edit only preparing matches.',
  deletedTitle: 'You can delete only preparing/ended matches.',
  sameOption: 'Teams needs to be different from eachother',
  dialogText: 'Are you sure you want to delete this Match? Match id: '
}
const Match = {
  id: 'Match Id: ',
  title: 'Match',
  live: 'Live Match',
  back: 'Go Back to Matches Page'
}
const stats = {
  label: 'Choose the Leaderboard',
  rankings: 'Teams Leaderboard',
  strikers: 'Strikers Leaderboard',
  defenders: 'Defenders Leaderboard'
}
const user = {
  cheerblue: 'Hey, but I usually play BLUE!',
  cheerred: 'Hey, but I usually play RED!',
  title: 'User Page',
  email: 'User email: '
}

const en = {
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

export default en
