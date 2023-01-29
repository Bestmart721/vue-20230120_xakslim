import fs from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { fileURLToPath, URL } from 'node:url';

import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

/**
 * @param {string} taskDir - Path to task directory in Taskbook, e.g. 0-module/1-task
 * @return {string} Path to task source directory depending on env, e.g. path/src
 */
function joinTaskSourceDir(taskDir) {
  if (process.env.TASK_DEV) {
    const sourceDirname = process.env.SOLUTION ? 'solution' : 'src';
    return `${taskDir}/${sourceDirname}`;
  }
  return taskDir;
}

/**
 * @typedef Task
 * @property task {string}
 * @property module {string}
 * @property path {string}
 */

/**
 * Discover all tasks in Taskbook
 * @param {string} rootDir - Path to Taskbook root
 * @returns {Task[]} Array of tasks data
 */
function discoverTaskDirs(rootDir = __dirname) {
  const isDir = (filepath) => fs.lstatSync(filepath).isDirectory();
  const getSubDirs = (dir) => fs.readdirSync(dir).filter((name) => isDir(join(dir, name)));
  const isModuleOrTaskDir = (dirname) => /^\d+-/.test(dirname);

  return getSubDirs(rootDir)
    .filter(isModuleOrTaskDir)
    .flatMap((module) =>
      getSubDirs(join(rootDir, module))
        .filter(isModuleOrTaskDir)
        .map((task) => ({ module, task, path: `${module}/${task}` })),
    );
}

/**
 * Generates pages config for building.
 * Each page is served by index.html on /module/task.
 * @param {Task[]} taskList - Array of tasks data
 * @return {Object} Pages config for vite.config.js build.rollupOptions.input
 */
function generatePagesConfig(taskList) {
  return taskList.reduce((pages, { module, task, path }) => {
    pages[`${module}/${task}`] = resolve(join(__dirname, joinTaskSourceDir(path)), 'index.html');
    return pages;
  }, {});
}

/**
 * Use `rollupOptions.input` pages as bases for multi page SPA fallback.
 * Rewrite SPA routes `/<page>/*` to `/<page>/index.html`.
 * @returns {import('vite').Plugin}
 */
function devServerMultiPageSpa() {
  return {
    name: 'dev-server-multi-page-spa',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const rollupOptionsInput = server.config.build.rollupOptions.input;
        if (!rollupOptionsInput) {
          return next();
        }

        const pathname = new URL(req.url, 'http://localhost').pathname;

        const isFile = !!extname(pathname);
        if (isFile) {
          return next();
        }

        const page = Object.keys(rollupOptionsInput).find((page) => pathname.startsWith(`/${page}`));
        if (page) {
          req.url = `/${page}/index.html`;
        }

        next();
      });
    },
  };
}

/**
 * Rewrites path in taskbook development
 * @param {Task[]} tasks
 * @returns {import('vite').Plugin|false}
 */
const taskbookDevSourceRewrite = (tasks) => {
  // Ignore production
  if (!process.env.TASK_DEV) {
    return false;
  }

  return {
    name: 'taskbook-dev-source-rewrite',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = new URL(req.url, 'http://localhost').pathname;
        const task = tasks.find(({ module, task }) => pathname.startsWith(`/${module}/${task}/`));
        if (task) {
          const sourcePath = joinTaskSourceDir(task.path);
          if (!req.url.includes(sourcePath)) {
            req.url = req.url.replace(task.path, sourcePath);
          }
        }
        next();
      });
    },
  };
};

// All tasks for Taskbook's Index page
const tasks = discoverTaskDirs(__dirname);

export default defineConfig({
  plugins: [devServerMultiPageSpa(), taskbookDevSourceRewrite(tasks), vue(), vueJsx()],

  resolve: {
    alias: [
      // Migration from @vue/cli Taskbook: support for ~@ alias in css
      { find: '~@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      // Migration from @vue/cli Taskbook: support for @ alias
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      // Migration from @vue/cli Taskbook: support public assets and icons
      { find: /^\/(assets|icons)\/(.*)/, replacement: '/src/$1/$2' },
    ],
    // Migration from @vue/cli Taskbook: add .vue extension resolve
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },

  define: {
    // Inject tasks to generate index page
    'import.meta.env.TASKBOOK_TASKS': JSON.stringify(tasks),
  },

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ...generatePagesConfig(tasks),
      },
    },
  },
});
