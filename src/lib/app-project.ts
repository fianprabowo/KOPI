export type AppProject = "kopi" | "splashpoint";

export function getAppProject(): AppProject {
  return process.env.APP_PROJECT === "splashpoint" ? "splashpoint" : "kopi";
}
