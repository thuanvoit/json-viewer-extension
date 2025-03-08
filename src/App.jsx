import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import JsonView from "@uiw/react-json-view";
import { darkTheme } from "@uiw/react-json-view/dark";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

const App = () => {
  const [value, setValue] = useState("");
  const [displayHistory, setDisplayHistory] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);

  const saveData = async (data) => {
    try {
      await chrome.storage.local.set({ jsonData: data });
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const saveHistory = async () => {
    try {
      const history = await getHistory();
      // If we have a value to save and it's valid JSON, save it to history
      if (value && validateJson(value)) {
        const timestamp = new Date().toISOString();
        const newHistory = {
          id: `${crypto.randomUUID()}_${timestamp}`,
          timestamp,
          value,
        };
        const historyToSave = history ? [newHistory, ...history] : [newHistory];
        await chrome.storage.local.set({ history: historyToSave });
        setDisplayHistory(historyToSave);
      }
    } catch (error) {
      console.error("Error saving history:", error);
    }
  };

  const getHistory = async () => {
    try {
      const result = await chrome.storage.local.get("history");
      return result.history || []; // Return empty array if history doesn't exist yet
    } catch (error) {
      console.error("Error getting history:", error);
      return []; // Return empty array on error
    }
  };

  const clearHistory = async () => {
    try {
      await chrome.storage.local.remove("history");
      setDisplayHistory([]);
    } catch (error) {
      console.error("Error clearing history:", error);
    }
  };

  const removeHistoryItem = async (id) => {
    try {
      const history = await getHistory();
      const newHistory = history.filter((item) => item.id !== id);
      await chrome.storage.local.set({ history: newHistory });
      setDisplayHistory(newHistory);
    } catch (error) {
      console.error("Error removing history item:", error);
    }
  };

  const setValueFromHistory = (value) => {
    setValue(value);
    setTabIndex(0);
  };

  const loadData = async () => {
    try {
      const { jsonData } = await chrome.storage.local.get("jsonData");
      setValue(jsonData);
      console.log("Loaded data:", jsonData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const onChange = (newValue) => {
    setValue(newValue);
  };

  const formatCode = (e) => {
    e.preventDefault();
    try {
      if (!value) {
        return;
      }
      const formattedValue = JSON.stringify(JSON.parse(value), null, 2);
      setValue(formattedValue);
    } catch (error) {
      console.error("Error formatting JSON:", error);
    }
  };

  const validateJson = (jsonString) => {
    try {
      JSON.parse(jsonString);
      return true;
    } catch (error) {
      return false;
    }
  };

  // Load data and history on component mount
  React.useEffect(() => {
    loadData();

    // Also load history
    getHistory().then((history) => {
      setDisplayHistory(history);
    });
  }, []);

  React.useEffect(() => {
    saveData(value);
  }, [value]);

  return (
    <div className="w-lg p-2 flex flex-col gap-2 bg-slate-600">
      <header>
        <h1 className="text-white text-lg font-bold">JSON Viewer</h1>
      </header>
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Editor</Tab>
          <Tab>Tree Viewer</Tab>
          <Tab>History</Tab>
          <Tab>Config</Tab>
        </TabList>

        <TabPanel>
          <div className="flex flex-col gap-2">
            <CodeMirror
              value={value}
              height="400px"
              extensions={[json()]}
              onChange={onChange}
              theme={"dark"}
              placeholder={"Please enter JSON data..."}
              className="rounded border border-1 text-xs"
            />
            <div className="flex gap-2">
              <button
                className="bg-white p-1 rounded inline-flex items-center"
                onClick={formatCode}
              >
                <span>Format</span>
              </button>

              <button
                className="bg-white p-1 rounded inline-flex items-center"
                onClick={saveHistory}
              >
                <span>Save</span>
              </button>

              <button
                className="bg-white p-1 rounded inline-flex items-center"
                onClick={() => setValue("")}
              >
                <span>Clear</span>
              </button>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="h-[400px] overflow-auto">
            {value ? (
              validateJson(value) ? (
                <JsonView value={JSON.parse(value)} style={darkTheme} />
              ) : (
                <p className="text-red-500">
                  Invalid JSON. Please check your syntax.
                </p>
              )
            ) : (
              <p className="text-yellow-500">
                Please enter JSON data on Json Editor Tab.
              </p>
            )}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="flex flex-col gap-2">
            <div className="h-[350px] overflow-auto p-2">
              {displayHistory && displayHistory.length > 0 ? (
                <ul className="flex flex-col gap-2">
                  {displayHistory.map((item) => (
                    <li
                      key={item.id}
                      className="flex flex-col list-none p-3 rounded bg-slate-700 flex flex-col gap-1"
                    >
                      <div className="text-white cursor-pointer">
                        <p>{new Date(item.timestamp).toLocaleString()}</p>
                        <p>{item.value.substring(0, 90)}...</p>
                      </div>
                      <div className="flex flex-row gap-2">
                        <button
                          className="bg-white p-1 rounded inline-flex items-center"
                          onClick={() => setValueFromHistory(item.value)}
                        >
                          <span>Load</span>
                        </button>
                        <button
                          className="bg-white p-1 rounded inline-flex items-center"
                          onClick={() => removeHistoryItem(item.id)}
                        >
                          <span>Remove</span>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-yellow-500">No history available.</p>
              )}
            </div>

            <div>
              <button
                className="bg-white p-1 rounded inline-flex items-center"
                onClick={clearHistory}
              >
                <span>Clear History</span>
              </button>
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default App;
