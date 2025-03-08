const formatJsonCode = (value) => {
    try {
        if (!value) {
            return;
        }
        const formattedValue = JSON.stringify(JSON.parse(value), null, 2);
        return formattedValue;
    } catch (error) {
        console.error("Error formatting JSON:", error);
    }
    return value;
};

const compressJsonCode = (value) => {
    try {
        if (!value) {
            return;
        }
        const compressedValue = JSON.stringify(JSON.parse(value));
        return compressedValue;
    } catch (error) {
        console.error("Error compressing JSON:", error);
    }
    return value;
};

const copyCodeToClipboard = (value) => {
    navigator.clipboard.writeText(value).then(() => {
        console.log("Copied to clipboard:", value);
    });
};

const validateJson = (value) => {
    try {
        JSON.parse(value);
        console.log("Valid JSON data.");
        return true;
    } catch (error) {
        console.error("Error validating JSON:", error);
        return false;
    }
};

export { formatJsonCode, compressJsonCode, validateJson, copyCodeToClipboard };
