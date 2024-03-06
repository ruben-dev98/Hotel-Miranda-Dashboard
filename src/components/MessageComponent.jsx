import PropTypes from 'prop-types';
import styled from 'styled-components';

const MessageComponentStyled = styled.div`
    height: 100%;
    background-color: #FFF;
    border-radius: 20px;
    padding: 0.5rem 2.5rem;
    div {
        display: flex;
        justify-content: space-evenly;
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
                <p> 
                    {message.full_name}
                    <br/>
                    {new Date(parseInt(message.date)).toLocaleString('es-Es')}
                    <br/>
                    {`${days} ${month} ${hours}:${minutes}:${seconds}`}
                </p>
                <p>
                    Hora Actual
                    <br/>
                    {Date.now()}
                </p>
            </div>
        </MessageComponentStyled>
    );
};

MessageComponent.propTypes = {
    message: PropTypes.object
}

export default MessageComponent;