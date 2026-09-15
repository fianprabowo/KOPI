import { notFound } from "next/navigation";
import { getAppProject } from "@/lib/app-project";

export default async function DeckPage() {
  if (getAppProject() !== "splashpoint") notFound();
  const { PitchDeck } = await import("@/splashpoint/PitchDeck");
  return <PitchDeck />;
}
