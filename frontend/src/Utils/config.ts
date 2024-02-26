import packageJson from '../../package.json'

export const environment = process.env.REACT_APP_MODE
export const secretKey = process.env.REACT_APP_SECRET_KEY ?? 'unaChiaveSegreta'
export const authorization = process.env.REACT_APP_AUTHORIZATION ?? 'authorization'
export const randomBg = 'url(https://source.unsplash.com/random?wallpapers)'
export const mainColor = '#003049'
export const secondaryColor = '#d62828'
export const Version = packageJson.version
export const beHost = process.env.REACT_APP_BE_HOST ?? 'http://localhost:3001'
