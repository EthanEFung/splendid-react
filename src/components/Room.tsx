import useEventSource from "../hooks/useEventSource";
import { useParams } from 'react-router-dom'

function Room() {
  const params = useParams<'room'>()
  console.log(params)
  const [es, status] = useEventSource("http://localhost:8080/room/" + params.room)
  return <div>room</div>;
}

export default Room;
