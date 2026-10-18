// Keep pin proportions consistent between the editor canvas and dashboard previews.
export const BOARD_RATIO = 3 / 2;
// Clamp a number between a min and max
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

// Background board colors
export const BACKGROUNDS = {
    "#ffffff": "White",
    "#000000": "Black",
    "#858585": "Light Gray",
};
