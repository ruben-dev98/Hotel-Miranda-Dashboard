import Message from "./Message";

const MessageList = () => {
    const messages = [];

    return (
        <>
            {messages.map((message, index) => <Message key={index}></Message>)}
        </>
    );
}

export default MessageList;