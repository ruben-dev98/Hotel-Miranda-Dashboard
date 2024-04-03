import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { getOneEmployee } from '../../features/employees/employeesSlice';
import { getEmployee } from '../../features/employees/employeesAsyncThunk';
import Loading from '../../components/Loading';
import DetailsComponent from '../../components/Details/DetailsComponent';
import { DivDetails, DivDetailsComponents, DivDetailsPart, DivDetailsPartFirst } from '../../styled/DivsStyled';
import { SpanStyled, SpanStyledCheckOut, SpanStyledDetailsLabel, SpanStyledDetailsTitle, SpanStyledDetailsValue } from '../../styled/SpanStyled';

const object__fields = [
    {
        display: field => {
            return (
                <DivDetails>
                    <DivDetailsPartFirst>
                        <SpanStyledDetailsTitle>
                            {field.full_name}
                        </SpanStyledDetailsTitle><br></br>
                        <SpanStyledDetailsLabel>
                            #{field.id}
                        </SpanStyledDetailsLabel>
                        <DivDetailsComponents>
                            <div>
                                <SpanStyledDetailsLabel>Email</SpanStyledDetailsLabel><br></br>
                                <SpanStyledDetailsValue>{field.email}</SpanStyledDetailsValue>
                            </div>
                            <div>
                                <SpanStyledDetailsLabel>Contact</SpanStyledDetailsLabel><br></br>
                                <SpanStyledDetailsValue>{field.contact}</SpanStyledDetailsValue>
                            </div>
                        </DivDetailsComponents>
                        <hr></hr>
                        <DivDetailsComponents>
                            <div>
                                <SpanStyledDetailsLabel>Start Date</SpanStyledDetailsLabel><br></br>
                                <SpanStyledDetailsValue>{field.start_date}</SpanStyledDetailsValue>
                            </div>
                            <div>
                                <SpanStyledDetailsLabel>Status</SpanStyledDetailsLabel><br></br>
                                <SpanStyledDetailsValue>
                                    {field.status ?
                                        <SpanStyled>Active</SpanStyled> :
                                        <SpanStyledCheckOut>Inactive</SpanStyledCheckOut>
                                    }
                                </SpanStyledDetailsValue>
                            </div>
                        </DivDetailsComponents>
                        <DivDetailsComponents>
                            <div>
                                <SpanStyledDetailsLabel>Description</SpanStyledDetailsLabel><br></br>
                                <SpanStyledDetailsLabel>{field.description}</SpanStyledDetailsLabel>
                            </div>
                        </DivDetailsComponents>
                    </DivDetailsPartFirst>
                    <DivDetailsPart>
                        <img src={field.foto} />
                    </DivDetailsPart>
                </DivDetails>
            )
        },
        'type': 'text'
    },
];

const UserPage = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector(getOneEmployee);
    const { id } = useParams();

    const initialFetch = async () => {
        try {
            await dispatch(getEmployee(parseInt(id))).unwrap();
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