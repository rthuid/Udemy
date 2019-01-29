import React from 'react';

const layout = (props) => (
    <>
        <div>Toolbar, SlideDrawer, Backdrop</div>
        <main>
            {props.children}
        </main>
    </>
);

export default layout;