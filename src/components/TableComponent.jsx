import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const TableStyled = styled.table`
    padding: 2rem;
    border-radius: 20px;
    background-color: #FFF;

    thead > tr {
        height: 50px;
        th {
            padding: 0.5rem;
        }
    }

    tbody > tr {
        cursor: ${(props) =>  props.$path === '' ? 'default' : 'pointer'};
        height: 100px;
        
        td:not(button), td:not(span) {
            padding: 0.5rem 0.5rem;
        }
    }

    tbody > tr:hover {
        box-shadow: 5px 5px 5px 5px #393939;
    }

    
`;

const TableComponent = ({rows, columns, path}) => {
    const navigate = useNavigate();

    return (
        <TableStyled $path={path}>
            <thead>
                <tr>
                    {columns.map((element, index) => <th key={index}>{element.label}</th>)}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => {
                    return (
                        <tr onClick={(event) => {
                            if(path !== '') {
                                return navigate(`${row.id}`)
                            }
                                return '';
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