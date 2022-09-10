import { useEffect, useRef, useState } from 'react'

function useEventSource(url: string, Source = EventSource) {
  const source = useRef<EventSource | null>(null)
  const [status, setStatus] = useState("initial")
  useEffect(() => {
    if (!url) {
      setStatus("closed")
      return
    }

    /**
     * presummably when connecting with the server, we'll
     * need a cookie to authenticate the user. Asking for 
     * private credentials here is a hack until we have a
     * proper authentication workflow setup.
     */
    const es = new Source(url, { withCredentials: true })
    source.current = es;

    es.onopen = () => setStatus("open")
    es.onerror = () => setStatus("error")

    return () => {
      es.close()
      source.current = null
    }
  }, [url, Source])
  return [source, status] as const
}

export default useEventSource;
