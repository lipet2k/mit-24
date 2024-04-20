

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/buy/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.Dx-8h77q.js","_app/immutable/chunks/scheduler.Bgj30HEV.js","_app/immutable/chunks/index.CtE4SJyA.js"];
export const stylesheets = [];
export const fonts = [];
