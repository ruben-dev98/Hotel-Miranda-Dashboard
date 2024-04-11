import { ReactNode } from "react";
import { WindowStyled } from "../../styled/DivStyled";

interface WindowProps {
    children: ReactNode,
    visibleLateral: boolean
}

const WindowStyledComponent = ({children, visibleLateral}: WindowProps) => {

    return (
        <WindowStyled $visibleLateral = {visibleLateral}>
            {children}
        </WindowStyled>
    )
}

export default WindowStyledComponent;