import InfoSectionCard from "./InfoSectionCard";
import InfoSectionTitle from "./InfoSectionTitle";

const InfoSection = () => {
    return (
        <div className="w-full">
            <InfoSectionTitle />
            <div className="test mt-3 grid grid-cols-2 gap-3">
                <InfoSectionCard />
                <InfoSectionCard />
                <InfoSectionCard />
                <InfoSectionCard />
                <InfoSectionCard />
                <InfoSectionCard /> 
                <InfoSectionCard />
                <InfoSectionCard />
            </div>
        </div>
    );
};

export default InfoSection;
