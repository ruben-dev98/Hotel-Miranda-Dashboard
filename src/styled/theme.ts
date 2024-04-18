import Theme, { createGlobalStyle } from "styled-components";

export interface themeDefault {
    main: string,
    secondary: string,
    secondary_alternative: string,
    text_main: string,
    text_main_alternative: string,
    text_secondary: string,
    in_progress: string,
    text_menu_main: string,
    text_menu_secondary: string,
    check: string,
    button_bg: string,
    email: string,
    bg: string,
    view_notes: string,
    separator: string,
    room_description: string,
    amenities: string,
    label_details: string,
    value_details: string,
    swiper: string,
    swiper_disabled: string,
    hover_kpis: string
}


export const themeLight: themeDefault = {
    main: "#FFF",
    secondary: "#E23428",
    secondary_alternative: "#FFEDEC",
    text_main: "#799283",
    text_main_alternative: "#393939",
    text_secondary: "#787878",
    in_progress: "#FF9C3A",
    text_menu_main: "#262626",
    text_menu_secondary: "#135846",
    check: "#5AD07A",
    button_bg: "#EBF1EF",
    email: "#B2B2B2",
    bg: "#F8F8F8",
    view_notes: "#EEF9F2",
    separator: "#799283",
    room_description: "#000000",
    amenities: "#E8F2EF",
    label_details: "#6E6E6E",
    value_details: "#212121",
    swiper: "#FFFFFF70",
    swiper_disabled: "#FFFFFF1A",
    hover_kpis: "#00000014"
}


export const themeDark: themeDefault = {
    main: "#000",
    secondary: "#E23428",
    secondary_alternative: "#EBF1EF",
    text_main: "#799283",
    text_main_alternative: "#FFEDEC",
    text_secondary: "#F8F8F8",
    in_progress: "#FF9C3A",
    text_menu_main: "#262626",
    text_menu_secondary: "#135846",
    check: "#5AD07A",
    button_bg: "#393939",
    email: "#B2B2B2",
    bg: "#787878",
    view_notes: "#EEF9F2",
    separator: "#799283",
    room_description: "#000000",
    amenities: "#135846",
    label_details: "#AAA",
    value_details: "#EEE",
    swiper: "#FFFFFF70",
    swiper_disabled: "#FFFFFF1A",
    hover_kpis: "#00000014"
}

export const GlobalStyles = createGlobalStyle<{ theme?: typeof Theme }>`
    :root {
        background-color: ${({ theme }) => theme.bg};
        font-family: Poppins;
    }
`;