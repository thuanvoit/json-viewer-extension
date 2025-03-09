import React, { useState } from "react";
import TabContext from "./TabContext";

function TabProvider(props) {
    const [tabIndex, setTabIndex] = useState(0);

    const contextValue = {
        tabIndex,
        setTabIndex,
    };

    return (
        <TabContext.Provider value={contextValue}>
            {props.children}
        </TabContext.Provider>
    );
}

export default TabProvider;
