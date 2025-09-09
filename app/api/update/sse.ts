import { FlightsData } from "@/types/flight";

let clients: ReadableStreamDefaultController[] = [];

export function addClient(controller: ReadableStreamDefaultController) {
  clients.push(controller);
}

export function removeClient(controller: ReadableStreamDefaultController) {
  clients = clients.filter((c) => c !== controller);
}

export function broadcastUpdate(data: FlightsData) {
  const encoder = new TextEncoder();
  const message = encoder.encode(`data: ${JSON.stringify(data)}\n\n`);

  for (const controller of clients) {
    try {
      controller.enqueue(message);
    } catch {
      removeClient(controller);
    }
  }
}
