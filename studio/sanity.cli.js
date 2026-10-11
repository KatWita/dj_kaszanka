import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: { projectId: "ilsbdrk7", dataset: "production" },
  // the Studio is deployed to https://djkaszanka.sanity.studio
  studioHost: "djkaszanka",
});
