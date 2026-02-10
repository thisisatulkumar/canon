export const deSlufigy = (str: string): string => {
    return str.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

export const capitalizeFirstLetter = (str: string): string => {
    return str[0].toUpperCase() + str.slice(1)
}
