---
title: How to enable HMR for SvelteKit on Gitpod
date: 2022-01-09
---

If you've used Gitpod for a SvelteKit project, you may have noticed that HMR (Hot Module Reload) does not work out of the box. This post will show you how to get it working with just a bit of configuration.

## Why doesn't HMR work?

If you start up a SvelteKit project locally and view it in your browser, you may notice a websocket connection to `localhost` in the network logs. Vite (the bundler & dev server for SvelteKit) uses this to communicate file changes to the browser.

However, when we run a project on Gitpod, we're not actually running any server locally. It runs on a computer somewhere else and Gitpod gives us a URL to view it. As a result, connecting to `localhost` from the browser will not work.

Thankfully Vite provides a way to [configure HMR](https://vitejs.dev/config/#server-hmr) to use a different host. In our case, we need to change it to use the Gitpod URL.

## How to fix it

First, make sure you have a proper `.gitpod.yml` for SvelteKit. You can use the following if you don't have one:

```yml
tasks:
  - init: npm install
    command: npm run dev

ports:
  - port: 3000
    onOpen: open-preview
```

Save & commit this file to your project and refresh the page. It should start up the SvelteKit server and open a browser window.

Open up your `svelte.config.js` file. It should roughly look something like this:

```js
import adapter from '@sveltejs/adapter-auto'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    target: '#svelte'
  }
}

export default config
```

Add the following `vite` section to your config under `kit`:

```js
const config = {
  kit: {
    adapter: adapter(),
    target: '#svelte',

    // add this
    vite: {
      server: {
        // configure vite for HMR with Gitpod
        hmr: process.env.GITPOD_WORKSPACE_URL
          ? {
              // removes the protocol and replaces it with the port we're connecting to
              host: process.env.GITPOD_WORKSPACE_URL.replace('https://', '3000-'),
              protocol: 'wss',
              clientPort: 443
            }
          : true
      }
    }
  }
}
```

There's a bit going on here. Let me try to break it down as best I can.

- `host` requires no protocol in the URL, so we remove it.

- We then add a prefix of `3000-` to the Gitpod URL. This is a Gitpod convention to forward all connections to port 3000 on the server, where Vite is listening for a connection. If you use a different port for your dev server you should change it here.

- While the URL is setup to forward our connections to correct port on the server, it is still being served over SSL. So that means we need to use protocol `wss` and port `443`.

- If `process.env.GITPOD_WORKSPACE_URL` is not defined (i.e, you're not on Gitpod), it will fallback to the defaults.

## Test it out

Make sure the server is still running in the Gitpod terminal. If not, start it up again. Make some changes to your Svelte components and you should see HMR in action.
