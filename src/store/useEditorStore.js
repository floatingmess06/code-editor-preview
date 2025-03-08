// src/store/useEditorStore.js
import {create} from "zustand";
import defaults from "../utils/utils";


// Default code content
const [defaultHtml, defaultCss, defaultJs] = defaults();
const useEditorStore = create((set) => ({
  // Editor states
  html: defaultHtml,
  css: defaultCss,
  js: defaultJs,
  currentTab: 0, // 0: HTML, 1: CSS, 2: JavaScript
  srcDoc: "",

  // UI-related states
  layout: "split", // 'split', 'code-focus', 'preview-focus'
  editorExpanded: false,
  previewExpanded: false,
  darkMode: true,
  isSnackbarOpen: false,
  snackbarMessage: "",
  snackbarSeverity: "success",
  drawerOpen: false,
  deviceFrame: "laptop",
  viewMenuAnchor: null,
  monacoTheme: "vs-dark",

  // Actions to update the state
  setHtml: (html) => set({ html }),
  setCss: (css) => set({ css }),
  setJs: (js) => set({ js }),
  setCurrentTab: (tab) => set({ currentTab: tab }),
  setLayout: (layout) => set({ layout }),
  setEditorExpanded: (expanded) => set({ editorExpanded: expanded }),
  setPreviewExpanded: (expanded) => set({ previewExpanded: expanded }),
  setDarkMode: (darkMode) => set({ darkMode }),

  // UI-related actions
  setSnackbar: (isOpen, message, severity) =>
    set({
      isSnackbarOpen: isOpen,
      snackbarMessage: message,
      snackbarSeverity: severity,
    }),
  setIsSnackbarOpen: (isOpen) => set({ isSnackbarOpen: isOpen }),
  setDrawerOpen: (isOpen) => set({ drawerOpen: isOpen }),
  setDeviceFrame: (device) => set({ deviceFrame: device }),
  setViewMenuAnchor: (anchor) => set({ viewMenuAnchor: anchor }),
  setMonacoTheme: (theme) => set({ monacoTheme: theme }),

  // Debounced update of srcDoc
  setSrcDoc: () =>
    set((state) => {
      if (typeof document !== "undefined") {
        // Ensure it's in a browser environment
        return {
          srcDoc: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>${state.css}</style>
            </head>
            <body>
              ${state.html}
              <script>${state.js}</script>
            </body>
          </html>
        `,
        };
      }
      return {}; // Avoid state updates if the component is unmounted
    }),
}));

export default useEditorStore;
