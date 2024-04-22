interface LocalStorageState {
    key: string,
    action: 'set' | 'get',
    item?: string
}

const workWithLocalStorage = ({key, action, item} : LocalStorageState) => {
    switch(action) {
        case 'set':
            localStorage.setItem(key, item || '');
            return null;
        case 'get':
            return localStorage.getItem(key) ? localStorage.getItem(key) : null;
    }
}

export const accessToLocalStorage = ({key, item, action}: LocalStorageState) => {
    return workWithLocalStorage({key, item, action});
}