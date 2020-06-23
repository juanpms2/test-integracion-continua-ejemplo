import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMembersRequest } from './actions/fetchMembers';
import { MemberListPage } from './page';
import { getMembersListVM, getServerError } from './selectors';

const useFetchMembers = () => {
  const dispatch = useDispatch();

  return React.useCallback(() => {
    dispatch(fetchMembersRequest());
  }, []);
};

export const MemberListPageContainer: React.FunctionComponent = React.memo(
  () => {
    const members = useSelector(getMembersListVM);
    const serverError = useSelector(getServerError);
    const fetchMembers = useFetchMembers();
    React.useEffect(fetchMembers, []);

    return <MemberListPage members={members} serverError={serverError} />;
  }
);
