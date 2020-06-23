import { createSelector } from 'reselect';
import { State } from '../../reducers';
import { mapMemberListModelToVM } from './mappers';

export const getMembersState = (state: State) => state.membersState;

export const getMembersList = createSelector(
  getMembersState,
  (membersState) => membersState.members
);

export const getMembersListVM = createSelector(getMembersList, (members) =>
  mapMemberListModelToVM(members)
);

export const getServerError = createSelector(
  getMembersState,
  (membersState) => membersState.serverError
);
