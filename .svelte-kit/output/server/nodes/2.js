import * as server from '../entries/pages/_page.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/2.BAr9ZM0N.js","_app/immutable/chunks/scheduler.Bgj30HEV.js","_app/immutable/chunks/index.CtE4SJyA.js"];
export const stylesheets = ["_app/immutable/assets/2.mecIKdC-.css"];
export const fonts = [];
