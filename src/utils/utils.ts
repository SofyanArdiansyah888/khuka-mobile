import Swal from "sweetalert2";

export function handleErrorResponse(err: any){
    if (err.response?.data?.errors) {
        const validationErrors = Object.values(err.response.data.errors).flat() as string[];
        Swal.fire({
            icon: 'error',
            html: `<ul style="text-align: left; ">${validationErrors
                .map(error => `<li style="color:red">${error}</li>`)
                .join('')}</ul>`,
        });
    } else if (err.response?.data?.message) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.response.data.message,
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Unexpected Error',
            text: 'An unexpected error occurred. Please try again.',
        });
    }
}