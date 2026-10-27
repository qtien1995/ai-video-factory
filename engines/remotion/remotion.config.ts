// See all configuration options: https://remotion.dev/docs/config
// Each option also is available as a CLI flag: https://remotion.dev/docs/cli

// Note: When using the Node.JS APIs, the config file doesn't apply. Instead, pass options directly to the APIs

import { Config } from "@remotion/cli/config";
import { enableTailwind } from "@remotion/tailwind-v4";
import path from "node:path";

Config.setVideoImageFormat("png");
Config.setOverwriteOutput(true);
Config.overrideWebpackConfig((current) => {
  const withTailwind = enableTailwind(current);
  return {
    ...withTailwind,
    resolve: {
      ...withTailwind.resolve,
      alias: {
        ...(withTailwind.resolve?.alias || {}),
        "@styles": path.resolve(process.cwd(), "../../styles"),
        "@shared": path.resolve(process.cwd(), "src/shared"),
      },
    },
  };
});
