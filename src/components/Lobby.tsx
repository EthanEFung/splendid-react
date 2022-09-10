import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useEventSource from "../hooks/useEventSource";
import List from "../components/List";

type CardProps = {
  name: string;
  list: string[];
};

type RoomData = {
  name: string;
  occupants: { [occ: string]: {} };
};

type LobbyData = {
  [name: string]: RoomData;
};

/**
 * TODO: maybe consider using zod
 */
function isLobbyData(data: any): data is LobbyData {
  if (typeof data !== "object" || data === null) {
    return false;
  }
  for (const key in data) {
    if (!data.hasOwnProperty(key)) {
      continue;
    }
    const name = data[key]?.name;
    if (name !== key) {
      return false;
    }
  }
  return true;
}

function Card({ name, list }: CardProps) {
  return (
    <div>
      <h2>{name}</h2>
      <div>
        {list.map((item, i) => (
          <div key={i}>{item}</div>
        ))}
      </div>
    </div>
  );
}

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
  const [es, status] = useEventSource("http://localhost:8080/lobby");
  const [rooms, setRooms] = useState<RoomData[]>([]);

  useEffect(() => {
    if (es.current == null) {
      return;
    }
    const listen = (ev: MessageEvent<any>) => {
      const json = JSON.parse(ev.data);
      if (!isLobbyData(json)) {
        return;
      }
      const curr = Object.values(json);
      setRooms(curr);
      console.log(ev.data);
    };
    const cleanup = () => es.current?.removeEventListener("message", listen);

    es.current.addEventListener("message", listen);
    return cleanup;
  }, [es, setRooms]);

  return (
    <div>
      <h1 className="text-xl">Lobby</h1>
      <Link
        to="/create"
        className="border rounded cursor-pointer p-2 inline-block"
      >
        Create a room +
      </Link>
      <h2 className="text-lg">Rooms</h2>
      <List
        list={rooms}
        none={<div>There are no rooms in the lobby</div>}
        render={(room) => (
          <Card
            key={room.name}
            name={room.name}
            list={Object.keys(room.occupants)}
          />
        )}
      />
    </div>
  );
}

export default Lobby;
