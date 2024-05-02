export function scrollToBottom() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth" // Para un desplazamiento suave
    });
}

export function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // Para un desplazamiento suave
    });
}

