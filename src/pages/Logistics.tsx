import LogHero from '../components/logistics/loghero';
import LogFacts from '../components/logistics/logfacts';
import LogNeed from '../components/logistics/logneed';
import LogBuild from '../components/logistics/logbuild';
import LogWhy from '../components/logistics/logwhy';
import LogMove from '../components/logistics/logmove';

const Logistics: React.FC = () => {
    return (
        <div className="bg-black min-h-screen">
            <LogHero />
            <LogFacts />
            <LogNeed />
            <LogBuild />
            <LogWhy />
            <LogMove />
            {/* Other sections like Services, Fleet can be added here later */}
        </div>
    );
};

export default Logistics;
