import { ClearAll, Delete, OpenInNew } from "@mui/icons-material";
import {
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    IconButton,
    Stack,
    Alert,
    Button,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import {
    clearHistory,
    deleteHistory,
    getHistory,
    saveHistory,
} from "../utils/chromeStorage";
import { globalUIConfig as UI } from "../constants";
import TabContext from "./contexts/TabContext";
import EditorViewerContext from "./contexts/EditorViewerContext";
import HandleDialog from "./DialogHandler";

const HistoryTab = () => {
    const { setTabIndex } = useContext(TabContext);
    const { setJsonValue } = useContext(EditorViewerContext);

    const [clearDialogOpen, setClearDialogOpen] = useState(false);

    const [history, setHistory] = useState([]);

    useEffect(() => {
        getHistory().then((h) => {
            setHistory(h);
        });
    }, []);

    const openHistoryItem = (id) => {
        const item = history.find((i) => i.id === id);
        setJsonValue(item.jsonValue);
        setTabIndex(0);
    };

    const deleteHistoryItem = async (id) => {
        const newHistory = await deleteHistory(id);
        setHistory(newHistory);
        saveHistory(newHistory);
    };

    const handleClearHistory = () => {
        const newHistory = clearHistory();
        setHistory(newHistory);
        setClearDialogOpen(false);
    };

    return (
        <Stack spacing={2}>
            <List
                sx={{
                    overflow: "auto",
                    height: UI.maxHistoryHeight,
                }}
            >
                {history && history.length > 0 ? (
                    history.map((item) => (
                        <>
                            <ListItem
                                key={item.id}
                                secondaryAction={
                                    <Stack direction="row" spacing={1}>
                                        <IconButton aria-label="delete">
                                            <Delete
                                                onClick={() =>
                                                    deleteHistoryItem(item.id)
                                                }
                                            />
                                        </IconButton>
                                        <IconButton
                                            aria-label="open"
                                            onClick={() =>
                                                openHistoryItem(item.id)
                                            }
                                        >
                                            <OpenInNew />
                                        </IconButton>
                                    </Stack>
                                }
                                disablePadding
                            >
                                <ListItemButton>
                                    <ListItemText
                                        primary={`${item.jsonValue.substring(0, 60)}...`}
                                        secondary={item.timestamp}
                                    />
                                </ListItemButton>
                            </ListItem>
                        </>
                    ))
                ) : (
                    <Alert severity="warning">
                        Empty history. Save some JSON data from the Editor tab.
                    </Alert>
                )}
            </List>
            {history && history.length > 0 && (
                <Stack direction={"row"} spacing={1} sx={{ px: 2 }}>
                    <Button
                        variant="contained"
                        size="small"
                        startIcon={<ClearAll />}
                        onClick={() => setClearDialogOpen(true)}
                    >
                        Clear All History
                    </Button>
                    <HandleDialog
                        open={clearDialogOpen}
                        title={"Clear All History"}
                        content={"Are you sure you want to clear all history?"}
                        actionCancel={() => setClearDialogOpen(false)}
                        actionOk={handleClearHistory}
                        actionCancelText={"Cancel"}
                        actionOkText={"Clear"}
                    />
                </Stack>
            )}
        </Stack>
    );
};

export default HistoryTab;
