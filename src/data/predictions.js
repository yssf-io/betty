// Prediction questions. `outcome` is null while pending, or 'yes' / 'no' once
// resolved. When Polymarket/Kalshi integration lands, an adapter will flip
// this field and GameContext's settlement pass will credit payouts.
export const predictions = [
    {
        id: 1,
        question: "Will AI replace more than 50% of creative jobs by 2030?",
        category: "Technology",
        image: "https://picsum.photos/seed/ai-jobs/800/600",
        expiresAt: "2030-01-01",
        context: "AGI is defined as the point at which an AI system can perform any intellectual task that a human being can.",
        yesPercent: 65,
        outcome: null,
    },
    {
        id: 2,
        question: "Will interest rates decrease in the next FOMC decision?",
        category: "Finance",
        image: "https://picsum.photos/seed/finance/800/600",
        expiresAt: "2026-06-15",
        context: "The Federal Reserve meets 8 times a year to set monetary policy.",
        yesPercent: 42,
        outcome: null,
    },
    {
        id: 3,
        question: "Will Bitcoin reach $150k by end of 2026?",
        category: "Crypto",
        image: "https://picsum.photos/seed/crypto/800/600",
        expiresAt: "2026-12-31",
        context: "Bitcoin reached an all-time high of $100k in late 2024.",
        yesPercent: 58,
        outcome: null,
    },
    {
        id: 4,
        question: "Will SpaceX land humans on Mars by 2030?",
        category: "Space",
        image: "https://picsum.photos/seed/mars/800/600",
        expiresAt: "2030-12-31",
        context: "SpaceX has been developing Starship for Mars missions.",
        yesPercent: 32,
        outcome: null,
    },
    {
        id: 5,
        question: "Will the Lakers make the NBA playoffs this season?",
        category: "Sports",
        image: "https://picsum.photos/seed/basketball/800/600",
        expiresAt: "2026-04-15",
        context: "The Lakers are currently in 8th place in the Western Conference.",
        yesPercent: 71,
        outcome: null,
    },
    {
        id: 6,
        question: "Will Apple release AR glasses in 2026?",
        category: "Technology",
        image: "https://picsum.photos/seed/glasses/800/600",
        expiresAt: "2026-12-31",
        context: "Apple Vision Pro was released in 2024 as their first spatial computing device.",
        yesPercent: 45,
        outcome: null,
    },
]

export function getPrediction(id) {
    return predictions.find((p) => p.id === Number(id))
}
