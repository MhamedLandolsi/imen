import { init } from "@rematch/core"
import { userState } from "./Model/UserState"
import { loadingState } from "./Model/LoadingState"
import {doorState} from "./Model/DoorState"
import {userManagerState} from "./Model/UserManagerState"
import {requestState} from "./Model/RequestState";
import {logState} from "./Model/LogState";
import {chatState} from "./Model/ChatState";

export const store = init({
    models: {
        userState,
        loadingState,
        doorState,
        userManagerState,
        requestState,
        logState,
        chatState,
    },
});

export default store;
