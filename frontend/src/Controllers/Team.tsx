import { type FC } from 'react'
import { useParams } from 'react-router-dom'

const Team: FC = () => {
  const { id } = useParams()
  return <>team {id}</>
}

export default Team
