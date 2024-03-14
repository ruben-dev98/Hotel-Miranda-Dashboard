import PropTypes from 'prop-types';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import MySwal from '../app/MySwal';

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

const MessageComponent = ({message}) => {

    return (
        <MessageComponentStyled>
            <p style={{cursor: 'pointer'}} onClick={() => {
                const title = 'Info Message';
                const html = `<p><strong>Message:</strong> ${message.messages}</p>`;
                return MySwal(title, html, false);
            }}>{message.messages.slice(0, 50).concat('...')}</p>
            <div>
                <img src={message.foto} />
                <p>
                    <SpanStyled>{message.full_name}</SpanStyled>
                    <SpanStyledHour>{message.time_passed}</SpanStyledHour>
                </p>
            </div>
        </MessageComponentStyled>
    );
};

MessageComponent.propTypes = {
    message: PropTypes.object
}

export default MessageComponent;