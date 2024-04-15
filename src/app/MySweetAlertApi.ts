
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { ReactElementOr } from 'sweetalert2-react-content';

interface SwalProps {
    title: string,
    html?: string | '',
    showConfirmButton?: boolean | true,
    timer?: number | 200,
    icon?: SweetAlertIcon,
    timerProgressBar?: boolean | true
}

const MySweetAlertApi = ({title, html, showConfirmButton, timer, icon, timerProgressBar}: SwalProps) => {
    
    Swal.fire({
        title: title,
        html: html,
        showConfirmButton: showConfirmButton,
        timer: timer,
        icon: icon,
        timerProgressBar: timerProgressBar,
        toast: true,
        position: icon && icon === 'error' ? 'bottom-end' : 'top-end' 
    });
}

export default MySweetAlertApi;