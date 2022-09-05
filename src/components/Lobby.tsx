import useEventSource from "../hooks/useEventSource";

/*
  Lobby is the page that is shown when the user has been authenticated, allowed
  to see what rooms have been instantiated, and who is in each room.
  Here the user should be able to view all the rooms, and enter a room.

  Keep mobile first in mind.

  Upon entering the lobby, an EventSource should be instantiated on the page, and
  persisted for as long as the user is on the lobby page. This is so that as users
  enter and exit rooms, the user will be made aware of how the rooms are changing.

  Events pertaining to the state of the rooms will update the views in real time.

  User will be able to enter a room, by tapping on a card, this will issue an
  http request to enter the room. The request should have details about which
  room the user would like to enter.

  The server should respond with a http message
  - 200 :: This means that the server has authorized the user, and will accept
    a web socket upgrade using the users authentication token
  - 401 :: Unauthorized, this is because the authentication token is invalid
  - 403 :: Forbidden, this may be returned in cases where the user is not allowed
    to view room.

  LOBBY <- EventSource <- Server

  LOBBY -> Join Room -> HTTP GET -> Server
*/
function Lobby() {
  const [es, status] = useEventSource("http://localhost:8080/lobby")
  return <div>Lobby</div>
}

export default Lobby;
