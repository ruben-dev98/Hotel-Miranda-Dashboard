const Tabs = ({data}) => {

    return (
        <ul>
            {data.map((str, index) => <li key={index}>{str}</li>)}
        </ul>
    )
};

export default Tabs;