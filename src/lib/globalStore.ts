import { writable } from "svelte/store";

export const title = writable("Web Portfolio");
export const resetTitle = () => title.set("Web Portfolio");