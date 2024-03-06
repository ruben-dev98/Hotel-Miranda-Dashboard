import PropTypes from 'prop-types';

const TableComponent = ({rows, columns}) => {
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

TableComponent.propTypes = {
    rows: PropTypes.array,
    columns: PropTypes.array,
    
};

export default TableComponent;