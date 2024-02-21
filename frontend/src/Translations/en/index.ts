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
  players: 'Players'
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
  edit: 'Edit Existing Player',
  delete: 'Delete A Player',
  browse: 'Browse A Player'
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
const en = {
  loader,
  error,
  login,
  home,
  table,
  Player,
  confirmationDialog,
  editModal,
  deletePlayer
}

export default en
