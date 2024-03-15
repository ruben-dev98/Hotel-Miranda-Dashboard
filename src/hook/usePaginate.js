import { useMemo, useState } from "react"
<<<<<<< Updated upstream
=======
import { HALF_WAY_ITEMS_PER_PAGE, INITIAL_PAGE, ITEMS_PER_PAGE, NUMBER_ONE } from "../helpers/varHelpers";
>>>>>>> Stashed changes

const usePaginate = (data) => {
    const [currentPage, setCurrentPage] = useState(1);
    const items_per_page = 10;
    const rest_max_page = parseInt(data.length%items_per_page);
    const div_max_page = parseInt((data.length/items_per_page).toFixed(0));
    const max_page = rest_max_page === 0 || rest_max_page >= 5 ? div_max_page : div_max_page + 1;
    const data_per_page = useMemo(() => {
        return data.filter((element, index) => index >= (currentPage - 1) * items_per_page && index < items_per_page * currentPage);
    }, [currentPage, data]);

    return {data_per_page, currentPage, setCurrentPage, max_page};
}

export default usePaginate;