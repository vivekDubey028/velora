import React from 'react';
import susCoreImg from '../../assets/sustainability/suscore.webp';

const SusCore: React.FC = () => {
    return (
        <section className="relative w-full py-16 md:py-20 bg-white font-['Outfit'] overflow-hidden flex flex-col justify-center">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">

                <div className="h-10" /> {/* Large spacer for clear visual separation */}

                {/* Top decorative line */}
                <div className="flex flex-col items-center mb-12">
                    <div className="w-[1.5px] h-20 bg-[#102b5e]/20" />
                </div>

                {/* Section Heading */}
                <h2 className="text-[1.9rem] md:text-[3rem] lg:text-[3.5rem] font-bold text-[#102b5e] text-center mb-10 md:mb-20 tracking-tight leading-tight">
                    Sustainability at the Core of Every Operation
                </h2>
                <div className="h-10" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                    {/* Left Column: Text Cards */}
                    <div className="flex flex-col gap-6 md:translate-x-20">
                        {/* Green Card */}
                        <div className="bg-accent/10 p-6 md:p-20 rounded-[2rem] w-full md:w-[105%] min-h-[200px] md:min-h-[300px] relative z-10 flex items-center">
                            <p className="text-accent text-sm md:text-[1.2rem] md:translate-x-3 leading-relaxed font-dm-sans">
                                Sustainability isn't a side initiative—it's built into every layer of how we
                                operate. Our chemical ledger is designed to promote transparency,
                                traceability, and responsible sourcing across the entire supply chain. By
                                digitizing records and enabling real-time insights, we help reduce waste,
                                optimize resource use, and support compliance with global
                                environmental standards. From ethical procurement to efficient
                                distribution, our platform empowers businesses to make smarter, greener
                                decisions—without compromising on performance or scale.
                            </p>
                        </div>

                        {/* Blue Card */}
                        <div className="bg-brand/10 p-6 md:p-10 rounded-[2rem] border border-[#102b5e]/5 w-full md:w-[105%] min-h-[140px] md:min-h-[200px] relative z-10 flex items-center">
                            <p className="text-brand text-base md:text-xl md:translate-x-3 font-medium leading-snug font-dm-sans">
                                Our platform helps reduce waste, improve resource
                                management, and support environmentally conscious
                                decisions at every stage.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Image */}
                    <div className="relative group">
                        <div className="overflow-hidden rounded-[2rem] md:rounded-[2.5rem] md:translate-x-15 shadow-2xl shadow-[#102b5e]/10 h-[280px] md:h-[520px]">
                            <img
                                src={susCoreImg}
                                alt="Sustainability visualization"
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>

                </div>
            </div>
            <div className="h-10" />
        </section>
    );
};

export default SusCore;
