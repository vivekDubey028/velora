import SusHero from '../components/sustainability/sushero';
import SusCore from '../components/sustainability/suscore';
import Sustain from '../components/sustainability/sustain';
import Certifications from '../components/common/certifications';


export default function Sustainability() {
    return (
        <>
            <SusHero />

            <SusCore />
            <Sustain />
            <div className="h-16 md:h-24" />
            <Certifications />
        </>
    );
}
