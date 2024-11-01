import Swal from 'sweetalert2'


const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    iconColor: 'white',
    customClass: {
        popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
})

export function alerts() {
    const toast = (icon, title) => {
        Toast.fire({
            icon: icon,
            title: title,
        })
    }

    return {
        toast,
    }
}
