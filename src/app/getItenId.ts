import { ArrayIData } from "../entitys/Data";

export const lastId = (aData: ArrayIData) => {
    const newId = aData.data !== null && aData.data[aData.data.length - 1].id + 1;
    return newId;
};