export function makeCypressId(...parts) {
    if (!parts) {
        throw new Error(`parts is required parameter but was ${parts}`);
    }
    if (parts.length < 1) {
        throw new Error(`One or more parts are needed but was ${parts}`);
    }
    const sterilizedParts = parts.map(part => isString(part) ? part.replace(/\s/g, "_") : part);
    return `cy-${sterilizedParts.join("-")}`;
}

function isString(value) {
    return typeof value === 'string' || value instanceof String;
}