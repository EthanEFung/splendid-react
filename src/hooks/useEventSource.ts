import { useEffect, useRef, useState } from 'react'

function useEventSource(url: string, Source = EventSource) {
  const source = useRef<EventSource | null>(null)
  const [status, setStatus] = useState("initial")
  useEffect(() => {
    if (!url) {
      setStatus("closed")
      return
    }

    const es = new Source(url)
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
