// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	// for navbar options
	interface NavOption {
		url: string,
		title: string,
		active: boolean,
	}

	interface Coordinates2D {
		x: number,
		y: number
	}

	interface ScreenData {
		w: number,
		h: number,
		breakpoint: "xs" | "sm" | "md" | "lg" | "xl"
	}
}

export {};
