import React, { useRef, useState, useEffect } from 'react';
import environmentImg from '../../assets/environment.webp';
import assuranceImg from '../../assets/assurance.webp';

const sections = [
    {
        title: "ENVIRONMENT",
        image: environmentImg,
        color: "#e0f2fe", // Light blue matching top dot
        contentLeft: "We enable sustainable supply chains through responsible manufacturing with renewable energy integration, waste recovery, and plants. By embedding sustainable chemistry and circular economy practices, we help our customers and partners reduce their carbon footprints and meet their ESG goals.",
        contentRight: [
            "24% Renewable Electrical Energy",
            "94% waste recovered",
            "13.2 MW renewable energy (RE) commissioned"
        ]
    },
    {
        title: "ASSURANCE",
        image: assuranceImg,
        color: "#0f172a", // Dark blue matching middle dot indicator
        contentLeft: "Every drop of Velora chemistry undergoes precision inspection. Our global supply chain is built on the bedrock of uncompromised safety and rigorous quality benchmarks.",
        contentRight: [
            "ISO 9001 & 14001 COMPLIANT",
            "ZERO DEFECT POLICY",
            "GLOBAL REACH, LOCAL TRUST"
        ]
    },
    {
        title: "INNOVATION",
        image: null, // Renders as solid color dot
        color: "#d9fb9b", // Light green matching bottom dot
        contentLeft: "Our R&D teams are constantly innovating to provide the next generation of chemical solutions. We focus on green chemistry and advanced material sciences to create sustainable alternatives.",
        contentRight: [
            "15+ New Patents Annually",
            "$50M R&D Investment",
            "Green Chemistry Certified"
        ]
    }
];

const Commitment: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            // The scrollable area is the container's total height minus the viewport height
            const totalScrollable = containerRef.current.offsetHeight - windowHeight;
            const currentScroll = -rect.top;

            const progress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        // Initial setup
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Timeline phases mapped to absolute scroll progress (0 to 1)
    // 0.00 to 0.05: Resting at top
    // 0.05 to 0.15: Triangle majestically morphs into an aligned vertical line over a long scroll
    const trans1 = Math.min(1, Math.max(0, (scrollProgress - 0.05) / 0.10)); 
    // 0.15 to 0.20: Resting perfectly as a line of 3 dots
    // 0.20 to 0.35: The vertical line gracefully spreads out and the first circle swells
    const trans2 = Math.min(1, Math.max(0, (scrollProgress - 0.20) / 0.15)); 
    // 0.35 to 1.00: Main scroll interaction cycling steadily through remaining balls
    const mainScroll = Math.min(1, Math.max(0, (scrollProgress - 0.35) / 0.65)); 

    // Active vertical index smoothly progressing from 0 to 2 during the main scroll phase
    const vIndex = mainScroll * (sections.length - 1);

    return (
        <section ref={containerRef} className="relative w-full bg-white text-[var(--brand)]">

      {/* ── MOBILE FALLBACK (visible only on < md) ── */}
      <div className="md:hidden flex flex-col gap-8" style={{ paddingTop: '48px', paddingBottom: '48px', paddingLeft: '16px', paddingRight: '16px' }}>
        <h2 className="text-3xl font-bold text-center text-[var(--brand)] tracking-tight">Our Commitment</h2>
        {sections.map((sec, i) => (
          <div key={i} className="rounded-[2rem] overflow-hidden shadow-md border border-neutral-100">
            {sec.image ? (
              <img src={sec.image} alt={sec.title} className="w-full h-48 object-cover" />
            ) : (
              <div className="w-full h-48" style={{ backgroundColor: sec.color }} />
            )}
            <div style={{ padding: '24px' }}>
              <h3 className="text-lg font-bold text-[var(--brand)] uppercase tracking-wider mb-3">{sec.title}</h3>
              <p className="text-[13px] leading-relaxed text-[#2a3547] font-liberationsans mb-4">{sec.contentLeft}</p>
              <ul className="flex flex-col gap-2">
                {sec.contentRight.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[12px] font-semibold text-[var(--accent)] uppercase tracking-wide">
                    <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full mt-1 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* ── DESKTOP ANIMATED VERSION (hidden on mobile) ── */}
      <div className="hidden md:block h-[500vh] relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">

                {/* Decorative Horizontal Lines next to Logo */}
                <div className="absolute top-[15%] left-0 w-[45%] h-[2px] bg-[#d9fb9b]" 
                    style={{ opacity: 1 - trans1, transform: 'translateY(-50%)' }} />
                <div className="absolute top-[15%] right-0 w-[45%] h-[2px] bg-[#89c4f4]" 
                    style={{ opacity: 1 - trans1, transform: 'translateY(-50%)' }} />

                {sections.map((sec, i) => {
                    const d = i - vIndex; // Distance from active index

                    // --- State Definitions ---
                    
                    // State A: Triangle Logo Formation (at Top)
                    const topA = 15;
                    const scaleA = 0.15;
                    const yA = i === 0 ? -45 : i === 1 ? 30 : 30;
                    const xA = i === 0 ? 0 : i === 1 ? -45 : 45;

                    // State C: Vertical Line Formation (at Center)
                    const topC = 50;
                    const scaleC = 0.15;
                    const yC = i === 0 ? -80 : i === 1 ? 0 : 80;
                    const xC = 0;

                    // State D (and beyond): Main continuous scrolling behavior
                    let targetTopPhase2 = 50;
                    if (d > 0 && d <= 1) {
                        targetTopPhase2 = 50 + d * 35; // smoothly goes from 50 to 85
                    } else if (d > 1) {
                        targetTopPhase2 = 85 + (d - 1) * 12; // smoothly continues from 85 to 97+
                    } else if (d < 0 && d >= -1) {
                        targetTopPhase2 = 50 + d * 35; // smoothly goes from 50 to 15
                    } else if (d < -1) {
                        targetTopPhase2 = 15 + (d + 1) * 12; // smoothly continues from 15 to 3-
                    }

                    // Scale expands fully only in Phase 2
                    const scalePhase2 = 0.25 + 0.75 * Math.max(0, 1 - Math.abs(d));

                    // --- Final Interpolated Values ---
                    let currentTop, currentScale, currentY, currentX;

                    if (scrollProgress < 0.15) {
                        // Blending State A -> State C (Skipping useless B phase to make it a single perfect morph)
                        currentTop = topA + (topC - topA) * trans1;
                        currentScale = scaleA + (scaleC - scaleA) * trans1;
                        currentY = yA + (yC - yA) * trans1;
                        currentX = xA + (xC - xA) * trans1;
                    } else if (scrollProgress < 0.35) {
                        // Blending State C -> Start of State D
                        // Evaluating exact target values of State D start (where d = i)
                        let targetTopStart = 50;
                        if (i > 0 && i <= 1) targetTopStart = 50 + i * 35;
                        else if (i > 1) targetTopStart = 85 + (i - 1) * 12;
                        else if (i < 0 && i >= -1) targetTopStart = 50 + i * 35;
                        else if (i < -1) targetTopStart = 15 + (i + 1) * 12;

                        const targetScaleStart = 0.25 + 0.75 * Math.max(0, 1 - Math.abs(i));
                        
                        currentTop = topC + (targetTopStart - topC) * trans2;
                        currentScale = scaleC + (targetScaleStart - scaleC) * trans2;
                        currentY = yC * (1 - trans2);
                        currentX = xC * (1 - trans2);
                    } else {
                        // Main Scrolling phase turns
                        currentTop = targetTopPhase2;
                        currentScale = scalePhase2;
                        currentY = 0;
                        currentX = 0;
                    }

                    // Map the 'top' percentage purely into GPU-accelerated translateY!
                    // Assumes container is 100vh. Center origin is top 50%.
                    // By leaving standard top: 50% we avoid all repaint costs!
                    const translateYVh = currentTop - 50;

                    // Content animations sync with Phase C visibility constraints
                    const phaseOpacityMultiplier = trans2; // Only fade content in as it centers
                    const opacityContent = Math.max(0, 1 - Math.abs(d) * 2) * phaseOpacityMultiplier;
                    const imageOpacity = Math.max(0, 1 - Math.abs(d) * 3) * phaseOpacityMultiplier;

                    return (
                        <React.Fragment key={i}>

                            {/* HUGE SOLID TEXT (z-0, BEHIND CIRCLE) */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
                                style={{
                                    opacity: opacityContent,
                                    transform: `translateY(calc(${d * 20}px + ${translateYVh}vh)) scale(${1 - Math.abs(d) * 0.1})`
                                }}>
                                <h1 className="text-[12vw] font-bold text-[var(--brand)] uppercase tracking-tighter w-full text-center leading-none">
                                    {sec.title}
                                </h1>
                            </div>

                            {/* DYNAMIC SHAPE (z-20) */}
                            <div className="absolute left-1/2 z-20 w-[500px] h-[500px] rounded-full overflow-hidden border-[12px] border-white transition-shadow duration-300"
                                style={{
                                    top: `50%`,
                                    transform: `translate(calc(-50% + ${currentX}px), calc(-50% + ${translateYVh}vh + ${currentY}px)) scale(${currentScale})`,
                                    backgroundColor: sec.color,
                                    boxShadow: Math.abs(d) < 0.2 && mainScroll > 0 ? '0 30px 80px rgba(0,0,0,0.2)' : 'none',
                                    willChange: 'transform'
                                }}>
                                {sec.image && (
                                    <img
                                        src={sec.image}
                                        alt={sec.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200"
                                        style={{ opacity: imageOpacity }}
                                    />
                                )}
                            </div>

                            {/* HUGE OUTLINED TEXT (z-30, IN FRONT OF CIRCLE) */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
                                style={{
                                    opacity: opacityContent,
                                    transform: `translateY(calc(${d * 20}px + ${translateYVh}vh)) scale(${1 - Math.abs(d) * 0.1})`
                                }}>
                                <h1 className="text-[12vw] font-bold text-transparent uppercase tracking-tighter w-full text-center leading-none"
                                    style={{ WebkitTextStroke: '2px white' }}>
                                    {sec.title}
                                </h1>
                            </div>

                            {/* CONTENT OVERLAYS (z-40) */}
                            {opacityContent > 0 && (
                                <div className="absolute inset-0 z-40"
                                    style={{ opacity: opacityContent, pointerEvents: opacityContent > 0.5 ? 'auto' : 'none' }}>

                                    {/* TOP-LEFT: Description text */}
                                    <div className="absolute left-[4%] top-[12%] w-[35%] max-w-[460px]">
                                        <p className="text-[13px] leading-[1.75] text-[#2a3547] font-liberationsans">
                                            {sec.contentLeft}
                                        </p>
                                    </div>

                                    {/* TOP-RIGHT: Stats box */}
                                    <div className="absolute right-[4%] top-[10%] w-[35%] max-w-[460px]" style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.06))' }}>
                                        <div className="bg-[#f3f9fe] border border-[#e0edf6] py-10 pr-8 min-h-[160px] flex items-center"
                                            style={{
                                                paddingLeft: '110px',
                                                clipPath: 'polygon(0 0, 4% 10%, 7% 20%, 10% 30%, 13% 40%, 15% 50%, 17% 60%, 18% 70%, 19% 80%, 20% 90%, 20% 100%, 100% 100%, 100% 0)'
                                            }}>
                                            <ul className="space-y-3 font-liberationsans">
                                                {sec.contentRight.map((item, idx) => (
                                                    <li key={idx} className="flex items-start gap-2.5 text-[12px] font-semibold text-[var(--accent)] uppercase tracking-wide leading-snug">
                                                        <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full mt-1 shrink-0"></span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* BOTTOM-LEFT: Decorative corner box */}
                                    <div className="absolute left-[4%] bottom-[10%] w-[35%] max-w-[460px]" style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.06))' }}>
                                        <div className="h-[160px] bg-[#f3f9fe] border border-[#e0edf6]"
                                            style={{
                                                clipPath: 'polygon(0 0, 80% 0, 80% 10%, 81% 20%, 82% 30%, 83% 40%, 85% 50%, 87% 60%, 90% 70%, 93% 80%, 96% 90%, 100% 100%, 0 100%)'
                                            }}>
                                        </div>
                                    </div>

                                    {/* BOTTOM-RIGHT: Description text repeated */}
                                    <div className="absolute right-[4%] bottom-[10%] w-[35%] max-w-[460px]">
                                        <p className="text-[13px] leading-[1.75] text-[#2a3547] font-liberationsans">
                                            {sec.contentLeft}
                                        </p>
                                    </div>

                                </div>
                            )}

                        </React.Fragment>
                    )
                })}

            </div>
            </div>
        </section>
    );
};

export default Commitment;
