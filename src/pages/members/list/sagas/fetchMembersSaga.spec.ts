import { watchFetchMembersRequest, fetchMembersSaga } from './fetchMembersSaga';
import { takeLatest, call, put } from 'redux-saga/effects';
import { actionIds } from '../actions/actionIds';
import {
  FetchMembersRequestAction,
  fetchMembersSuccess,
} from '../actions/fetchMembers';
import * as api from '../../../../rest-api/api/member';
import { Member } from '../../../../rest-api/model';
import { getDispatchedActionsFromSaga } from '../../../../common/test/getDispatchedActionsFromSaga';

describe('fetchMembers saga specs', () => {
  describe('watchFetchmembersRequest', () => {
    it('should lesten to actions with type FETCH_MEMBERS_REQUEST', () => {
      // Arrange
      const generator = watchFetchMembersRequest();

      // Act
      const result = generator.next();

      // Assert
      expect(result.value).toEqual(
        takeLatest(actionIds.FETCH_MEMBERS_REQUEST, fetchMembersSaga)
      );
    });
  });

  describe('fetchmebersSaga', () => {
    it('should put fetchMembersSuccess with given members when API call is sucessful', () => {
      // Arrange
      const action: FetchMembersRequestAction = {
        type: actionIds.FETCH_MEMBERS_REQUEST,
        payload: null,
      };

      const members: Member[] = [
        { id: 1, login: 'test login', avatar_url: 'test avatar' },
      ];

      const generator = fetchMembersSaga(action);

      // Act & Assert
      expect(generator.next().value).toEqual(call(api.fetchMembers));
      expect(generator.next(members).value).toEqual(
        put(fetchMembersSuccess(members))
      );
    });

    it('should put fetchMembersSuccess with given members when API call is sucessful (runSaga)', async () => {
      // Arrange
      const action: FetchMembersRequestAction = {
        type: actionIds.FETCH_MEMBERS_REQUEST,
        payload: null,
      };

      const members: Member[] = [
        { id: 1, login: 'test login', avatar_url: 'test avatar' },
      ];

      const fetchMembersStub = jest
        .spyOn(api, 'fetchMembers')
        .mockResolvedValue(members);

      // Act
      const dispatchedActions = await getDispatchedActionsFromSaga(
        fetchMembersSaga,
        action
      );

      // Assert
      expect(dispatchedActions).toHaveLength(1);
      expect(dispatchedActions[0]).toEqual({
        type: actionIds.FETCH_MEMBERS_SUCCESS,
        payload: members,
      });
      expect(fetchMembersStub).toHaveBeenCalled();
    });

    it('should put fetchMembersError with given error message when API call is not sucessful (runSaga)', async () => {
      // Arrange
      const action: FetchMembersRequestAction = {
        type: actionIds.FETCH_MEMBERS_REQUEST,
        payload: null,
      };

      const fetchMembersStub = jest
        .spyOn(api, 'fetchMembers')
        .mockRejectedValue(new Error('Something went wrong'));

      // Act
      const dispatchedActions = await getDispatchedActionsFromSaga(
        fetchMembersSaga,
        action
      );

      // Assert
      expect(dispatchedActions).toHaveLength(1);
      expect(dispatchedActions[0]).toEqual({
        type: actionIds.FETCH_MEMBERS_ERROR,
        payload: 'Something went wrong',
      });
      expect(fetchMembersStub).toHaveBeenCalled();
    });
  });
});
