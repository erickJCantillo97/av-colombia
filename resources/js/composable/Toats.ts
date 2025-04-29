import Swal from 'sweetalert2'


const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  iconColor: 'white',
  customClass: {
    popup: 'colored-toast',
  },
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
})

export const getErrorMessage = (error: string) => {
    Toast.fire({
      icon: 'error',
      title: error,
  })
  }

export const getSuccessMessage = (message: string) => {
    Toast.fire({
      icon: 'success',
      title: message,
    })
  }


