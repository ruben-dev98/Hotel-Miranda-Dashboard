
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { getMessage } from '../features/messages/messagesAsyncThunk';

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
        cursor: pointer;
        height: 100px;
        
        td:not(button), td:not(span) {
            padding: 0.5rem 0.5rem;
        }
    }

    tbody > tr:hover {
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }

    
`;

const TableComponent = ({ rows, columns, path }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                        <tr onClick={() => {
                            if (path !== '') {
                                navigate(`${row.id}`)
                            } else {
                                const showMessage = () => {
                                    dispatch(getMessage(row.id)).then((result) => {
                                        Swal.fire({
                                            title: 'Details Message',
                                            html: `
                                                <p><strong>Full Name: </strong> ${result.payload.full_name}</p>
                                                <p><strong>Subject: </strong>  ${result.payload.subject}</p>
                                                <p><strong>Message: </strong> ${result.payload.messages}</p>
                                            `
                                        });
                                    }).catch(error => {
                                        console.log(error)
                                    });
                                }
                                showMessage();
                            }
                        }} key={index}>
                            {columns.map((column, indx) => {
                                return <td key={indx}>{!column.display ? row[column.property] : column.display(row)}</td>;
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