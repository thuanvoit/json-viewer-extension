import { useContext } from "react";
import PropTypes from "prop-types";
import { Box, Tab, Tabs } from "@mui/material/index";
import { Settings } from "@mui/icons-material";
import EditorTab from "./EditorTab";
import TreeViewerTab from "./TreeViewerTab";
import HistoryTab from "./HistoryTab";
import ConfigTab from "./ConfigTab";
import TabContext from "./TabContext";

const CustomTabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
        </div>
    );
};

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
    return {
        id: `tab-${index}`,
        "aria-controls": `abpanel-${index}`,
    };
};

const TabManager = () => {
    // const [tabIndex, setTabIndex] = useState(0);
    const { tabIndex, setTabIndex } = useContext(TabContext);

    const handleChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <Box sx={{ width: "100%", height: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={tabIndex}
                    variant="fullWidth"
                    onChange={handleChange}
                    aria-label="tabs"
                >
                    <Tab label="Editor" {...a11yProps(0)} />
                    <Tab label="Viewer" {...a11yProps(1)} />
                    <Tab label="History" {...a11yProps(2)} />
                    <Tab icon={<Settings />} {...a11yProps(3)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={tabIndex} index={0}>
                <EditorTab />
            </CustomTabPanel>
            <CustomTabPanel value={tabIndex} index={1}>
                <TreeViewerTab />
            </CustomTabPanel>
            <CustomTabPanel value={tabIndex} index={2}>
                <HistoryTab />
            </CustomTabPanel>
            <CustomTabPanel value={tabIndex} index={3}>
                <ConfigTab />
            </CustomTabPanel>
        </Box>
    );
};

export default TabManager;
