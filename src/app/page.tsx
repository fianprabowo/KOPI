import { getAppProject } from "@/lib/app-project";

export default async function HomePage() {
  if (getAppProject() === "splashpoint") {
    const { SplashPointLanding } = await import("@/splashpoint");
    return <SplashPointLanding />;
  }
  const { SimkopdesApp } = await import("@/simkopdes");
  return <SimkopdesApp />;
}
