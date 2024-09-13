import { basename, resolve } from "path";
import { cwd } from "process";
import { defineConfig, PluginOption } from "vite";

export interface CreateModuleConfigArguments {
  // the package.json object for the module
  package?: {
    exports?: Record<string, string>;
    main?: string;
    devDependencies?: Record<string, string>;
    dependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;
  };
  // entry point for the module
  entry?: string | string[];
  // list of external deps NOT already included in peerDependencies above
  externals: string[];
  // list of plugins to use
  plugins?: PluginOption[];
}

function getEntryFromPath(output: string) {
  // for given ./dist/index.js return index
  // for given ./src/index.ts return index
  const path = resolve(cwd(), output);
  return basename(path).replace(/(\.js|\.ts)$/, "");
}

function getOutputFromEntry(entry: string) {
  return `${entry}.js`;
}

function getInputFromEntry(entry: string) {
  return `./src/${entry}.ts`;
}

function findEntries(
  entry?: string | string[],
  main?: string,
  exports?: Record<string, string>,
) {
  const entries = new Set<string>();

  // entry is explicitly defined from config
  if (entry) {
    if (Array.isArray(entry)) {
      entry.forEach((e) => {
        entries.add(getEntryFromPath(e));
      });
    } else {
      entries.add(getEntryFromPath(entry));
    }
  }
  // entries are derived from package.json "exports" field
  else if (exports) {
    for (let key of Object.keys(exports)) {
      // converts exports paths to entry names and strip leading `./` when present
      if (key.startsWith("./")) key = key.slice(2);
      if (key === ".") key = "index";
      entries.add(key);
    }
  }
  // entries are derived from package.json "main" field
  else if (main) {
    entries.add(getEntryFromPath(main));
  } else {
    entries.add("index");
  }

  return [...entries];
}

export function createModuleConfig(args: CreateModuleConfigArguments) {
  const { externals = [], entry, package: pkg, plugins } = args;
  const peerDeps = pkg?.peerDependencies
    ? Object.keys(pkg.peerDependencies)
    : [];
  const normalDeps = pkg?.dependencies ? Object.keys(pkg.dependencies) : [];
  const devDeps = pkg?.devDependencies ? Object.keys(pkg.devDependencies) : [];
  const workspaceDeps = [normalDeps, devDeps]
    .flat()
    .filter((dep) => dep.startsWith("@bored"));

  // merge and deduplicate peer deps and explicit externals
  const externs = Array.from(
    new Set([externals, peerDeps, devDeps, workspaceDeps].flat()),
  );

  function isExternal(id: string) {
    const isMarkedExternal = externs.some((dep) => id.includes(dep));
    return isMarkedExternal;
  }

  const entries = findEntries(entry, pkg?.main, pkg?.exports);
  return defineConfig(({ mode }) => ({
    plugins,
    build: {
      sourcemap: true,
      lib: {
        entry: entries.map((entry) => getInputFromEntry(entry)),
        formats: ["es"],
        fileName: (_, entry) => {
          const output = getOutputFromEntry(entry);
          return output;
        },
      },
      rollupOptions: {
        external: isExternal,
      },
      minify: mode === "development" ? false : "esbuild",
    },
  }));
}
