

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.B0pVctBR.js","_app/immutable/chunks/scheduler.Bgj30HEV.js","_app/immutable/chunks/index.CtE4SJyA.js","_app/immutable/chunks/entry.Rb_VUK_P.js"];
export const stylesheets = [];
export const fonts = [];
