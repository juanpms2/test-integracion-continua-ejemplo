import { combineReducers } from 'redux';
import { membersReducer, MembersState } from './members';

export interface State {
  membersState: MembersState;
}

export const reducers = combineReducers<State>({
  membersState: membersReducer,
});
