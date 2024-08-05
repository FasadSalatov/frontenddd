import Logo from "./Logo";

const Loading = () => {
    return (
        <section className="relative h-[100vh] w-[100vw] ">
            <div className="absolute top-5 left-0 -translate-x-[50%]">
                <Logo width={300} />
            </div>
            <div className="absolute top-5 right-0   translate-x-[-10%]">
                <Logo width={150} />
            </div>
            <div className="absolute bottom-0  left-0  translate-x-[-30%]  translate-y-[30%]">
                <Logo width={350} />
            </div>
            <div className="absolute bottom-[40%]  right-0 translate-x-[35%]  translate-y-[30%]">
                <Logo width={280} />
            </div>
            <div className="absolute top-1/2  right-1/2 translate-x-[50%]  -translate-y-[50%] z-30">
                <Logo width={300} />
            </div>
            <div className="bg-[#051a3460] backdrop-blur-sm w-full h-full absolute top-0 left-0 z-20"></div>
        </section>
    );
};

export default Loading;
