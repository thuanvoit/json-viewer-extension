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
        return await chrome.storage.local.get(key);
    } catch (error) {
        console.error("Error getting data:", error);
    }
    return null;
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

            await setChromeLocal({ jvwhistory: historyToSave });
            return historyToSave;
        }
    } catch (error) {
        console.error("Error saving history:", error);
    }
    return null;
};

const getHistory = async () => {
    const result = await getChromeLocal("jvwhistory");
    return result ? result.jvwhistory : [];
};

const deleteHistory = async (id) => {
    try {
        const jvwhistory = await getHistory();
        const newHistory = jvwhistory.filter((i) => i.id !== id);
        await setChromeLocal({ jvwhistory: newHistory });
        return newHistory;
    } catch (error) {
        console.error("Error deleting history:", error);
    }
    return null;
};

const clearHistory = async () => {
    try {
        await setChromeLocal({ jvwhistory: [] });
        return [];
    } catch (error) {
        console.error("Error clearing history:", error);
    }
    return null;
};

export {
    setChromeLocal,
    getChromeLocal,
    saveHistory,
    getHistory,
    deleteHistory,
    clearHistory,
};
