import {FETCH_USER_INFO_START, TOGGLE_COLLAPSED_NAV, WINDOW_WIDTH} from "../../constants/ActionTypes";
import {LAYOUT_TYPE, NAV_STYLE, THEME_COLOR_SELECTION, THEME_TYPE} from "../../constants/ThemeSetting";


export function toggleCollapsedSideNav(navCollapsed) {
  return {type: TOGGLE_COLLAPSED_NAV, navCollapsed};
}

export function updateWindowWidth(width) {
  return {type: WINDOW_WIDTH, width};
}

export function setThemeType(themeType) {
  return {type: THEME_TYPE, themeType};
}

export function setThemeColorSelection(colorSelection) {
  return {type: THEME_COLOR_SELECTION, colorSelection};
}

export function onNavStyleChange(navStyle) {
  return {type: NAV_STYLE, navStyle};
}

export function onLayoutTypeChange(layoutType) {
  return {type: LAYOUT_TYPE, layoutType};
}

export function switchLanguage(locale) {
  console.log("switchLanguage", locale)
  return (dispatch) =>
    dispatch({type: FETCH_USER_INFO_START, payload: locale})

}
