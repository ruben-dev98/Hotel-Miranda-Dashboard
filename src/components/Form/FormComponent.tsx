import FormControlComponent from "./FormControlComponent";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftStyled } from "../../styled/IconStyled";
import { FormStyledComponent } from "../../styled/FormStyled";
import { ButtonStyled } from "../../styled/ButtonStyled";
import { iBooking, iEmployee, iRoom } from "../../entitys/Data";
import { FormControlProps } from "../../pages/Room/RoomFormPage";

interface FormProps {
    formControl: FormControlProps[],
    data: iRoom | iBooking | iEmployee,
    onHandleSubmit: React.FormEventHandler<HTMLFormElement>,
}

const FormComponent = ({ formControl, data, onHandleSubmit} : FormProps) => {
    const nav = useNavigate();

    return (
        <>
            <ButtonStyled onClick={() => nav(-1)}>
                <FaArrowLeftStyled />
            </ButtonStyled>
            <FormStyledComponent onSubmit={onHandleSubmit}>
                {
                    formControl.map((control, index) =>
                        <FormControlComponent key={index}
                            label={control.label}
                            inputType={control.input}
                            name={control.name}
                            data={control.data} values={data}></FormControlComponent>)
                }
                <div>
                    <ButtonStyled type="submit">Create</ButtonStyled>
                </div>
            </FormStyledComponent>
        </>
    );
}

export default FormComponent;