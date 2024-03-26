//import { WindowStyled } from "../../styled/DivsStyled"
import { PropTypes } from 'prop-types';

const WindowStyledComponent = ({children, visibleLateral}) => {

    return (
        {/*<WindowStyled $visibleLateral = {visibleLateral}>
        </WindowStyled>*/}
    )
}

WindowStyledComponent.propTypes = {
    children: PropTypes.node,
    visibleLateral: PropTypes.bool
};

export default WindowStyledComponent;