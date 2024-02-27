import { type FC } from 'react'
import { useAppSelector } from '../Utils/store'
import { selectComponent } from '../Store/util'
import Players from './Players'
import Teams from './Teams'
import Matches from './Matches'
import Stats from './Stats'
import User from './User'
import DefaultHomeLogo from '../Components/DefaultHomeLogo'

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
