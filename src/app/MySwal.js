
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const PersonalSwal = withReactContent(Swal);

const MySwal = (title, html, showConfirmButton = true, timer = 0, icon = '', timerProgressBar = false) => {
    
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