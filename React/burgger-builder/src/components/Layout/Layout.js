import React from 'react';

import classes from './Layout.scss';

const layout = (props) => (
    <>
        <div>Toolbar, SlideDrawer, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </>
);

export default layout;