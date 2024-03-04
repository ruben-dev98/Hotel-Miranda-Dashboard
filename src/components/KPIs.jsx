import styles from './KPI.module.css'


const KPIs = ({icon, number, text}) => {

    return (
        <div className={styles.div}>
            {icon}
            <p>{number} / {text}</p>
        </div>
    )
}

export default KPIs;