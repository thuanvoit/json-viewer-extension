import { useContext, useState } from "react";
import EditorViewerContext from "./EditorViewerContext";
import { json } from "@codemirror/lang-json";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import {
    Button,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Stack,
} from "@mui/material";
import {
    AutoFixHigh,
    Clear,
    Compress,
    ContentCopy,
    MoreVert,
    Save,
} from "@mui/icons-material";

import { globalUIConfig as UI } from "../constants";
import {
    compressJsonCode,
    copyCodeToClipboard,
    formatJsonCode,
} from "../utils/codeFormat";
import { toast } from "react-toastify";
import { saveHistory } from "../utils/chromeStorage";
import HandleDialog from "./DialogHandler";

const EditorTab = () => {
    const { jsonValue, setJsonValue } = useContext(EditorViewerContext);
    const [anchorEl, setAnchorEl] = useState(null);

    const [clearDialogOpen, setClearDialogOpen] = useState(false);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onChange = (newValue) => {
        setJsonValue(newValue);
    };

    const handleFormat = () => {
        setJsonValue((prev) => {
            return formatJsonCode(prev);
        });
    };

    const handleCompress = () => {
        setJsonValue((prev) => {
            return compressJsonCode(prev);
        });
    };

    const handleCopy = () => {
        copyCodeToClipboard(jsonValue);
        toast("Wow so easy!");
    };

    const handleSave = () => {
        saveHistory(jsonValue);
        toast("History saved!");
    };

    const handleClear = () => {
        setJsonValue("");
        setClearDialogOpen(false);
        toast("Editor cleared!");
    };

    return (
        <Stack spacing={2} sx={{ pt: 0 }}>
            <CodeMirror
                value={jsonValue}
                height={UI.maxEditorHeight}
                extensions={[json()]}
                onChange={onChange}
                theme={vscodeDark}
                placeholder={"Please enter JSON data..."}
                autoFocus={true}
                className="text-xs"
            />
            <Stack direction={"row"} spacing={1} sx={{ px: 2 }}>
                <Button
                    variant="contained"
                    size="small"
                    startIcon={<AutoFixHigh />}
                    onClick={handleFormat}
                >
                    Format
                </Button>
                <Button
                    variant="contained"
                    size="small"
                    startIcon={<ContentCopy />}
                    onClick={handleCopy}
                >
                    Copy
                </Button>
                <IconButton
                    aria-label="more"
                    variant="contained"
                    size="small"
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                >
                    <MoreVert />
                </IconButton>

                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}
                >
                    <MenuItem onClick={handleCompress}>
                        <ListItemIcon>
                            <Compress fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Minify</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => setClearDialogOpen(true)}>
                        <ListItemIcon>
                            <Clear fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Clear</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleSave}>
                        <ListItemIcon>
                            <Save fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Save</ListItemText>
                    </MenuItem>

                    <HandleDialog
                        open={clearDialogOpen}
                        title={"Clear Editor"}
                        content={"Are you sure you want to clear the editor?"}
                        actionCancel={() => setClearDialogOpen(false)}
                        actionOk={handleClear}
                        actionCancelText={"Cancel"}
                        actionOkText={"Clear"}
                    />
                </Menu>
            </Stack>
        </Stack>
    );
};

export default EditorTab;
