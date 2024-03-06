import PropTypes from 'prop-types';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const TableStyled = styled.table`
    background-color: #FFF;
    tbody > tr {
        cursor: pointer;
        height: 120px;
    }
`;

const TableComponent = ({rows, columns, path}) => {
    const navigate = useNavigate();

    return (
        <TableStyled>
            <thead>
                <tr>
                    {columns.map((element, index) => <th key={index}>{element.label}</th>)}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => {
                    return (
                        <tr onClick={(event) => {
                            event.stopPropagation();
                            navigate(`${path}/${row.id}`);
                        }} key={index}>
                        
                            {columns.map((column, indx) => {
                            return <td key={indx}>{row[column.property] ? row[column.property]  : column.display(row)}</td>;
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </TableStyled>
    );
}

TableComponent.propTypes = {
    rows: PropTypes.array,
    columns: PropTypes.array,
    path: PropTypes.string
    
};

export default TableComponent;