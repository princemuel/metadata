import { parseError, raise } from "@/helpers";
import { db } from "@/lib/clients";
import { geolocation } from "@vercel/edge";
import type { APIRoute } from "astro";
import { isbot } from "isbot";
import { z } from "zod";

export const prerender = false;

const schema = z.object({
  pathname: z.string(),
  referrer: z.string(),
  flag: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export const POST: APIRoute = async ({ request }) => {
  try {
    if (isbot(request.headers.get("User-Agent")))
      raise("Invalid request detected.");

    const body = (await request.json()) as any;
    const geo = geolocation(request);

    const result = schema.parse({ ...body, ...geo });

    await db.analytics.create({ data: result });

    return Response.json({ status: "success", message: "Request Success" });
  } catch (e) {
    return Response.json(
      { status: "error", message: parseError(e) },
      { status: 400 },
    );
  }
};

export const config = { runtime: "edge" };
