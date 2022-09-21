import React, {Fragment, lazy, Suspense} from 'react';
import LazyLoader from '../Components/ShowLoader/LazyLoader';
import MasterLayout from "../Components/MasterLayout";
const Home =lazy(() => import('../Components/Home'));

const HomePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader />}>
                    <Home/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default HomePage;

