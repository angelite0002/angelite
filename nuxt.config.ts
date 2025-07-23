// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	devtools: { enabled: true },
	css: ["~/assets/css/main.css"],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	runtimeConfig: {
		public: {
			EMAIL: process.env.EMAIL,
			EMAIL_TOKEN: process.env.EMAIL_TOKEN,
			FEEDBACK_RECIEVER: process.env.FEEDBACK_RECIEVER,
			BACKEND: process.env.BACKEND,
		},
	},
	imports: {
		autoImport: true,
	},
	routeRules: {
		"/": { prerender: true },
		"/feedback": { prerender: true },
		"/gallary": { prerender: true },
		"/blogs": { prerender: true },
		"/about": { prerender: true },
	},
	app: {
		head: {
			meta: [
				{
					name: "content-security-policy",
					content: "default-src: esm.sh/@iconify-json",
				},
			],
			link: [{ rel: "icon", href: "/favicon.ico", type: "image/x-icon" }],
		},
	},
	modules: ["@nuxt/ui", "nuxt-auth-utils"],
});
