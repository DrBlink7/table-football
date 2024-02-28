import { type FC } from 'react'
import { useAppSelector } from '../Utils/store'
import { selectComponent } from '../Store/util'
import Players from '../Controllers/Players'
import Teams from '../Controllers/Teams'
import Matches from '../Controllers/Matches'
import Stats from '../Controllers/Stats'
import User from '../Controllers/User'
import DefaultHomeLogo from './DefaultHomeLogo'

const MainPage: FC = () => {
  const component = useAppSelector(selectComponent)

  switch (component) {
    case 'team':
      return <Teams />
    case 'info':
      return <User />
    case 'matches':
      return <Matches />
    case 'players':
      return <Players />
    case 'stats':
      return <Stats />
    default:
      return <DefaultHomeLogo />
  }
}

export default MainPage
