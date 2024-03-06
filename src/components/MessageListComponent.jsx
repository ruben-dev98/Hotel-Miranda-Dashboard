import MessageComponent from "./MessageComponent";

const MessageListComponent = () => {
    const messages = [];

    return (
        <>
            {messages.map((message, index) => <MessageComponent key={index}></MessageComponent>)}
        </>
    );
}

export default MessageListComponent;