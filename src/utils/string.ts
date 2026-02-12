const capitalizeFirstLetter = (str: string): string => {
    return str[0].toUpperCase() + str.slice(1)
}

// TODO: Rename this function or maybe even split it and fix all the points where this function is being used
export const deSlufigy = (str: string): string => {
    return str.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

export const formatStudentName = (name: string): string => {
    return name.toLowerCase().split(" ").map(word => capitalizeFirstLetter(word)).join(" ");
}

export const getRollNumberFromEmail = (email: string): string => {
    if (!email) return '';
    
    return email.split('@')[0];
}
