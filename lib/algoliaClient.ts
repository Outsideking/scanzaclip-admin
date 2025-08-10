import algoliasearch from "algoliasearch";

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || "",
  process.env.ALGOLIA_ADMIN_API_KEY || ""
);

const index = client.initIndex("scripts");

export { client, index };

