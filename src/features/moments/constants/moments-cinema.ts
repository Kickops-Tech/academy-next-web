/** Matches Tailwind `md` — cinema only from this width up. */
export const CINEMA_MQ = "(min-width: 768px)";
export const CINEMA_ASPECT = 16 / 9;
export const CINEMA_PERSPECTIVE_PX = 1200;
export const CINEMA_SNAP_MS = 850;
export const CINEMA_DRAG_GAIN = 0.19;
export const CINEMA_WHEEL_GAIN = 0.14;
export const CINEMA_WHEEL_SNAP_MS = 90;
export const CINEMA_COAST = 120;
export const CINEMA_VISIBLE_ARC_DEG = 100;
/** Center frame can outgrow the stage; leftovers fade at the sides. */
export const CINEMA_MAX_CENTER_VW = 0.62;
/** Photos never eat the whole leftover, so arrows stay off the fold edge. */
export const CINEMA_MAX_LEFTOVER = 0.7;
/** Pointer travel below this is a tap that opens the lightbox. */
export const CINEMA_CLICK_PX = 8;
