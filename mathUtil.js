// Named exports
export function add(a, b) {
    return Number(a) + Number(b);
}

export function multiply(a, b) {
    return Number(a) * Number(b);
}

// Default export
export default function greet(name = "Student") {
    return `Hello, ${name}! Welcome to the Student Portal.`;
}
