import classNames from "classnames";

const Title = ({ children, fontSize }) => {
    return (
        <h2
            className={classNames("font-semibold text-white text-center", {
                [`text-${fontSize}`]: fontSize,
            })}
        >
            {children}
        </h2>
    );
};

export default Title;
