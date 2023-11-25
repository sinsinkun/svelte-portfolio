import { writable, derived } from "svelte/store";
import type { Writable } from "svelte/store";

// custom media query handler
export const winW: Writable<number> = writable(0);
export const winH: Writable<number> = writable(0);

// mouse tracker
export const mouseCoords: Writable<Coordinates2D> = writable({ x:0, y:0 });

// standardized breakpoints
export const viewType = derived(winW, $w => {
  if ($w <= 600) return "xs";
    else if ($w <= 900) return "sm";
    else if ($w <= 1200) return "md";
    else if ($w <= 1600) return "lg";
    else return "xl";
});
