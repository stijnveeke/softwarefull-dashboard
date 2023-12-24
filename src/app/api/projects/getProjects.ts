import { notFound } from "next/navigation";
import type { Project } from "./project";
import { cache } from "react";

import "server-only";
import { BrowserSize } from "@/enums/browserSizes";
import { unstable_cache } from "next/cache";
import { makeScreenshots } from "./makeScreenshots";

export default async function getProjects(): Promise<Project[]> {
  const response = await fetch("http://localhost:3001/project", {
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_API_TOKEN}`,
    },
    next: { revalidate: 3600 },
  }).then(async (res) => {
    if (res.status === 404) {
      throw new Error("Not found");
    }
    return res;
  });
  if (response.ok) {
    const data = (await response.json()) as Project[];

    return data;
  } else {
    throw new Error("Failed to fetch projects");
  }
}
