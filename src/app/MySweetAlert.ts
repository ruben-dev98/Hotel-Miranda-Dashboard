
import Swal, { SweetAlertIcon } from 'sweetalert2';
import withReactContent, { ReactElementOr } from 'sweetalert2-react-content';

interface SwalProps {
    title: string,
    html: ReactElementOr<'html'>,
    showConfirmButton?: boolean | true,
    timer?: number | 0,
    icon?: SweetAlertIcon,
    timerProgressBar?: boolean | false
}

const PersonalSwal = withReactContent(Swal);

const MySweetAlert = ({title, html, showConfirmButton, timer, icon, timerProgressBar}: SwalProps) => {
    
    PersonalSwal.fire({
        title: title,
        html: html,
        showConfirmButton: showConfirmButton,
        timer: timer,
        icon: icon,
        timerProgressBar: timerProgressBar,
        width: '500px'
    });
}

export default MySweetAlert;