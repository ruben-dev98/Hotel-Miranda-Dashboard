import PropTypes from 'prop-types';

const Table = ({rows, columns}) => {
    /*const a = [
        {
            "label": "Guest",
            "property": row.fullname
        }
    ];*/

    return (
        <table>
            {columns.map((element, index) => <th key={index}>{element.label}</th>)}
            {rows.map((row, index) => {
                return <tr key={index}>
                    {columns.map((column, indx) => {
                        return <td key={indx}>{row[column.property]}</td>;
                    })}
                </tr>;
            })}
        </table>
    );
}

Table.propTypes = {
    rows: PropTypes.array,
    columns: PropTypes.array,
    
};

export default Table;