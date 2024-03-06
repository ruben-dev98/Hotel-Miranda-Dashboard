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
            <thead>
                <tr>
                    {columns.map((element, index) => <th key={index}>{element.label}</th>)}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => {
                    return <tr key={index}>
                        {columns.map((column, indx) => {
                            return <td key={indx}>{row[column.property] ? row[column.property]  : column.display(row)}</td>;
                        })}
                    </tr>;
                })}
            </tbody>
        </table>
    );
}

Table.propTypes = {
    rows: PropTypes.array,
    columns: PropTypes.array,
    
};

export default Table;