import { FlightsData } from "@/types/flight";

let clients: ReadableStreamDefaultController[] = [];

export function addClient(controller: ReadableStreamDefaultController) {
  clients.push(controller);
  console.log("Client added, total:", clients.length);
}

export function removeClient(controller: ReadableStreamDefaultController) {
  clients = clients.filter((c) => c !== controller);
  console.log("Client removed, total:", clients.length);
}

export function broadcastUpdate(data: FlightsData) {
  const encoder = new TextEncoder();
  const message = encoder.encode(`data: ${JSON.stringify(data)}\n\n`);

  console.log("broadcastUpdate");

  for (const controller of clients) {
    try {
      controller.enqueue(message);
    } catch {
      removeClient(controller);
    }
  }
}
