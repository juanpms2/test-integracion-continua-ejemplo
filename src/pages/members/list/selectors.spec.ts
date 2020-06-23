import {
  getMembersState,
  getMembersList,
  getMembersListVM,
  getServerError,
} from './selectors';
import { State } from '../../reducers';
import * as mappers from './mappers';
import { Member } from './viewModel';

describe('Members selectors', () => {
  describe('getMebersState', () => {
    it('should return mebersState from state', () => {
      // Arrange
      const state: State = {
        membersState: {
          members: [],
          serverError: null,
        },
      };

      // Act
      const result = getMembersState(state);

      // Assert
      expect(result).toBe(state.membersState);
    });
  });

  describe('getMembersList', () => {
    it('should return the expected members list from mebersState', () => {
      // Arrange
      const state: State = {
        membersState: {
          members: [],
          serverError: null,
        },
      };
      // Act
      const result = getMembersList(state);

      // Assert
      expect(result).toBe(state.membersState.members);
    });
  });

  describe('getMembersListVM', () => {
    it('should return the expected members list from mebersState', () => {
      // Arrange
      const state: State = {
        membersState: {
          members: [
            { id: 1, login: 'member 1', avatar_url: 'avatar 1' },
            { id: 1, login: 'member 2', avatar_url: 'avatar 2' },
          ],
          serverError: null,
        },
      };

      const membersVM: Member[] = [
        { id: 1, name: 'member 1', avatarUrl: 'avatar 1' },
        { id: 1, name: 'member 2', avatarUrl: 'avatar 2' },
      ];

      const mapMemberListModelToVM = jest
        .spyOn(mappers, 'mapMemberListModelToVM')
        .mockReturnValue(membersVM);
      // Act
      const result = getMembersListVM(state);

      // Assert
      expect(result).toBe(membersVM);
      expect(mapMemberListModelToVM).toHaveBeenCalled();
    });

    it('should return the same members when called multiple times', () => {
      // Arrange
      const state: State = {
        membersState: {
          members: [
            { id: 1, login: 'member 1', avatar_url: 'avatar 1' },
            { id: 1, login: 'member 2', avatar_url: 'avatar 2' },
          ],
          serverError: null,
        },
      };

      const membersVM: Member[] = [
        { id: 1, name: 'member 1', avatarUrl: 'avatar 1' },
        { id: 1, name: 'member 2', avatarUrl: 'avatar 2' },
      ];

      const mapMemberListModelToVM = jest
        .spyOn(mappers, 'mapMemberListModelToVM')
        .mockReturnValue(membersVM);
      // Act
      const result1 = getMembersListVM(state);
      const result2 = getMembersListVM(state);
      const result3 = getMembersListVM(state);
      const result4 = getMembersListVM(state);

      // Assert
      expect(result1).toBe(membersVM);
      expect(mapMemberListModelToVM).toHaveBeenCalledTimes(1);
    });
  });
  describe('getServerError', () => {
    it('should return serverError from memberState', () => {
      // Arrange
      const state: State = {
        membersState: {
          members: [],
          serverError: null,
        },
      };

      // Act
      const result = getServerError(state);

      // Assert
      expect(result).toBe(state.membersState.serverError);
    });
  });
});
