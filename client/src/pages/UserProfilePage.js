import React, {Fragment, lazy, Suspense} from 'react';
import LazyLoader from '../Components/ShowLoader/LazyLoader';
import MasterLayout from "../Components/MasterLayout";
const UserProfile =lazy(() => import('../Components/UserProfile'));

const UserProfilePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader />}>
                    <UserProfile/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default UserProfilePage;
