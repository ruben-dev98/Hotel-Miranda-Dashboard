import PropTypes from 'prop-types';
import styled from 'styled-components';

const MessageComponentStyled = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 100%;
    background-color: #FFF;
    border-radius: 20px;
    padding: 0.5rem 2.5rem;
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

const MessageComponent = ({message}) => {
    const timeElipsed = new Date(Math.floor((Date.now() - parseInt(message.date)) / 1000));
    const hours = timeElipsed.getHours();
    const minutes = timeElipsed.getMinutes();
    const seconds = timeElipsed.getSeconds();
    
    const days = timeElipsed.getDay();
    const month = timeElipsed.getMonth();

    return (
        <MessageComponentStyled>
            <p>{message.messages.slice(0, 50).concat('...')}</p>
            <div>
                <img src={message.foto} />
                <p>
                    <span>{message.full_name}</span>
                    <span>{`${days} ${month} ${hours}:${minutes}:${seconds}`}</span>
                </p>
            </div>
        </MessageComponentStyled>
    );
};

MessageComponent.propTypes = {
    message: PropTypes.object
}

export default MessageComponent;