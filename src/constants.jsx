const globalUIConfig = {
    maxEditorHeight: "490px",
    maxViewerHeight: "550px",
    maxHistoryHeight: "490px",
    maxConfigHeight: "550px",
};

const defaultConfig = [
    {
        active: false,
        id: "0",
        type: "set-boolean",
        title: "Switch",
        description: "Enable or disable the feature",
        value: false,
    },
    {
        active: true,
        id: "1",
        type: "select-value",
        title: "Select Theme",
        description: "Select a theme",
        value: [
            {
                name: "vscode-dark",
                value: "vscode-dark",
            },
            {
                name: "github-dark",
                value: "github-dark",
            },
        ],
    },
    {
        active: true,
        id: "2",
        type: "open-url",
        title: "Feature Request",
        description: "Request a feature",
        value: "https://google.com",
    },
    {
        active: true,
        id: "3",
        type: "open-url",
        title: "Source",
        description: "View the source code",
        value: "https://google.com",
    },
];

export { globalUIConfig, defaultConfig };
