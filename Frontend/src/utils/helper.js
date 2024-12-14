export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email.trim());
}

export const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{6,}$/;
    return regex.test(password.trim());
}

export const validateName = (name) => {
    const regex = /^[a-zA-Z\s]{3,}$/;
    return regex.test(name.trim());
}

export const getInitials = (name) => {
    if(!name) return "";

    const initials = name.split(" ");
    if(initials.length > 1){
        return initials[0][0].toUpperCase() + initials[initials.length-1][0].toUpperCase();
    } else {
        return initials[0][0].toUpperCase();    
    }
}