const KPIs = ({icon, number, text}) => {


    return (
        <>
            {icon}
            <p>{number} / {text}</p>
        </>
    )
}

export default KPIs;