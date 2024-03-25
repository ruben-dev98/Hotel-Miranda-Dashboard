const getAllData = (data) => data;
const getOneData = (data, id) => data.find((items) => items.id === id);
const addData = (data) => data;
const editData = (id, data) => ({id: id, data: data});
const deleteData = (id) => id;

export const dataAvailableRoomsNumber = (data) => data.filter(room => room.status === 'Available').map(room => room.number).sort((a, b) => {
    if (a > b) {
        return 1;
    } else if (a < b) {
        return -1;
    } else {
        return 0;
    }
})

export const delay = (time = 200) => {
    return new Promise((r) => {
        setTimeout(r, time)
    });
}

export const FakeApi = (path, uri, id = 0, data = null, aData = null) => {
    return new Promise((resolve, reject) => {
        switch (path) {
            case uri.getAll:
                resolve(getAllData(aData));
                break;
            case uri.getOne:
                resolve(getOneData(aData, id));
                break;
            case uri.add:
                resolve(addData(data));
                break;
            case uri.edit:
                resolve(editData(id, data));
                break;
            case uri.delete:
                resolve(deleteData(id));
                break;
            case uri.getRoomsNumber:
                resolve(dataAvailableRoomsNumber(aData));
                break;
            default:
                reject('Array not found');
                break;
        }
    });
}