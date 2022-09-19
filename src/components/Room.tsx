import { useEffect, useState } from "react";
import flowRight from "lodash/flowRight";
import { useParams } from "react-router-dom";
import useEventSource from "../hooks/useEventSource";

const isRoomData = (_: unknown) => true;
const parse = (ev: MessageEvent<any>) => JSON.parse(ev.data);
const log = console.log;

function Room() {
  const params = useParams<"room">();
  const [es, status] = useEventSource(
    "http://localhost:8080/room/" + params.room
  );
  const [data, setData] = useState<any>(undefined);
  useEffect(() => {
    if (es.current == null) {
      return;
    }
    const listen = flowRight([setData, parse]);

    es.current.addEventListener("message", listen);
    const cleanup = () => es.current?.removeEventListener("message", listen);
    return cleanup;
  }, [es, status]);

  return <div>{JSON.stringify(data, null, 2)}</div>;
}

export default Room;
