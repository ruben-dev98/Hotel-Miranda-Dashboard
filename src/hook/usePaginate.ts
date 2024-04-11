import { useMemo, useState } from "react"
import { HALF_WAY_ITEMS_PER_PAGE, INITIAL_PAGE, ITEMS_PER_PAGE, NUMBER_ONE } from "../helpers/varHelpers";
import { iBooking, iEmployee, iMessage, iRoom } from "../entities/Data";

const usePaginate = (data: Array<iBooking | iRoom | iMessage | iEmployee>) => {
    const [currentPage, setCurrentPage] = useState<number>(INITIAL_PAGE);
    const items_per_page = ITEMS_PER_PAGE;
    const rest_max_page = data.length%items_per_page;
    const div_max_page = parseInt((data.length/items_per_page).toFixed(0));
    const max_page = rest_max_page === 0 || rest_max_page >= HALF_WAY_ITEMS_PER_PAGE ? div_max_page : div_max_page + NUMBER_ONE;
    const data_per_page = useMemo(() => {
        return data.filter((element, index) => index >= (currentPage - NUMBER_ONE) * items_per_page && index < items_per_page * currentPage);
    }, [currentPage, data, items_per_page]);

    return {data_per_page, currentPage, setCurrentPage, max_page};
}

export default usePaginate;