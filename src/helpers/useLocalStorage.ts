interface LocalStorageState {
    key: string,
    action: 'set' | 'get',
    item?: string
}

const reducer = ({key, action, item} : LocalStorageState) => {
    switch(action) {
        case 'set':
            localStorage.setItem(key, item || '');
            return null;
        case 'get':
            return localStorage.getItem(key) ? localStorage.getItem(key) : null;
    }
}

export const useLocalStorage = ({key, item, action}: LocalStorageState) => {
    return reducer({key, item, action});
}