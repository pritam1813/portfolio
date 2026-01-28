/// <reference types="vite/client" />
/// <reference types="vite-imagetools" />

// vite-imagetools specific imports - declare modules for imagetools query params
declare module '*&format=webp' {
    const src: string;
    export default src;
}

declare module '*&quality=80' {
    const src: string;
    export default src;
}

declare module '*?w=800&format=webp&quality=80' {
    const src: string;
    export default src;
}

