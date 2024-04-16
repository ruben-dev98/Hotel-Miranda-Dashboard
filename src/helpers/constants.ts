import { FakesUri } from "../entities/Data";

export const TAB_BOOKING_INITIAL_STATE: string = 'All Bookings';
export const TAB_ROOMS_INITIAL_STATE: string = 'All Rooms';
export const TAB_MESSAGE_INITIAL_STATE: string = 'All Contacts';
export const TAB_EMPLOYEE_INITIAL_STATE: string = 'All Employees';

export const ORDER_BOOKING_INITIAL_STATE = 'order_date';
export const ORDER_ROOMS_INITIAL_STATE = 'number asc';
export const ORDER_EMPLOYEE_INITIAL_STATE = 'start_date';

export const ITEMS_PER_PAGE: number = 10;
export const HALF_WAY_ITEMS_PER_PAGE: number = ITEMS_PER_PAGE/2;
export const INITIAL_PAGE: number = 1;
export const NUMBER_ONE: number = 1;

export const METHOD_POST = 'POST';
export const METHOD_PUT = 'PUT';
export const METHOD_DELETE = 'DELETE';

export const OPERATION_GET_ALL = 1;
export const OPERATION_GET_ONE = 2;
export const OPERATION_ADD = 3;
export const OPERATION_EDIT = 4;
export const OPERATION_DELETE = 5;
export const OPERATION_AVAILABLE_ROOMS = 6;

export const PATH_BOOKING = '/bookings';
export const PATH_ROOM = '/rooms';
export const PATH_ROOM_AVAILABLE = `${PATH_ROOM}/?available=true`;
export const PATH_EMPLOYEE = '/employees';
export const PATH_MESSAGE = '/messages';
export const LOGIN_PATH = '/login';
export const ROOM_EXIST_PATH = `${PATH_ROOM}/existRoom`;

export const URI_ROOM: FakesUri = {
    getAll: OPERATION_GET_ALL,
    getOne: OPERATION_GET_ONE,
    edit: OPERATION_EDIT,
    add: OPERATION_ADD,
    getRoomsNumber: OPERATION_AVAILABLE_ROOMS,
    delete: OPERATION_DELETE
};
export const URI_MESSAGE: FakesUri = {
    getAll: OPERATION_GET_ALL,
    getOne: OPERATION_GET_ONE,
    edit: OPERATION_EDIT,
    delete: OPERATION_DELETE
};
export const URI_EMPLOYEE: FakesUri = {
    getAll: OPERATION_GET_ALL,
    getOne: OPERATION_GET_ONE,
    edit: OPERATION_EDIT,
    add: OPERATION_ADD,
    delete: OPERATION_DELETE
};
export const URI_BOOKINGS: FakesUri = {
    getAll: OPERATION_GET_ALL,
    getOne: OPERATION_GET_ONE,
    edit: OPERATION_EDIT,
    add: OPERATION_ADD,
    delete: OPERATION_DELETE
};

export const statusCodeErrorNotFound = 404;
export const statusCodeUnauthorized = 401;
export const statusCodeForbidden = 403;
export const statusCodeInvalidData = 400;

export const statusCodeCreated = 201;
export const statusCodeOk = 200;

export const statusCodeInternalServerError = 500;

export const connectionError = 'Connection error';
export const invalidDataError = 'Input data could have spelling problems or is empty';
export const dataNotFoundError = 'Data could not be found';
export const internalServerError = 'Internal Server Error';
export const unauthorizedError = 'Unauthorized. The request lacks basic authentication';
export const forbiddenError = 'Forbidden. The server understood the request but refused to authorize it.';
export const successMessage = 'Success';
export const loginSuccessful = 'Login Successfully';
export const atLeastThreePhotos = '5 is the max number of urls on Foto input';
export const notMoreThanFivePhotos = 'At least 3 urls on Foto input';
export const roomNumberAlreadyExist = 'Number already exist, choose another room number';
export const roomNotExist = 'The room that you choose not exist';

export const localStorageSetAction = 'set';
export const localStorageGetAction = 'get';

export const localStorageAuthKey = 'auth';
export const localStorageUserKey = 'user';
export const localStorageTokenKey = 'token';
export const isVisibleMenuKey = 'menu';

export const SERVER: string = import.meta.env.VITE_API_BASE;