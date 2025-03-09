import { validateJson } from "./codeFormat";

const setChromeLocal = async (data) => {
    try {
        // eslint-disable-next-line no-undef
        return await chrome.storage.local.set(data);
    } catch (error) {
        console.error("Error setting data:", error);
    }
    return null;
};

const getChromeLocal = async (key) => {
    try {
        // eslint-disable-next-line no-undef
        const data = await chrome.storage.local.get(key);
        return data;
    } catch (error) {
        console.error("Error getting data:", error);
    }
    return null;
};

const setStorage = async (data) => {
    // eslint-disable-next-line no-undef
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        // dev code, use local storage
        localStorage.setItem("jvw", JSON.stringify(data));
    } else {
        // production code
        await setChromeLocal({ jvw: JSON.stringify(data) });
    }
};

const getStorage = async () => {
    let data = null;
    // eslint-disable-next-line no-undef
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        // dev code, use local storage
        data = localStorage.getItem("jvw");
    } else {
        // production code
        const result = await getChromeLocal("jvw");
        data = result ? result.jvw : [];
    }
    return JSON.parse(data);
};

const saveHistory = async (jsonValue) => {
    try {
        const jvwhistory = await getHistory();
        console.log("History loaded:", jvwhistory);
        if (jsonValue && validateJson(jsonValue)) {
            const timestamp = new Date().toISOString();

            const newHistory = {
                id: `${crypto.randomUUID()}_${timestamp}`,
                timestamp,
                jsonValue,
            };

            const historyToSave = jvwhistory
                ? [newHistory, ...jvwhistory]
                : [newHistory];

            console.log("History to save:", historyToSave);
            await setStorage({ jvwhistory: historyToSave });
        } else {
            throw new Error("Error saving history");
        }
    } catch (error) {
        throw new Error("Error saving history");
    }
};

const getHistory = async () => {
    const result = await getStorage("jvwhistory");
    return result ? result.jvwhistory : [];
};

const deleteHistory = async (id) => {
    try {
        const jvwhistory = await getHistory();
        const newHistory = jvwhistory.filter((i) => i.id !== id);
        await setStorage({ jvwhistory: newHistory });
        return newHistory;
    } catch (error) {
        console.error("Error deleting history:", error);
    }
    return null;
};

const clearHistory = async () => {
    try {
        await setStorage({ jvwhistory: [] });
        return [];
    } catch (error) {
        console.error("Error clearing history:", error);
    }
    return null;
};

export {
    setStorage,
    getStorage,
    saveHistory,
    getHistory,
    deleteHistory,
    clearHistory,
};
