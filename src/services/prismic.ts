import * as Prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";
import { CONFIG_FILES } from "next/dist/shared/lib/constants";
import { config } from "process";
import sm from "../../sm.json";

export const repositoryName = Prismic.getRepositoryName(sm.apiEndpoint);

export function getPrismicClient() {
  const client = Prismic.createClient(repositoryName, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  });

  return client;
}
