export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["assets/voltage-name.svg","assets/voltage.svg","favicon.png"]),
	mimeTypes: {".svg":"image/svg+xml",".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.CcpXyMMN.js","app":"_app/immutable/entry/app.CJ1QZK8r.js","imports":["_app/immutable/entry/start.CcpXyMMN.js","_app/immutable/chunks/entry.Rb_VUK_P.js","_app/immutable/chunks/scheduler.Bgj30HEV.js","_app/immutable/entry/app.CJ1QZK8r.js","_app/immutable/chunks/scheduler.Bgj30HEV.js","_app/immutable/chunks/index.CtE4SJyA.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/buy",
				pattern: /^\/buy\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/poll",
				pattern: /^\/poll\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
