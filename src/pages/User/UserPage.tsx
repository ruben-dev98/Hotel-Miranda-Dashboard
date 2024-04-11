import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getOneEmployee } from '../../features/employees/employeesSlice';
import { getEmployee } from '../../features/employees/employeesAsyncThunk';
import Loading from '../../components/Loading';
import DetailsComponent from '../../components/Details/DetailsComponent';
import { SpanStyled, SpanStyledCheckOut, SpanStyledDetailsLabel, SpanStyledDetailsTitle, SpanStyledDetailsValue } from '../../styled/SpanStyled';
import { useAppDispatch, useAppSelector } from '../../hook/useStore';
import { DivDetails, DivDetailsComponents, DivDetailsPart, DivDetailsPartFirst } from '../../styled/DivStyled';
import { ObjectFields, iEmployee } from '../../entities/Data';

const object__fields: ObjectFields[] = [
    {
        display: field => {
            const employee = field as iEmployee;
            return (
                <DivDetails>
                    <DivDetailsPartFirst>
                        <SpanStyledDetailsTitle>
                            {employee.full_name}
                        </SpanStyledDetailsTitle><br></br>
                        <SpanStyledDetailsLabel>
                            #{employee._id}
                        </SpanStyledDetailsLabel>
                        <DivDetailsComponents>
                            <div>
                                <SpanStyledDetailsLabel>Email</SpanStyledDetailsLabel><br></br>
                                <SpanStyledDetailsValue>{employee.email}</SpanStyledDetailsValue>
                            </div>
                            <div>
                                <SpanStyledDetailsLabel>Contact</SpanStyledDetailsLabel><br></br>
                                <SpanStyledDetailsValue>{employee.contact}</SpanStyledDetailsValue>
                            </div>
                        </DivDetailsComponents>
                        <hr></hr>
                        <DivDetailsComponents>
                            <div>
                                <SpanStyledDetailsLabel>Start Date</SpanStyledDetailsLabel><br></br>
                                <SpanStyledDetailsValue>{employee.start_date}</SpanStyledDetailsValue>
                            </div>
                            <div>
                                <SpanStyledDetailsLabel>Status</SpanStyledDetailsLabel><br></br>
                                <SpanStyledDetailsValue>
                                    {employee.status ?
                                        <SpanStyled>Active</SpanStyled> :
                                        <SpanStyledCheckOut>Inactive</SpanStyledCheckOut>
                                    }
                                </SpanStyledDetailsValue>
                            </div>
                        </DivDetailsComponents>
                        <DivDetailsComponents>
                            <div>
                                <SpanStyledDetailsLabel>Description</SpanStyledDetailsLabel><br></br>
                                <SpanStyledDetailsLabel>{employee.description}</SpanStyledDetailsLabel>
                            </div>
                        </DivDetailsComponents>
                    </DivDetailsPartFirst>
                    <DivDetailsPart>
                        <img src={employee.photo} />
                    </DivDetailsPart>
                </DivDetails>
            )
        },
        'type': 'text'
    },
];

const UserPage = () => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const user = useAppSelector(getOneEmployee);
    const { id } = useParams();

    const initialFetch = async () => {
        try {
            await dispatch(getEmployee(id || '')).unwrap();
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        initialFetch();
    }, [])

    if (isLoading) {
        return (<section className='content'>
            <Loading></Loading>
        </section>)
    }

    return (
        <section className="content">
            <DetailsComponent data={user} object__fields={object__fields}></DetailsComponent>
        </section>
    )
}

export default UserPage;