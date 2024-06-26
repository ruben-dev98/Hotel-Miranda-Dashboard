import { FaArrowLeft } from "react-icons/fa6";
import { AiFillEdit } from "react-icons/ai";
import { IoTrashBinSharp } from "react-icons/io5";
import { styled } from "styled-components";


export const FaArrowLeftStyled = styled(FaArrowLeft)`
    width: 30px;
    height: 30px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const EditStyled = styled(AiFillEdit)`
    width: 15px;
    height: 15px;
`;

export const DeleteStyled = styled(IoTrashBinSharp)`
    width: 15px;
    height: 15px;
`;

export const IconImgStyled = styled.img`
    display: block;
    margin: 0 auto;
`;

export const ImgRoomPhotoStyled = styled.img`
    width: 200px;
    height: 100px;
`;

export const ImgPersonStyled = styled.img`
    width: 80px;
    height: 80px;
`;