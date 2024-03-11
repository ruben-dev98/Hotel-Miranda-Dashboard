const reducer = (key, item, action) => {
    switch(action) {
        case 'set':
            localStorage.setItem(key, item);
            return null;
        case 'get':
            return localStorage.getItem(key) ? localStorage.getItem(key) : null;
    }
}

export const useLocalStorage = (key, action, item = null) => {
    return reducer(key, item, action);
}