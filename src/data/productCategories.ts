import type { ProductData } from "./productsData";
import { productDatabase } from "./productsData";

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  products: ProductData[];
}

export const productCategories: ProductCategory[] = (() => {
  const categorizedIds = new Set<string>();

  const categorize = (matcher: (p: ProductData) => boolean) => {
    return productDatabase.filter((p) => {
      if (categorizedIds.has(p.id)) return false;
      if (matcher(p)) {
        categorizedIds.add(p.id);
        return true;
      }
      return false;
    });
  };

  const solvents = categorize((p) => /Solvent|Acetate|Alcohol|Toluene|Xylene/i.test(p.name));
  const waterTreatment = categorize((p) => /Water Treatment|Coagulant|Flocculant|Oxidizing Agent|Hydrogen Peroxide/i.test(p.name));
  const inorganicAcids = categorize((p) => /Acid/i.test(p.name));
  const surfactants = categorize((p) => /Surfactant|Foam Booster/i.test(p.name));
  const alkalisBases = categorize((p) => /Alkali|Caustic|Hydroxide/i.test(p.name));
  const foodCosmetic = categorize((p) => /Food|Cosmetic|Pharma|Sweetener|Preservative|Personal Care|Emulsifier/i.test(p.name));
  const detergentAdditives = categorize((p) => /Detergent|Speckles|SCMC|Soda Ash|Sodium Silicate|Zeolite/i.test(p.name));
  
  // Catch all remaining uncategorized products in specialty
  const specialtyChemicals = categorize(() => true);

  return [
    {
      id: "solvents",
      name: "Solvents & Organic Chemicals",
      description: "Industrial-grade solvents for coatings, printing inks, pharmaceuticals, and chemical synthesis",
      color: "from-amber-400 to-amber-600",
      icon: "🧪",
      products: solvents,
    },
    {
      id: "water-treatment",
      name: "Water & Wastewater Treatment",
      description: "Coagulants, flocculants, and chemical solutions for water purification and treatment",
      color: "from-blue-400 to-blue-600",
      icon: "💧",
      products: waterTreatment,
    },
    {
      id: "inorganic-acids",
      name: "Inorganic Acids & Salts",
      description: "High-purity industrial acids for metal processing, fertilizers, and chemical synthesis",
      color: "from-red-400 to-red-600",
      icon: "⚗️",
      products: inorganicAcids,
    },
    {
      id: "surfactants",
      name: "Surfactants & Detergent Raw Materials",
      description: "High-performance surfactants for detergents, soaps, shampoos, and industrial cleaners",
      color: "from-green-400 to-green-600",
      icon: "🧼",
      products: surfactants,
    },
    {
      id: "alkalis-bases",
      name: "Alkalis & Strong Bases",
      description: "Essential alkaline chemicals for soap manufacturing, textiles, and industrial processes",
      color: "from-purple-400 to-purple-600",
      icon: "📊",
      products: alkalisBases,
    },
    {
      id: "food-cosmetic",
      name: "Food, Cosmetic & Pharma Ingredients",
      description: "Specialty ingredients for personal care, food additives, and pharmaceutical formulations",
      color: "from-pink-400 to-pink-600",
      icon: "💄",
      products: foodCosmetic,
    },
    {
      id: "detergent-additives",
      name: "Detergent Additives & Builders",
      description: "Functional additives for detergent powders, performance boosters, and visual enhancers",
      color: "from-cyan-400 to-cyan-600",
      icon: "✨",
      products: detergentAdditives,
    },
    {
      id: "specialty-chemicals",
      name: "Specialty & Intermediate Chemicals",
      description: "Advanced intermediates and specialty chemicals for niche industrial applications",
      color: "from-indigo-400 to-indigo-600",
      icon: "🔬",
      products: specialtyChemicals,
    },
  ];
})();
