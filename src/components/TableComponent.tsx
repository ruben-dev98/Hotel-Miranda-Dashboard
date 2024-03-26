import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getMessage } from '../features/messages/messagesAsyncThunk';
import usePaginate from './../hook/usePaginate';
import { SpanStyledTableFirst } from '../styled/SpanStyled';
import MySwal from '../app/MySwal';
import { INITIAL_PAGE } from '../helpers/varHelpers';
import { iBooking, iMessage, iEmployee, iRoom } from '../entitys/Data';
import { useAppDispatch } from '../hook/useStore';
import { ButtonStyled } from '../styled/ButtonStyled';

interface TableProps {
    rows: iBooking[] | iMessage[] | iRoom[] | iEmployee[],
    columns: ,
    path : string
}

const TableStyled = styled.table`
    width: 100%;
    padding: 2rem;
    border-radius: 20px;
    background-color: #FFF;

    thead > tr {
        height: 50px;

        th {
            padding: 0rem 0.5rem 0.5rem 0.5rem;
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


const TableComponent = ({ rows, columns, path }: TableProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {data_per_page, currentPage, setCurrentPage, max_page} = usePaginate(rows);

    return (
        <>
            <TableStyled>
                <thead>
                    <tr>
                        {columns.map((element, index) => <th key={index}>{element.label}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data_per_page.map((row, index) => {
                        return (
                            <tr onClick={() => {
                                if (path !== '') {
                                    navigate(`${row.id}`)
                                } else {
                                    const showMessage = () => {
                                        dispatch(getMessage(row.id)).then((result) => {
                                        const title = 'Details Message';
                                        const htmlCode = (<>
                                            <p><strong>Full Name: </strong> ${result.payload.full_name}</p>
                                            <p><strong>Subject: </strong>  ${result.payload.subject}</p>
                                            <p><strong>Message: </strong> ${result.payload.messages}</p>
                                            </>);
                                        return MySwal({title, html: htmlCode, showConfirmButton: false});
                                        }).catch(error => {
                                            console.log(error)
                                        });
                                    }
                                    showMessage();
                                }
                            }} key={index}>
                                {columns.map((column, indx) => {
                                    return <td key={indx}>{!column.display ? <SpanStyledTableFirst>{row[column.property]}</SpanStyledTableFirst> : column.display(row)}</td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </TableStyled>
            <ButtonStyled style={{marginRight: 20}} disabled={currentPage === INITIAL_PAGE ? true : false} onClick={() => setCurrentPage((prev) => --prev)}>Prev</ButtonStyled>
            <ButtonStyled disabled={currentPage === max_page ? true : false} onClick={() => setCurrentPage((prev) => ++prev)}>Next</ButtonStyled>

        </>
    );
}

export default TableComponent;