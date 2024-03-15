import { useMemo, useState } from "react"
<<<<<<< HEAD
<<<<<<< Updated upstream
=======
import { HALF_WAY_ITEMS_PER_PAGE, INITIAL_PAGE, ITEMS_PER_PAGE, NUMBER_ONE } from "../helpers/varHelpers";
>>>>>>> Stashed changes
=======
import { HALF_WAY_ITEMS_PER_PAGE, INITIAL_PAGE, ITEMS_PER_PAGE, NUMBER_ONE } from "../helpers/var_helpers";
>>>>>>> 3f7fe66a24d1fc1542bc0893d1d84afaa8ce123c

const usePaginate = (data) => {
    const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
    const items_per_page = ITEMS_PER_PAGE;
    const rest_max_page = parseInt(data.length%items_per_page);
    const div_max_page = parseInt((data.length/items_per_page).toFixed(0));
    const max_page = rest_max_page === 0 || rest_max_page >= HALF_WAY_ITEMS_PER_PAGE ? div_max_page : div_max_page + NUMBER_ONE;
    const data_per_page = useMemo(() => {
        return data.filter((element, index) => index >= (currentPage - NUMBER_ONE) * items_per_page && index < items_per_page * currentPage);
    }, [currentPage, data, items_per_page]);

    return {data_per_page, currentPage, setCurrentPage, max_page};
}

export default usePaginate;