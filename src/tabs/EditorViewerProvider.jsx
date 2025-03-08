import React, { useEffect, useState } from "react";
import EditorViewerContext from "./EditorViewerContext";
import { validateJson } from "../utils/codeFormat";

function EditorViewerProvider(props) {
    const [jsonValue, setJsonValue] = useState("");
    const [isJsonValid, setIsJsonValid] = useState(true);

    useEffect(() => {
        setIsJsonValid(validateJson(jsonValue));
    }, [jsonValue]);

    const contextValue = {
        jsonValue,
        setJsonValue,
        isJsonValid,
    };

    return (
        <EditorViewerContext.Provider value={contextValue}>
            {props.children}
        </EditorViewerContext.Provider>
    );
}

export default EditorViewerProvider;
