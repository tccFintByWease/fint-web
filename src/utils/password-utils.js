import faEye from './../assets/images//eye-solid.png';
import faEyeSlash from './../assets/images/eye-slash-solid.png';

let passwordVisibility = false;

const handlePasswordVisibility = (event) => {
    const password = document.querySelector('#password');
    const passwordConfirmation = document.querySelector('#passwordConfirmation');

    const passwordButton = document.querySelector('#passwordButton');
    const passwordConfirmationButton = document.querySelector('#passwordConfirmationButton');
    const button = event.target;

    if (!passwordVisibility) {
        if (button === passwordButton) {
            password.type = 'text';
        } else if (button === passwordConfirmationButton) {
            passwordConfirmation.type = 'text';
        }

        button.src = faEyeSlash;
        passwordVisibility = true;
    } else if (passwordVisibility === true) {
        if (button === passwordButton) {
            password.type = 'password';
        } else if (button === passwordConfirmationButton) {
            passwordConfirmation.type = 'password';
        }

        button.src = faEye;
        passwordVisibility = false;
    }
}

export {
    handlePasswordVisibility
}