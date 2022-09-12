function handlePasswordVisibility(event) {
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
        setPasswordVisibility(true);
    } else {
        if (button === passwordButton) {
            password.type = 'password';
        } else if (button === passwordConfirmationButton) {
            passwordConfirmation.type = 'password';
        }

        button.src = faEye;
        setPasswordVisibility(false);
    }
}

export {
    handlePasswordVisibility
}