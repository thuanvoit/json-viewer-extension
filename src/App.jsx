import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MainArea from "./MainArea";
import TabManager from "./tabs/TabManager";
import EditorViewerProvider from "./tabs/EditorViewerProvider";
import { ToastContainer } from "react-toastify";
import TabProvider from "./tabs/TabProvider";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

export default function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <ToastContainer
                position="top-right"
                autoClose={1000}
                newestOnTop={true}
                stacked={true}
                pauseOnFocusLoss={false}
                draggable={false}
                theme="dark"
                closeOnClick={true}
                hideProgressBar={false}
            />
            <MainArea>
                <EditorViewerProvider>
                    <TabProvider>
                        <TabManager />
                    </TabProvider>
                </EditorViewerProvider>
            </MainArea>
        </ThemeProvider>
    );
}
