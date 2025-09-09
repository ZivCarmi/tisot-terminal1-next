import { fetchAndUpdateFlights, getFlightsData } from "@/app/[locale]/actions";
import { NextRequest, NextResponse } from "next/server";
import { addClient, broadcastUpdate, removeClient } from "./sse";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (token !== process.env.NEXT_PUBLIC_GET_TOKEN) {
    return new NextResponse(JSON.stringify({ message: "Invalid Token" }), {
      status: 401,
      statusText: "Unauthorized",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const stream = new ReadableStream({
    start(controller) {
      addClient(controller);

      request.signal.addEventListener("abort", () => {
        removeClient(controller);
        controller.close();
      });
    },
  });

  // const stream = new ReadableStream({
  //   async start(controller) {
  //     const encoder = new TextEncoder();

  //     function send(data: any) {
  //       controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
  //     }

  //     const { flights, lastUpdated } = await getFlightsData();

  //     send({ flights, lastUpdated });

  //     request.signal.addEventListener("abort", () => {
  //       controller.close();
  //     });
  //   },
  // });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

export async function POST(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (token !== process.env.UPDATE_TOKEN_SECRET) {
    return new NextResponse(JSON.stringify({ message: "Invalid Token" }), {
      status: 401,
      statusText: "Unauthorized",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    console.log(
      `Flights json starting an update at ${new Date().toLocaleString("he-IL")}`
    );

    await fetchAndUpdateFlights();

    const { flights, lastUpdated } = await getFlightsData();

    broadcastUpdate({ flights, lastUpdated });

    console.log(
      `Flights json updated at ${new Date().toLocaleString("he-IL")}`
    );

    return NextResponse.json({ message: "Flights json updated" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error updating timestamp" },
      { status: 500 }
    );
  }
}
