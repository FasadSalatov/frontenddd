import React from "react";

const WrapperPage = ({ children }) => {
    return (
        <section
            style={{
                height:  'calc(100vh - 85px)'
            }}
            className="overflowY relative  overflow-y-hidden w-full max-w-[400px] flex flex-col items-center pt-5 px-5"
        >
            {children}
        </section>
    );
};

export default WrapperPage;
