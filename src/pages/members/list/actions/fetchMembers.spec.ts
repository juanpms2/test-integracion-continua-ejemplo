import {
  fetchMembersRequest,
  fetchMembersSuccess,
  fetchMembersError,
} from './fetchMembers';
import { actionIds } from './actionIds';
import { Member } from '../../../../rest-api/model';

describe('fetchMembers actions', () => {
  describe('fetchmembersRequest', () => {
    it('should return an action with type FETCH_MEMBERS_REQUEST and payload as null', () => {
      // Arrange

      // Act
      const result = fetchMembersRequest();

      // Assert
      expect(result.type).toEqual(actionIds.FETCH_MEMBERS_REQUEST);
      expect(result.payload).toBeNull();
    });
  });

  describe('fetchMembersSuccess', () => {
    it('should retrun an action with type FETCH_MEMBERS_SUCCESS and the given members as payload', () => {
      // Arrange
      const members: Member[] = [
        { avatar_url: 'avatar url', id: 1, login: 'test login' },
      ];

      // Act
      const result = fetchMembersSuccess(members);

      // Assert
      expect(result.type).toEqual(actionIds.FETCH_MEMBERS_SUCCESS);
      expect(result.payload).toEqual(members);
    });
  });

  describe('fetchMembersError', () => {
    it('should return an action with type FETCH_MEMBERS_ERROR and payload as the given error', () => {
      // Arrange
      const error = 'Something is wrong';

      // Act
      const resul = fetchMembersError(error);

      // Assert
      expect(resul.type).toEqual(actionIds.FETCH_MEMBERS_ERROR);
      expect(resul.payload).toEqual(error);
    });
  });
});
