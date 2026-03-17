export function sanitizeCpf(cpf) {
    return String(cpf ?? '').replace(/[^\d]/g, '');
}
export function formatCpf(cpf) {
    const numbers = sanitizeCpf(cpf);
    if (numbers.length !== 11)
        return numbers;
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}
export function isValidCpf(cpf) {
    const numbers = sanitizeCpf(cpf);
    if (numbers.length !== 11)
        return false;
    if (/^(\d)\1{10}$/.test(numbers))
        return false;
    let sum = 0;
    for (let i = 0; i < 9; i += 1) {
        sum += Number(numbers[i]) * (10 - i);
    }
    let remainder = sum % 11;
    const digit1 = remainder < 2 ? 0 : 11 - remainder;
    if (Number(numbers[9]) !== digit1)
        return false;
    sum = 0;
    for (let i = 0; i < 10; i += 1) {
        sum += Number(numbers[i]) * (11 - i);
    }
    remainder = sum % 11;
    const digit2 = remainder < 2 ? 0 : 11 - remainder;
    return Number(numbers[10]) === digit2;
}
export function formatBirthDate(value) {
    const numbers = String(value ?? '').replace(/[^\d]/g, '');
    if (numbers.length === 8) {
        return numbers.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
    }
    return value;
}
export function isValidBirthDate(value) {
    const numbers = String(value ?? '').replace(/[^\d]/g, '');
    if (numbers.length !== 8)
        return false;
    const day = Number(numbers.substring(0, 2));
    const month = Number(numbers.substring(2, 4));
    const year = Number(numbers.substring(4, 8));
    if (day < 1 || day > 31)
        return false;
    if (month < 1 || month > 12)
        return false;
    if (year < 1900 || year > new Date().getFullYear())
        return false;
    return true;
}
