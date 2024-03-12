export const lastId = (data) => {
    const newId = data[data.length - 1].id + 1;
    return newId;
};