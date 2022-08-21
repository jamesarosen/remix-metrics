import { ReadableStream } from "@remix-run/web-stream"

type InitFunction = {
  (send: (event: string, data: string) => void): () => void;
}

/**
 * A Remix LoaderFunction that uses Server-Sent Events to stream data to
 * the client.
 * @param request an HTTP request
 * @param init a function that takes a single argument, send, which can be
 * used to send messages over the streaming response.
 * @see https://twitter.com/ryanflorence/status/1533446922983247873
 * @see https://github.com/remix-run/remix/discussions/2622
 */
export default function eventStream(request: Request, init: InitFunction) {
  const stream = new ReadableStream({
    start(controller: ReadableStreamController<Uint8Array>) {
      const encoder = new TextEncoder();
      const send = (event: string, data: string) => {
        controller.enqueue(encoder.encode(`event: ${event}\n`))
        controller.enqueue(encoder.encode(`data: ${data}\n\n`))
      }
      const cleanup = init(send)

      let closed = false
      const close = () => {
        if (closed) return
        cleanup()
        closed = true
        request.signal.removeEventListener('abort', close)
        controller.close()
      }

      request.signal.addEventListener('abort', close)

      if (request.signal.aborted) {
        close()
        return
      }
    }
  })

  return new Response(stream, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store, no-transform',
      'Content-Type': 'text/event-stream',
    },
  })
}