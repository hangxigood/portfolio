export function getBasePath() {
    // Check if we're in production and on GitHub Pages
    return process.env.NODE_ENV === 'production' ? '/portfolio' : '';
}

export function getImagePath(path: string) {
    return `${getBasePath()}${path}`;
}
