import styled from 'styled-components';
import MySweetAlert from '../app/MySweetAlert';
import { HandleClickProps, iMessage } from '../entities/Data';
import { ReactNode } from 'react';
import { FaRegCheckCircle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { useAppDispatch } from '../hook/useStore';
import { editMessage } from '../features/messages/messagesAsyncThunk';
import { StyledP } from '../styled/SpanStyled';

const IconStyled = styled.button`
    cursor: pointer;
    border: 0px;
    background-color : transparent;

    svg {
        width: 24px;
        height: 24px;
    }
`;

const IconCheckStyled = styled(IconStyled)`
    svg {
        fill: ${props => props.theme && props.theme.check};
    }

    path {
        fill: ${props => props.theme && props.theme.check};
    }
`

const IconCrossStyled = styled(IconStyled)`
    svg {
        fill: ${props => props.theme && props.theme.secondary};
    }
    
    path {
        fill: ${props => props.theme && props.theme.secondary};
    }
`

const MessageComponentStyled = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 100%;
    background-color: ${props => props.theme && props.theme.main};
    border-radius: 20px;
    padding: 0.5rem 2.5rem;

    &:hover {
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }

    div {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 32px;

        img {
            width: 50px;
            height: 50px;
        }

        span {
            display: block;

            :not(:last-child) {
                margin: 12px;
            }
        }
    }
`;

const SpanStyled = styled.span`
    font-size: 1rem;
    color: ${props => props.theme && props.theme.text_main_alternative};
`;

const SpanStyledHour = styled(SpanStyled)`
    font-size: 0.8em;
    color: ${props => props.theme && props.theme.separator};
`;

interface MessageProps {
    message: iMessage,
    children?: ReactNode
}

const MessageComponent = ({ message }: MessageProps) => {

    const dispatch = useAppDispatch();

    const showMessage = (message: iMessage) => {
        const title = 'Info Message';
        const html = (<p>
            <strong>Message:</strong> {message.messages}
        </p>
        );
        MySweetAlert({ title: title, html: html, showConfirmButton: false });
    }

    const handleEditAsRead = ({event, dispatch, id}: HandleClickProps) => {
        dispatch(editMessage({ id: id, data: { read: true } as iMessage }));
    }

    const handleEditAsNotRead = ({event, dispatch, id}: HandleClickProps) => {
        dispatch(editMessage({ id: id, data: { read: false } as iMessage }));
    }

    return (
        <MessageComponentStyled>
            <StyledP onClick={() => showMessage(message)}>
                {message.messages.slice(0, 50).concat('...')}
            </StyledP>
            <div>
                <img src={message.photo} />
                <p>
                    <SpanStyled>{message.full_name}</SpanStyled>
                    <SpanStyledHour>{message.time_passed}</SpanStyledHour>
                </p>
                <div>
                    <IconCheckStyled  onClick={(event) => handleEditAsRead({event, dispatch, id: message._id || ''})}>
                        <FaRegCheckCircle />
                    </IconCheckStyled>
                    <IconCrossStyled onClick={(event) => handleEditAsNotRead({event, dispatch, id: message._id || ''})}>
                        <RxCrossCircled />
                    </IconCrossStyled>
                </div>
            </div>

        </MessageComponentStyled>
    );
};

export default MessageComponent;