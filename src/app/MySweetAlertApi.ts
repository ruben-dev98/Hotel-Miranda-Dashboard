
import Swal, { SweetAlertIcon } from 'sweetalert2';

interface SwalProps {
    title: string,
    html?: string | '',
    showConfirmButton?: boolean | true,
    icon?: SweetAlertIcon
}

const MySweetAlertApi = ({title, html, showConfirmButton, icon}: SwalProps) => {
    
    Swal.fire({
        title: title,
        html: html,
        showConfirmButton: showConfirmButton,
        timer: 1500,
        icon: icon,
        timerProgressBar: true,
        toast: true,
        position: icon && icon === 'error' ? 'bottom-end' : 'top-end'
    });
}

export default MySweetAlertApi;