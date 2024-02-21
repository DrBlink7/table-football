import { type FC } from 'react'
import { useParams } from 'react-router-dom'

const Player: FC = () => {
  const { id } = useParams()
  console.log('id', id)

  return <>
    Player
  </>
}

export default Player
