import { formatFlightTime } from "@/utils/dateUtils";
import fs from "fs/promises";
import path from "path";

const FlightsUpdatedAt = async () => {
  const filePath = path.join(process.cwd(), "data", "last-updated.json");
  const fileContent = await fs.readFile(filePath, "utf-8");
  const { lastUpdated } = JSON.parse(fileContent);

  return formatFlightTime(lastUpdated.toString());
};

export default FlightsUpdatedAt;
