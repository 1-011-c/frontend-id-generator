import {AppState} from "../App";

const key = 'testbefund-appstate';

function defaultAppState(): AppState {
   return  {
       data: {tests: [], clientId: null},
       editing: false,
       clients: [],
       username: "",
       password: "",
       testWrapper: undefined
   };
}

export function loadAppState(): AppState {
    const maybeContent = window.localStorage.getItem(key);
    if (maybeContent) {
        return {
            ...JSON.parse(maybeContent),
            username: '',
            password: '',
            editing: false
        };
    }
    return defaultAppState();
}

export function persistAppState(appState: AppState) {
    const content = {
        data: appState.data,
        editing: appState.editing,
        clients: appState.clients,
    };
    window.localStorage.setItem(key, JSON.stringify(content));
}
