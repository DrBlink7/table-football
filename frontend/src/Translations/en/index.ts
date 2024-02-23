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
  team: 'Teams'
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
  create: 'Create New Player',
  createButton: 'Create',
  edit: 'Edit Existing Player',
  editButton: 'Edit',
  delete: 'Delete A Player',
  browse: 'Browse A Player',
  validationError: 'Do not insert any unsafe value'
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
  title: 'Player Page',
  back: 'Go Back to Player Page',
  id: 'Player Id',
  name: 'Player Name',
  cheerblue: 'Hey, but I usually play BLUE!',
  cheerred: 'Hey, but I usually play RED!'
}
const Team = {
  title: 'Teams',
  id: 'Team ID',
  name: 'Team Name',
  defenderRequired: 'Defender is required to form a Team',
  strikerRequired: 'Striker is required to form a Team',
  sameOption: 'Striker and defender must be different and selected',
  type: 'Icon',
  create: 'Create New Team',
  createButton: 'Create',
  edit: 'Edit Existing Team',
  editButton: 'Edit',
  delete: 'Delete A Team',
  browse: 'Browse A Team',
  validationError: 'Do not insert any unsafe value'
}
const deleteTeam = {
  title: 'Team Delete',
  dialogText: 'Are you sure you want to delete this Team? Team id: '
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
  deleteTeam
}

export default en
