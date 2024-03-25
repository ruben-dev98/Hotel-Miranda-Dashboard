import styled from "styled-components";

const PacmanStyled = styled.div`
    width: 90px;
    height: 24px;
    padding: 2px 0;
    box-sizing: border-box;
    display: flex;
    animation: l5-0 3s infinite steps(6);
    background: linear-gradient(#000 0 0) 0 0/0% 100% no-repeat,
        radial-gradient(circle 3px, #eeee89 90%, #0000) 0 0/20% 100% #000;
    overflow: hidden;

    &:before {
        content: "";
        width: 20px;
        transform: translate(-100%);
        border-radius: 50%;
        background: #ffff2d;
        animation: l5-1 0.25s 0.153s infinite steps(5) alternate,
        l5-2 3s infinite linear;
    }

    @keyframes l5-1 {
        0% {
        clip-path: polygon(
            50% 50%,
            100% 0,
            100% 0,
            0 0,
            0 100%,
            100% 100%,
            100% 100%
        );
        }
        100% {
        clip-path: polygon(
            50% 50%,
            100% 65%,
            100% 0,
            0 0,
            0 100%,
            100% 100%,
            100% 35%
        );
        }
    }

    @keyframes l5-2 {
        100% {
        transform: translate(90px);
        }
    }
    @keyframes l5-0 {
        100% {
        background-size: 120% 100%, 20% 100%;
        }
    }
`;

const StyledDiv = styled.div`
    width: 100%;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Loading = () => {
    return (
        <StyledDiv>
            <PacmanStyled />
        </StyledDiv>
    );
};

export default Loading;
