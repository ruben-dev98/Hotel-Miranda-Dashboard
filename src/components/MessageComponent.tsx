import styled from 'styled-components';
import MySweetAlert from '../app/MySweetAlert';
import { iMessage } from '../entities/Data';
import { ReactNode } from 'react';

const MessageComponentStyled = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 100%;
    background-color: #FFF;
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
    color: #393939;
`;

const SpanStyledHour= styled(SpanStyled)`
    font-size: 0.8em;
    color: #799283;
`;

interface MessageProps {
    message: iMessage,
    childrem?: ReactNode
}

const MessageComponent = ({message}: MessageProps) => {

    return (
        <MessageComponentStyled>
            <p style={{cursor: 'pointer'}} onClick={() => {
                const title = 'Info Message';
                const html = (<p>
                        <strong>Message:</strong> {message.messages}
                    </p>
                    );
                return MySweetAlert({title: title, html: html, showConfirmButton: false});
            }}>{message.messages.slice(0, 50).concat('...')}</p>
            <div>
                <img src={message.photo} />
                <p>
                    <SpanStyled>{message.full_name}</SpanStyled>
                    <SpanStyledHour>{message.time_passed}</SpanStyledHour>
                </p>
            </div>
        </MessageComponentStyled>
    );
};

export default MessageComponent;