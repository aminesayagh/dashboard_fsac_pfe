
// @ts-ignore
const COLORS_WHITE = {
    "white_1": "#FFFFFF",
    "white_2": "#F9F9F9",
    "white_3": "#F1F1F1",
    "white_4": "#EDE8E9",
    "white_5": "#CCCCCC",
    "white_6": "#AAAAAA",
    "white_7": "#909090",
    "white_8": "#888888",
    "white_9": "#717171",
    "white_10": "#606060",
}
const COLORS_OTHER = {
    'warring_1': '#',
}
const COLORS_BLACK = {
    "black_1": "#111111",
    "black_2": "#252525",
    "black_3": "#222222",
    "black_4": "#333333",
    "black_5": "#444444",
    "black_6": "#555555",
    "black_7": "#666666",
    "black_8": "#777777",
    "black_9": "#888888",
    "black_10": "#999999",
};
const COLORS_ERROR = {
    "error_1": "#E45851",
    "error_2": "#EA8681",
    "error_3": "#EFA4A1",
    "error_4": "#F5C3C0",
    "error_5": "#fcedec"
};

const COLORS_VALID = {
    "valid_1": "#62CA76",
    "valid_2": "#92CE9D",
    "valid_3": "#ADDAB6",
    "valid_4": "#C9E7CE",
    "valid_5": "#e8f4ea"
};

const COLORS = { ...COLORS_VALID, ...COLORS_ERROR, ...COLORS_BLACK, ...COLORS_WHITE, ...COLORS_OTHER };
const FONT_VAR = '--font-inter';
const STYLE = {FONT_VAR, COLORS};

module.exports = STYLE;