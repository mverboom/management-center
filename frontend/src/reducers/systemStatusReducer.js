import * as ActionTypes from '../constants/ActionTypes';

// TODO: quick fix, remove if this is fixed on server-side
let currentTopicTreeConnectionName;

export default function systemStatus(state = {}, action) {
	const newState = { ...state };
	switch (action.type) {
		case ActionTypes.UPDATE_SYSTEM_STATUS:
			// Quick fix: only update if selected topic tree is the same
			if (state.systemStatus === undefined || currentTopicTreeConnectionName === action.update._name) {
				newState.systemStatus = action.update;
				newState.lastUpdated = Date.now();
			}
			break;
		case ActionTypes.UPDATE_BROKER_CONNECTED:
			currentTopicTreeConnectionName = action.update.connectionName;
			break;
		default:
	}
	return newState;
}
