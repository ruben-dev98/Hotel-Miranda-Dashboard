import { Dispatch } from 'react';
import { accessToLocalStorage } from './accessToLocalStorage';
import { darkTheme, lightTheme, localStorageSetAction, localStorageThemeKey } from './constants';

export const handleToggleTheme = (setThemeState: Dispatch<React.SetStateAction<string>>) => {
    setThemeState((prev) => {
        if(prev === lightTheme) {
            accessToLocalStorage({key: localStorageThemeKey, item: darkTheme, action: localStorageSetAction});
            return darkTheme;
        }
        accessToLocalStorage({key: localStorageThemeKey, item: lightTheme, action: localStorageSetAction});
        return lightTheme;
    })
}