
import { ReactElement } from 'react';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

interface SwalProps {
    title: string,
    html: ReactElement,
    showConfirmButton?: boolean | true,
    timer?: number | 0,
    icon?: SweetAlertIcon,
    timerProgressBar?: boolean | false
}

const PersonalSwal = withReactContent(Swal);

const MySwal = ({title, html, showConfirmButton, timer, icon, timerProgressBar}: SwalProps) => {
    
    PersonalSwal.fire({
        title: title,
        html: html,
        showConfirmButton: showConfirmButton,
        timer: timer,
        icon: icon,
        timerProgressBar: timerProgressBar
    });
}

export default MySwal;