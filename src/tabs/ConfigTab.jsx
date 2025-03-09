import { useContext } from "react";
import EditorViewerContext from "./contexts/EditorViewerContext";
import { vscodeTheme } from "@uiw/react-json-view/vscode";
import JsonView from "@uiw/react-json-view";
import { Alert, Box } from "@mui/material";
import { globalUIConfig as UI } from "../constants";

const ConfigTab = () => {
    const { jsonValue, isJsonValid } = useContext(EditorViewerContext);

    return (
        <Box sx={{ pt: 0, overflow: "auto", height: UI.maxViewerHeight }}>
            {isJsonValid ? (
                <JsonView value={JSON.parse(jsonValue)} style={vscodeTheme} />
            ) : (
                <Alert severity="warning">
                    Invalid JSON data. Modify the JSON data on the Editor tab.
                </Alert>
            )}
        </Box>
    );
};

export default ConfigTab;
