import { NextApiRequest, NextApiResponse } from "next";
import NodeGeocoder from "node-geocoder";

const geocoder = NodeGeocoder({
  provider: "openstreetmap", // Replace with your preferred provider (e.g., Google, MapQuest)
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ error: "Latitude and longitude are required." });
    }

    try {
      const results = await geocoder.reverse({ lat: latitude, lon: longitude });
      if (results.length > 0) {
        return res.status(200).json({ location: results[0] });
      } else {
        return res.status(404).json({ error: "No location found for the given coordinates." });
      }
    } catch (error) {
      return res.status(500).json({ error: "Geocoding failed.", details: (error as Error).message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
