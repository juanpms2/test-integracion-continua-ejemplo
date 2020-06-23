import * as React from 'react';
import { render } from '@testing-library/react';
import { MemberListPageContainer } from './pageContainer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { State } from '../../reducers';
import { membersReducer } from './reducers';
import * as actions from './actions/fetchMembers';

const renderWithRedux = (
  component,
  { initialState = {}, reducer, store = createStore(reducer, initialState) }
) => ({
  ...render(<Provider store={store}>{component}</Provider>),
});

describe('MemberListPageContainer specs', () => {
  it('should render empty table when it feeds initial state', () => {
    // Arrange
    const initialState: State = {
      membersState: {
        members: [],
        serverError: null,
      },
    };
    // Act
    const { queryAllByTestId } = renderWithRedux(<MemberListPageContainer />, {
      initialState,
      reducer: membersReducer,
    });
    const memberElements = queryAllByTestId('member');

    // Assert
    expect(memberElements).toHaveLength(0);
  });
  it('should render a table with one row when members has one item', () => {
    // Arrange
    const initialState: State = {
      membersState: {
        members: [{ id: 1, login: 'member 1', avatar_url: 'avatar 1' }],
        serverError: null,
      },
    };
    // Act
    const { queryAllByTestId } = renderWithRedux(<MemberListPageContainer />, {
      initialState,
      reducer: membersReducer,
    });
    const memberElements = queryAllByTestId('member');

    // Assert
    expect(memberElements).toHaveLength(1);
  });

  it('should render a table with one row when members has two item', () => {
    // Arrange
    const initialState: State = {
      membersState: {
        members: [
          { id: 1, login: 'member 1', avatar_url: 'avatar 1' },
          { id: 2, login: 'member 2', avatar_url: 'avatar 2' },
        ],
        serverError: null,
      },
    };
    // Act
    const { queryAllByTestId } = renderWithRedux(<MemberListPageContainer />, {
      initialState,
      reducer: membersReducer,
    });
    const memberElements = queryAllByTestId('member');

    // Assert
    expect(memberElements).toHaveLength(2);
  });

  it('should not render a table when serverError has value', () => {
    // Arrange
    const initialState: State = {
      membersState: {
        members: [
          { id: 1, login: 'member 1', avatar_url: 'avatar 1' },
          { id: 2, login: 'member 2', avatar_url: 'avatar 2' },
        ],
        serverError: 'Something went wrong',
      },
    };
    // Act
    const { queryAllByTestId } = renderWithRedux(<MemberListPageContainer />, {
      initialState,
      reducer: membersReducer,
    });
    const memberElements = queryAllByTestId('member');

    // Assert
    expect(memberElements).toHaveLength(0);
  });

  it('should call fetchMembersRequest when it mounts the component', () => {
    // Arrange
    const initialState: State = {
      membersState: {
        members: [
          { id: 1, login: 'member 1', avatar_url: 'avatar 1' },
          { id: 2, login: 'member 2', avatar_url: 'avatar 2' },
        ],
        serverError: 'Something went wrong',
      },
    };
    const fetchMembersRequest = jest.spyOn(actions, 'fetchMembersRequest');

    // Act
    renderWithRedux(<MemberListPageContainer />, {
      initialState,
      reducer: membersReducer,
    });

    // Assert
    expect(fetchMembersRequest).toHaveBeenCalled();
  });
});
