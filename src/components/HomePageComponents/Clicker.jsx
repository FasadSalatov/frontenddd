import styled from "styled-components";

export const ButtonStyled = styled.button`
    overflow: hidden;
    outline: none;
    position: relative;
    cursor: pointer;
    background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 35%, rgba(0, 212, 255, 1) 100%);
    color: #fff;
    font-size: 20px;
    border-radius: 50%;
    text-align: center;
    width: 300px;
    height: 300px;
    margin-top: 40px;
`;

const Clicker = ({ children, onHandleChangeEnergyAndCoin }) => {
    return (
        <div onClick={() => onHandleChangeEnergyAndCoin()}>
            <ButtonStyled>
                <img width={400} src="/public/img/circleMain.png" alt="" />
                {children}
            </ButtonStyled>
        </div>
    );
};

export default Clicker;
