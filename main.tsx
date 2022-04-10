// deno-lint-ignore-file no-explicit-any
/** @jsx h */

import { createGraph } from "https://deno.land/x/deno_graph@0.26.0/mod.ts";
import { serve } from "https://deno.land/std@0.134.0/http/server.ts";
import { h, ssr } from "https://crux.land/nanossr@0.0.4";

const render = (component: any) => ssr(() => <App>{component}</App>);

serve(async (_req) => {
  let module = new URL(_req.url).pathname.slice(1);
  if(module === "favicon.ico") { return await fetch("https://deno.land/logo.svg"); }
  if(module === "") { return render(<Home />); }
  if(module === "info") { module = new URL(_req.url).searchParams.get("url") || ""; }
  const graph = validURL(module)
    ? (await createGraph(module)).toString(true)
    : `error: ${module} is not a valid url`;
  return render(<Info graph={graph} module={module} />);
});

function App({ children: children }: { children: any }) {
  return (
    <div class="min-h-screen justify-center bg-gray-900">   
      <link rel="shortcut icon" href="favicon.ico"></link>   
      <header class="bg-gray-50 border-b border-gray-200 relative py-6 z-10 dark:bg-gray-800 dark:border-gray-700"><nav class="mx-auto flex flex-wrap items-center justify-between px-4 sm:px-6 md:px-8 lg:p-0 max-w-screen-lg tw-1rxq1b0"><a href="/" class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-auto sm:h-12 my-2" viewBox="0 0 512 512"><title>Deno logo</title><mask id="a"><circle fill="white" cx="256" cy="256" r="230"></circle></mask><circle cx="256" cy="256" r="256"></circle><path mask="url(#a)" stroke="white" stroke-width="25" stroke-linecap="round" d="M71 319l17-63M107.964 161.095l17-63M36.93 221l17-63M125.964 385l17-63M160.372 486.829l17-63M230 456.329l17-63M206.257 92.587l17-63M326.395 173.004l17-63M452.182 304.693l17-63M409.124 221l17-63M299.027 54.558l17-63M400.624 86.058l17-63"></path><path mask="url(#a)" fill="white" stroke="black" stroke-width="12" d="M252.225 344.418c-86.65 2.61-144.576-34.5-144.576-94.363 0-61.494 60.33-111.145 138.351-111.145 37.683 0 69.532 10.65 94.392 30.092 21.882 17.113 37.521 40.526 45.519 66.312 2.574 8.301 22.863 83.767 61.112 227.295l1.295 4.86-159.793 74.443-1.101-8.063c-8.85-64.778-16.546-113.338-23.076-145.634-3.237-16.004-6.178-27.96-8.79-35.794-1.227-3.682-2.355-6.361-3.303-7.952a12.56 12.56 0 00-.03-.05z"></path><circle mask="url(#a)" cx="262" cy="203" r="16"></circle></svg></a><input aria-controls="menu" aria-expanded="false" aria-haspopup="true" aria-label="Navigation" class="hidden" id="nav-cb" type="checkbox" /><div class="-mr-2 flex items-center md:hidden"><label for="nav-cb" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 dark:text-gray-100 dark:hover:text-gray-200 dark:hover:bg-gray-900 dark:focus:outline-none dark:focus:bg-gray-900 dark:focus:text-gray-200"><svg stroke="currentColor" fill="none" viewBox="0 0 24 24" class="h-6 w-6"><title>Menu | Deno</title><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path></svg><svg class="h-6 w-6 hidden" stroke="currentColor" fill="none" viewBox="0 0 24 24"><title>Close Menu | Deno</title><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></label></div><div class="md:flex md:w-auto hidden w-screen px-2 pt-4 pb-3"><a class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 md:inline-block md:font-medium md:text-gray-500 dark:text-gray-200 dark:hover:text-gray-50 dark:hover:bg-gray-900 dark:focus:text-gray-50 dark:focus:bg-gray-900 dark:md:text-gray-400" href="https://deno.com/deploy">Deploy</a><a class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 md:inline-block md:font-medium md:text-gray-500 dark:text-gray-200 dark:hover:text-gray-50 dark:hover:bg-gray-900 dark:focus:text-gray-50 dark:focus:bg-gray-900 dark:md:text-gray-400" href="https://deno.land/manual">Manual</a><a class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 md:inline-block md:font-medium md:text-gray-500 dark:text-gray-200 dark:hover:text-gray-50 dark:hover:bg-gray-900 dark:focus:text-gray-50 dark:focus:bg-gray-900 dark:md:text-gray-400" href="https://deno.com/blog">Blog</a><a class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 md:inline-block md:font-medium md:text-gray-500 dark:text-gray-200 dark:hover:text-gray-50 dark:hover:bg-gray-900 dark:focus:text-gray-50 dark:focus:bg-gray-900 dark:md:text-gray-400" href="/deno/stable">API</a><a class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 md:inline-block md:font-medium md:text-gray-500 dark:text-gray-200 dark:hover:text-gray-50 dark:hover:bg-gray-900 dark:focus:text-gray-50 dark:focus:bg-gray-900 dark:md:text-gray-400" href="https://deno.land/std">Standard Library</a><a class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 md:inline-block md:font-medium md:text-gray-500 dark:text-gray-200 dark:hover:text-gray-50 dark:hover:bg-gray-900 dark:focus:text-gray-50 dark:focus:bg-gray-900 dark:md:text-gray-400" href="https://deno.land/x">Third Party Modules</a></div></nav></header>
      {children}
      <footer class="mt-20 max-w-screen-xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8"><nav class="w-full -mx-5 -my-2 flex flex-wrap justify-center"><div class="p-2"><a class="text-base leading-6 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href="https://deno.land/manual">Manual</a></div><div class="p-2"><a class="text-base leading-6 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href="/deno/stable">API</a></div><div class="p-2"><a class="text-base leading-6 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href="https://deno.land/std">Standard Library</a></div><div class="p-2"><a class="text-base leading-6 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href="https://deno.land/x">Third Party Modules</a></div><div class="p-2"><a class="text-base leading-6 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href="https://deno.land/benchmarks">Benchmarks</a></div><div class="p-2"><a class="text-base leading-6 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href="https://deno.land/artwork">Artwork</a></div><div class="p-2"><a class="text-base leading-6 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href="https://deno.com/blog">Blog</a></div><div class="p-2"><a class="text-base leading-6 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href="https://deno.land/translations">Translations</a></div><div class="p-2"><a class="text-base leading-6 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href="https://status.deno.land/">System Status</a></div><div class="p-2"><a class="text-base leading-6 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href="https://github.com/denoland/deno/wiki#companies-interested-in-deno">Companies interested in Deno</a></div></nav></footer>
    </div>
  );
}

function Info({ graph: graph, module: module }: { graph: string, module: string }) {
  return (
    <div class="bg-gray-900">
      <title>Deno Info {module}</title>
      <h1 class="text-white text-center	text-xl"></h1>
      <pre class="bg-gray-800 w-min text-white mx-auto my-20 min-w-max p-3 rounded-xl">
        <code>
            deno info "{module}"
            <br/>
            <br/>
            {graph}
        </code>
      </pre>
    </div>
  );
}

// This is completely copied from https://doc.deno.land/
function Home() {
  return (
    <main class="bg-gray-900 text-white" style="max-width:640px;margin-left:auto;margin-right:auto;margin-top:2.5rem;padding-left:1rem;padding-right:1rem">
      <title>Deno Info</title>
       <h1 class="tw-niabbs text-4xl">Deno Info</h1>
      <div><form class="relative text-gray-500 focus-within:text-gray-700 dark:focus-within:text-gray-300 sm:col-span-6" action="/info" method="get"><label for="url" class="absolute z-10 ml-4 mt-0.5 px-1.5 tracking-wider bg-white dark:bg-gray-800 text-gray-400 font-medium text-sm transition rounded-t-md">URL to Inspect</label><div class="pt-3 w-full"><div class="relative border border-gray-300 focus-within:border-gray-500 dark:border-gray-600 dark:focus-within:border-gray-400 rounded-xl overflow-hidden transition flex"><input label="URL to Document" class="w-full outline-none px-6 py-4 bg-white dark:bg-gray-800 text-gray-800 focus:text-gray-900 dark:text-gray-100 dark:focus:text-gray-50" required="true" type="url" name="url" id="url" /></div></div><div class="absolute right-2 bottom-2 hidden lg:block"><button class="text-4xl rounded-sm text-white" type="submit">Inspect</button></div></form></div>
      <div class="space-y-6 mt-8"><p><h2 class="text-2xl lg:text-3xl font-bold">Some samples:</h2><ul style="margin-top:0; padding-left: 20px; list-style-type: circle;"><li><a class="tw-wcs43m" href="/https://deno.land/std/fs/mod.ts"><code>https:/&#8203;/&#8203;deno.&#8203;land/&#8203;std/&#8203;fs/&#8203;mod.&#8203;ts</code></a></li><li><a class="tw-wcs43m" href="/https://deno.land/x/oak/mod.ts"><code>https:/&#8203;/&#8203;deno.&#8203;land/&#8203;x/&#8203;oak/&#8203;mod.&#8203;ts</code></a></li><li><a class="tw-wcs43m" href="/https://deno.land/x/redis/mod.ts"><code>https:/&#8203;/&#8203;deno.&#8203;land/&#8203;x/&#8203;redis/&#8203;mod.&#8203;ts</code></a></li><li><a class="tw-wcs43m" href="/https://deno.land/x/amqp/mod.ts"><code>https:/&#8203;/&#8203;deno.&#8203;land/&#8203;x/&#8203;amqp/&#8203;mod.&#8203;ts</code></a></li><li><a class="tw-wcs43m" href="/https://esm.sh/@firebase/firestore"><code>https:/&#8203;/&#8203;esm.&#8203;sh/&#8203;@firebase/&#8203;firestore</code></a></li><li><a class="tw-wcs43m" href="/https://esm.sh/preact"><code>https:/&#8203;/&#8203;esm.&#8203;sh/&#8203;preact</code></a></li><li><a class="tw-wcs43m" href="/https://deno.land/std/archive/tar.ts"><code>https:/&#8203;/&#8203;deno.&#8203;land/&#8203;std/&#8203;archive/&#8203;tar.&#8203;ts</code></a></li><li><a class="tw-wcs43m" href="/https://deno.land/std/node/http.ts"><code>https:/&#8203;/&#8203;deno.&#8203;land/&#8203;std/&#8203;node/&#8203;http.&#8203;ts</code></a></li></ul></p></div><div class="mt-16 space-y-6">
      <h2 class="text-2xl lg:text-3xl font-bold">About</h2><p>The source for this web application is available at <a class="font-bold" href="https://github.com/RoeHH/deno-info" target="_blank" rel="noopener">github.com/RoeHH/deno-info</a>.</p><p>It can also be <a class="transition focus-visible:ring-2 focus-visible:ring-black focus:outline-none my-1 py-2 px-2.5 text-base text-gray-600 dark:text-gray-200 border border-gray-300 rounded-xl hover:shadow h-full" href="https://dash.deno.com/new?url=https://raw.githubusercontent.com/RoeHH/deno-info/master/main.tsx" target="_blank" rel="noopener">Deployed...</a> into its own deployment as well.</p></div>
    </main>  
  )
}

function validURL(str: string) {
  const pattern = new RegExp("^https?:\/\/.*$", "i");
  return pattern.test(str);
}

console.log("Server running on http://localhost:8000");
