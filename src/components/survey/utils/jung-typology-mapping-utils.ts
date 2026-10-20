import {
    JungTypologyData,
    SurveyResult,
} from "@/components/survey/models/survey-results";

export const jungTypologyMap: { [key: string]: JungTypologyData } = {
    Shark: {
        type: "ENT",
        fish: {
            fish_type: "Shark",
            fish_description: "For insight and thoughtful planning",
            fish_name: "Yappy Shark",
            fish_img_path: "/assets/fishes/shark.svg",
        },
        primary_color: "#3C6D3C",
        header_color: "#7AAF78",
        background_color: "#F2FAEF",
        orientation_label_color: "#3C6D3C",
        orientation_likelihood_label_color: "#3C6D3C",
        orientation_very_likely_scale_color: "#7AAF78",
        orientation_somewhat_likely_scale_color: "#A7CAA4",
        orientation_indicator_color: "#3C6D3C",
        traits: [
            "Dominant",
            "Strategic",
            "Analytical",
            "Innovative",
            "Visionary",
            "Goal-oriented",
            "Charismatic",
            "Decisive",
            "Competitive",
            "Entrepreneurial",
            "Assertive",
            "Confident",
        ],
        quick_intro: [
            "If anyone’s making waves in the boardroom or commanding attention in a pitch, it’s the Yappy Shark. Strategic, persuasive, and unafraid of big moves, Sharks embody the Enterprising (E) career personality type — driven, daring, and dynamic.",
            "Just like their namesake, real sharks are relentless swimmers. They must keep moving to survive — a metaphor that fits you perfectly. Whether it’s chasing the next goal, building a business, or leading a bold initiative, you thrive when there’s momentum and a target to hit.",
            "You have a natural gift for leadership, influence, and decision-making. With a Workaholism Index of 86%, you are among the most ambitious individuals in the QuickFish community. You don’t just participate — you dominate.",
            "While others plan cautiously, you act with clarity and command. Your mind operates at high speed, and you bring a magnetic energy that sparks action and rallies teams. You don’t just climb the ladder — you build it.",
        ],
        quote: "The market waits for no one",
        most_compatible: [
            {
                fish_type: "Swordfish",
                fish_description: "Too blunt and pragmatic",
                fish_name: "Difi Swordfish",
                fish_img_path: "/assets/fishes/swordfish.svg",
            },
            {
                fish_type: "Dolphin",
                fish_description: "For emotional support and social bonding",
                fish_name: "Zesty Dolphin",
                fish_img_path: "/assets/fishes/dolphin.svg",
            },
        ],
        least_compatible: [
            {
                fish_type: "Salmon",
                fish_description: "Too cautious and slow-moving",
                fish_name: "Smarty Salmon",
                fish_img_path: "/assets/fishes/salmon.svg",
            },
            {
                fish_type: "Seahorse",
                fish_description:
                    "Too structured and conservative for the Shark's fast-paced ambition",
                fish_name: "Snazzy Seahorse",
                fish_img_path: "/assets/fishes/seahorse.svg",
            },
        ],
        fun_fact: {
            number: 120,
            text: "Likes to be a boss",
        },
        jobs: [
            "Marketing Manager",
            "Advertising Executive",
            "Entrepreneur/Founder",
            "Business Consultant",
            "Sales Manager",
            "Project Manager",
            "Financial Analyst",
            "Insurance Agent",
            "Lawyer",
            "Investment Banking",
        ],
        their_thoughts: [
            "“If there’s no path, I’ll make one.”",
            "“Comfort zones are cages.”",
            "“I’d rather regret action than inaction.”",
            "You don’t chase dreams — you build them.",
        ],
    },
    Clownfish: {
        type: "ESF",
        fish: {
            fish_type: "Clownfish",
            fish_description: "For creative spark and social harmony",
            fish_name: "Visty Clownfish",
            fish_img_path: "/assets/fishes/clownfish.svg",
        },
        primary_color: "#F47A23",
        header_color: "#FECD61",
        background_color: "#FAF7EF",
        orientation_label_color: "#E4660C",
        orientation_likelihood_label_color: "#E4660C",
        orientation_very_likely_scale_color: "#FF964A",
        orientation_somewhat_likely_scale_color: "#FFD485",
        orientation_indicator_color: "#E4660C",
        traits: [
            "Social",
            "Vibrant",
            "Nurturing",
            "Practical",
            "Enthusiastic",
            "Friendly",
            "Observant",
            "Supportive",
            "Cooperative",
            "Harmonious",
            "Tactful",
            "Empathetic",
        ],
        quote: "Our middle name is 'Upsell.' Literally.",
        most_compatible: [
            {
                fish_type: "Seahorse",
                fish_description:
                    "Too structured and conservative for the Shark's fast-paced ambition",
                fish_name: "Snazzy Seahorse",
                fish_img_path: "/assets/fishes/seahorse.svg",
            },
            {
                fish_type: "Dolphin",
                fish_description: "For emotional support and social bonding",
                fish_name: "Zesty Dolphin",
                fish_img_path: "/assets/fishes/dolphin.svg",
            },
        ],
        their_thoughts: [
            "“Let’s add more color.”",
            "“Feelings are facts.”",
            "“Rules? I prefer guidelines.”",
            "You bring imagination to life — and life to the imagination.",
        ],
        least_compatible: [
            {
                fish_type: "Swordfish",
                fish_description: "Too blunt and pragmatic",
                fish_name: "Difi Swordfish",
                fish_img_path: "/assets/fishes/swordfish.svg",
            },
            {
                fish_type: "Salmon",
                fish_description: "Too cautious and slow-moving",
                fish_name: "Smarty Salmon",
                fish_img_path: "/assets/fishes/salmon.svg",
            },
        ],
        fun_fact: {
            number: 120,
            text: "Master of communication",
        },
        jobs: [
            "Human Resources Manager",
            "Teacher/Professor",
            "Nurse/Doctor",
            "Sales Manager",
            "Social Worker",
            "Event Planner",
            "Public Relations Specialist",
            "Customer Service",
            "Nonprofit Director",
            "Fundraising Manager",
        ],
        quick_intro: [
            "In any space where color, connection, and expression thrive, you’ll find the Visty Clownfish. Energetic, imaginative, and full of heart, Clownfish embody the Artistic (A) career personality type — creative, expressive, and intuitive.",
            "Clownfish in the wild are known for their vivid appearance and their ability to form symbiotic relationships with others — much like you. You bring light to the room and harmony to the group. Whether through design, dialogue, or emotion, you communicate with flair and authenticity.",
            "With a Creativity & Empathy Index of 89%, you excel in environments where people, ideas, and visuals matter. You don't just think outside the box — you decorate it, give it meaning, and make it feel like home.",
            "You thrive when given space to imagine, to play, and to influence the emotional landscape around you. For you, work must mean something, and impact is best measured in joy, inspiration, or beauty.",
        ],
    },
    Salmon: {
        type: "INT",
        fish: {
            fish_type: "Salmon",
            fish_description: "Too cautious and slow-moving",
            fish_name: "Smarty Salmon",
            fish_img_path: "/assets/fishes/salmon.svg",
        },
        primary_color: "#AA4C7D",
        header_color: "#FE76B4",
        background_color: "#F7EFFA",
        orientation_label_color: "#AA4C7D",
        orientation_likelihood_label_color: "#AA4C7D",
        orientation_very_likely_scale_color: "#FE76B4",
        orientation_somewhat_likely_scale_color: "#FFC0CB",
        orientation_indicator_color: "#AA4C7D",
        their_thoughts: [
            "“What’s the pattern here?”",
            "“I’ll need some time to think about that.”",
            "“Data first, decisions second.”",
            "You seek understanding — and often find breakthrough.",
        ],
        traits: [
            "Resilient",
            "Independent",
            "Determined",
            "Logical",
            "Analytical",
            "Theoretical",
            "Strategic",
            "Conceptual",
            "Curious",
            "Problem-solving",
            "Innovative",
            "Knowledge-seeker",
        ],
        quick_intro: [
            "When quiet determination meets deep curiosity, you’ll find the Smarty Salmon swimming upstream with purpose. Independent, thoughtful, and mentally agile, Salmon embodies the Investigative (I) career personality type — analytical, observant, and intellectually driven.",
            "Much like the salmon’s epic migration journey, you are built for meaningful pursuit. You’re not afraid of challenge if it leads to understanding. You’re deeply motivated by the pursuit of truth, logic, and solutions that make sense — not just noise.",
            "With a Focus & Learning Index of 88%, you thrive in environments where thinking is rewarded, facts matter, and depth is preferred over drama. You don’t seek the spotlight — you seek clarity. But when you speak, others listen.",
            "You don’t follow trends; you follow evidence. While others may rush ahead, you pause to ask why — and uncover insights that change the direction for everyone.",
        ],
        quote: "Who needs a 9-5 when you have 24/7?",
        most_compatible: [
            {
                fish_type: "Seahorse",
                fish_description:
                    "Too structured and conservative for the Shark's fast-paced ambition",
                fish_name: "Snazzy Seahorse",
                fish_img_path: "/assets/fishes/seahorse.svg",
            },
            {
                fish_type: "Dolphin",
                fish_description: "For emotional support and social bonding",
                fish_name: "Zesty Dolphin",
                fish_img_path: "/assets/fishes/dolphin.svg",
            },
        ],
        least_compatible: [
            {
                fish_type: "Shark",
                fish_description: "For insight and thoughtful planning",
                fish_name: "Yappy Shark",
                fish_img_path: "/assets/fishes/shark.svg",
            },
            {
                fish_type: "Clownfish",
                fish_description: "For creative spark and social harmony",
                fish_name: "Visty Clownfish",
                fish_img_path: "/assets/fishes/clownfish.svg",
            },
        ],
        fun_fact: {
            number: 90,
            text: "Likes psychological counseling",
        },
        jobs: [
            "Scientist",
            "Researcher",
            "Data Analyst",
            "Software Developer",
            "Systems Analyst",
            "Technical Writer",
            "Engineer",
            "Financial Analyst",
            "Lawyer",
        ],
    },
    Dolphin: {
        type: "ENF",
        fish: {
            fish_type: "Dolphin",
            fish_description: "For emotional support and social bonding",
            fish_name: "Zesty Dolphin",
            fish_img_path: "/assets/fishes/dolphin.svg",
        },
        their_thoughts: [
            "“Everyone deserves to feel included.”",
            "“Let’s check in on how they’re doing.”",
            "“Helping people is the real win.”",
            "You lead with kindness — and leave people better than you found them.",
        ],
        primary_color: "#6962AC",
        header_color: "#A3A3F0",
        background_color: "#F3EFFA",
        orientation_label_color: "#5E55B1",
        orientation_likelihood_label_color: "#6962AC",
        orientation_very_likely_scale_color: "#8E86D8",
        orientation_somewhat_likely_scale_color: "#D0C0ED",
        orientation_indicator_color: "#5E55B1",
        traits: [
            "Social",
            "Intelligent",
            "Empathetic",
            "Enthusiastic",
            "Idealistic",
            "Creative",
            "Expressive",
            "Warm",
            "Inspirational",
            "Perceptive",
            "Adaptable",
            "Persuasive",
        ],
        quick_intro: [
            "Wherever collaboration, laughter, and empathy flow, you’ll likely find a Zesty Dolphin leading the way. Bright, sociable, and deeply tuned into others, Dolphins embody the Social (S) career personality type — caring, cooperative, and people-first.",
            "In the wild, dolphins are known for their playfulness and complex communication. Much like you, they thrive in pods and create harmony within the group. You bring people together and help them feel heard, seen, and included — traits that make you an emotional anchor in any team.",
            "With a Community & Compassion Index of 91%, you excel in roles that involve care, teaching, service, or team engagement. You’re most energized when contributing to others’ growth and well-being. Your work is a reflection of your heart. You don’t just support — you empower. Whether it's through listening, teaching, or uniting, you inspire connection and trust.",
        ],
        quote: "Give me a canvas, and I shall create a world",
        most_compatible: [
            {
                fish_type: "Seahorse",
                fish_description:
                    "Too structured and conservative for the Shark's fast-paced ambition",
                fish_name: "Snazzy Seahorse",
                fish_img_path: "/assets/fishes/seahorse.svg",
            },
            {
                fish_type: "Clownfish",
                fish_description: "For creative spark and social harmony",
                fish_name: "Visty Clownfish",
                fish_img_path: "/assets/fishes/clownfish.svg",
            },
        ],
        least_compatible: [
            {
                fish_type: "Salmon",
                fish_description: "Too cautious and slow-moving",
                fish_name: "Smarty Salmon",
                fish_img_path: "/assets/fishes/salmon.svg",
            },
            {
                fish_type: "Swordfish",
                fish_description: "Too blunt and pragmatic",
                fish_name: "Difi Swordfish",
                fish_img_path: "/assets/fishes/swordfish.svg",
            },
        ],
        fun_fact: {
            number: 130,
            text: "Loves traveling",
        },
        jobs: [
            "Public Relations Specialist",
            "Marketing Manager",
            "Human Resources Manager",
            "Psychologist",
            "School Counselor",
            "Event Planner",
            "Artist/Composer",
            "Journalist",
            "Social Worker",
            "Nonprofit Director",
            "Creative Director",
        ],
    },
    Swordfish: {
        type: "EST",
        fish: {
            fish_type: "Swordfish",
            fish_description: "Too blunt and pragmatic",
            fish_name: "Difi Swordfish",
            fish_img_path: "/assets/fishes/swordfish.svg",
        },
        primary_color: "#F23F3A",
        header_color: "#F37D7A",
        background_color: "#FFF4F3",
        orientation_label_color: "#DF4413",
        orientation_likelihood_label_color: "#DF4413",
        orientation_very_likely_scale_color: "#F37D7A",
        orientation_somewhat_likely_scale_color: "#FBC3C1",
        orientation_indicator_color: "#DF4413",
        their_thoughts: [
            "“Give me a mission, not a meeting.”",
            "“Why wait when you can act now?”",
            "“I prefer steel-toe boots over dress shoes.”",
            "You’re not here for chatter. You’re here to execute. Every task is a chance to prove something to yourself — not for ego, but for momentum.",
        ],
        traits: [
            "Adventurous",
            "Energetic",
            "Speedy",
            "Decisive",
            "Efficient",
            "Confident",
            "Organized",
            "Direct",
            "Action-oriented",
            "Realistic",
            "Agile",
            "Pragmatic",
        ],
        quick_intro: [
            "If anyone is spotted slicing through the waves with unmatched speed and a thirst for adventure, it's the Difi Swordfish. With their bold spirit, agile minds, and unwavering determination, they embody the essence of the Realistic (R) career personality type — fast, fearless, and focused.",
            "Swordfish don’t follow the school—they carve their own path. Like their oceanic namesake, they are solitary, strong, and bold — known for their speed, power, and precision. In life and career, Swordfish move with intention, diving headfirst into challenges while others hesitate.",
            "You are bold, practical, and always ready for action. With a Grit and Autonomy Index of 87%, you thrive in environments that demand skill, focus, and courage. Your strength lies in converting energy into motion and ideas into real outcomes.",
            "You're the type who thrives on decisive moments. While others wait for approval, you act. While others study the map, you're already halfway there. Your momentum isn’t chaos — it’s clarity in motion.",
        ],
        quote: "Comfort zone? Never heard of it.",
        most_compatible: [
            {
                fish_type: "Shark",
                fish_description: "For insight and thoughtful planning",
                fish_name: "Yappy Shark",
                fish_img_path: "/assets/fishes/shark.svg",
            },
            {
                fish_type: "Salmon",
                fish_description: "Too cautious and slow-moving",
                fish_name: "Smarty Salmon",
                fish_img_path: "/assets/fishes/salmon.svg",
            },
        ],
        least_compatible: [
            {
                fish_type: "Clownfish",
                fish_description: "For creative spark and social harmony",
                fish_name: "Visty Clownfish",
                fish_img_path: "/assets/fishes/clownfish.svg",
            },
            {
                fish_type: "Dolphin",
                fish_description: "For emotional support and social bonding",
                fish_name: "Zesty Dolphin",
                fish_img_path: "/assets/fishes/dolphin.svg",
            },
        ],
        fun_fact: {
            number: 120,
            text: "Loves traveling",
        },
        jobs: [
            "Operations Manager",
            "Sales Manager",
            "Project Manager",
            "Real Estate Developer",
            "Detective",
            "HSE Inspector",
            "Construction Manager",
            "Supply Chain Manager",
            "Entrepreneur",
        ],
    },
    // Octopus: {
    //     type: "IST",
    //     fish: {
    //         fish_type: "Octopus",
    //         fish_name: "Ele Octopus",
    //         fish_img_path: "/assets/fishes/octopus.svg",
    //     },
    //     primary_color: "#DAA520",
    //     header_color: "#FFF4BD",
    //     background_color: "#FFFEF8",
    //     orientation_label_color: "#CB9204",
    //     orientation_likelihood_label_color: "#CB9204",
    //     orientation_very_likely_scale_color: "#F1B92D",
    //     orientation_somewhat_likely_scale_color: "#FFDA7C",
    //     orientation_indicator_color: "#CB9204",
    //     traits: [
    //         "Meticulous",
    //         "Practical",
    //         "Reliable",
    //         "Systematic",
    //         "Logical",
    //         "Reserved",
    //         "Detail-oriented",
    //         "Responsible",
    //         "Calm",
    //         "Factual",
    //         "Consistent",
    //         "Efficient",
    //     ],
    //     quote: "We talk to machines because humans are too unpredictable",
    //     most_compatible: [
    //         {
    //             fish_type: "Salmon",
    // fish_description: "Too cautious and slow-moving",
    //             fish_name: "Smarty Salmon",
    //             fish_img_path: "/assets/fishes/salmon.svg",
    //         },
    //         {
    //             fish_type: "Shark",
    // fish_description: "For insight and thoughtful planning",
    //             fish_name: "Yappy Shark",
    //             fish_img_path: "/assets/fishes/shark.svg",
    //         },
    //     ],
    //     least_compatible: [
    //         {
    //             fish_type: "Dolphin",
    // fish_description: "For emotional support and social bonding",
    //             fish_name: "Zesty Dolphin",
    //             fish_img_path: "/assets/fishes/dolphin.svg",
    //         },
    //         {
    //             fish_type: "Beluga",
    //             fish_name: "Mellow Beluga",
    //             fish_img_path: "/assets/fishes/beluga.svg",
    //         },
    //     ],
    //     fun_fact: {
    //         number: 105,
    //         text: "Nerves of steel",
    //     },
    //     jobs: [
    //         "Mechanical Engineer",
    //         "IT Specialist",
    //         "Software Developer",
    //         "Accountant",
    //         "Data Analyst",
    //         "Systems Administrator",
    //         "Academic Researcher",
    //         "Architect",
    //         "Quality Controller",
    //     ],
    // },
    Seahorse: {
        type: "INF",
        fish: {
            fish_type: "Seahorse",
            fish_description:
                "Too structured and conservative for the Shark's fast-paced ambition",
            fish_name: "Snazzy Seahorse",
            fish_img_path: "/assets/fishes/seahorse.svg",
        },
        primary_color: "#2876BB",
        header_color: "#5BA7EB",
        background_color: "#E4EFFF",
        orientation_label_color: "#2A6BA5",
        orientation_likelihood_label_color: "#2876BB",
        orientation_very_likely_scale_color: "#5BA7EB",
        orientation_somewhat_likely_scale_color: "#8FC7FA",
        orientation_indicator_color: "#2A6BA5",
        their_thoughts: [
            "“Let’s make a checklist.”",
            "“I’d rather be thorough than fast.”",
            "“Trust is built with consistency.”",
            "You don’t cut corners — you build the cornerstones.",
        ],
        quick_intro: [
            "Gentle in nature but firm in purpose, the Steady Seahorse thrives where detail, care, and service come first. Reliable, thoughtful, and highly supportive, Seahorses embody the Conventional (C) career personality type — structured, loyal, and quietly determined.",
            "Much like their real-life counterparts, who anchor themselves in turbulent currents, Seahorse personalities are steady forces within any group or system. You value precision, stability, and doing things the right way — even when no one’s watching.",
            "With a Consistency & Integrity Index of 90%, you bring organization and order to chaos. You’re the dependable one, the careful planner, the person others trust when outcomes matter and responsibility runs deep.",
            "You don’t seek the limelight, but you shine through discipline and dependability. For you, meaningful work is about building systems, supporting others, and staying true to your principles.",
        ],
        traits: [
            "Gentle",
            "Insightful",
            "Empathetic",
            "Compassionate",
            "Unique",
            "Creative",
            "Reflective",
            "Idealistic",
            "Imaginative",
            "Intuitive",
            "Harmonious",
            "Visionary",
        ],
        quote: "Living life one Gantt chart at a time",
        most_compatible: [
            {
                fish_type: "Clownfish",
                fish_description: "For creative spark and social harmony",
                fish_name: "Visty Clownfish",
                fish_img_path: "/assets/fishes/clownfish.svg",
            },
            {
                fish_type: "Salmon",
                fish_description: "Too cautious and slow-moving",
                fish_name: "Smarty Salmon",
                fish_img_path: "/assets/fishes/salmon.svg",
            },
        ],
        least_compatible: [
            {
                fish_type: "Shark",
                fish_description: "For insight and thoughtful planning",
                fish_name: "Yappy Shark",
                fish_img_path: "/assets/fishes/shark.svg",
            },
            {
                fish_type: "Swordfish",
                fish_description: "Too blunt and pragmatic",
                fish_name: "Difi Swordfish",
                fish_img_path: "/assets/fishes/swordfish.svg",
            },
        ],
        fun_fact: {
            number: 95,
            text: "Likes psychological counseling",
        },
        jobs: [
            "Writer/Editor",
            "Artist/Composer",
            "Counselor",
            "Psychologist",
            "Journalist",
            "Social Worker",
            "Nonprofit Manager",
            "Therapist",
            "Teacher/Professor",
        ],
    },
    // Beluga: {
    //     type: "ISF",
    //     fish: {
    //         fish_type: "Beluga",
    //         fish_name: "Mellow Beluga",
    //         fish_img_path: "/assets/fishes/beluga.svg",
    //     },
    //     primary_color: "#00A6E1",
    //     header_color: "#6FCFEE",
    //     background_color: "#EAFCFF",
    //     orientation_label_color: "#1C5A70",
    //     orientation_likelihood_label_color: "#007098",
    //     orientation_very_likely_scale_color: "#5BB6D3",
    //     orientation_somewhat_likely_scale_color: "#B1D8EB",
    //     orientation_indicator_color: "#1C5A70",
    //     traits: [
    //         "Social",
    //         "Sympathetic",
    //         "Playful",
    //         "Cooperative",
    //         "Adaptable",
    //         "Caring",
    //         "Supportive",
    //         "Patient",
    //         "Modest",
    //         "Practical",
    //         "Loyal",
    //         "Detail-oriented",
    //     ],
    //     quote: "Fueled by empathy and coffee",
    //     most_compatible: [
    //         {
    //             fish_type: "Dolphin",
    //fish_description: "For emotional support and social bonding",
    //             fish_name: "Zesty Dolphin",
    //             fish_img_path: "/assets/fishes/dolphin.svg",
    //         },
    //         {
    //             fish_type: "Seahorse",
    //fish_description: "Too structured and conservative for the Shark's fast-paced ambition",
    //             fish_name: "Snazzy Seahorse",
    //             fish_img_path: "/assets/fishes/seahorse.svg",
    //         },
    //     ],
    //     least_compatible: [
    //         {
    //             fish_type: "Swordfish",
    //fish_description: "Too blunt and pragmatic",
    //             fish_name: "Difi Swordfish",
    //             fish_img_path: "/assets/fishes/swordfish.svg",
    //         },
    //         {
    //             fish_type: "Octopus",
    //             fish_name: "Ele Octopus",
    //             fish_img_path: "/assets/fishes/octopus.svg",
    //         },
    //     ],
    //     fun_fact: {
    //         number: 120,
    //         text: "Master of communication",
    //     },
    //     jobs: [
    //         "Nurse",
    //         "Librarian",
    //         "Social Worker",
    //         "Therapist",
    //         "Counselor",
    //         "Teacher/Professor",
    //         "Customer Service",
    //         "Administrative Assistant",
    //         "Doctor",
    //     ],
    // },
};

export function getJungTypologyData(type: string): JungTypologyData | null {
    return jungTypologyMap[type] || null;
}

export function getTraitsByOceanScore(
    oceanScores: SurveyResult["ocean_scores"],
): string[] {
    if (!oceanScores) {
        return [];
    }
    const traits: string[] = [];

    const traitCategories: Array<{
        score: number | null;
        ranges: Array<{ min: number; max: number; traits: string[] }>;
    }> = [
        {
            score: oceanScores.O,
            ranges: [
                {
                    min: 0,
                    max: 20,
                    traits: ["Grounded", "Consistent"],
                },
                {
                    min: 20,
                    max: 40,
                    traits: ["Practical", "Focused on Now"],
                },
                {
                    min: 40,
                    max: 60,
                    traits: ["Curious", "Appreciates Variety"],
                },
                {
                    min: 60,
                    max: 80,
                    traits: ["Creative", "Visionary"],
                },
                {
                    min: 80,
                    max: 100,
                    traits: ["Highly Imaginative", "Trailblazing"],
                },
            ],
        },
        {
            score: oceanScores.C,
            ranges: [
                {
                    min: 0,
                    max: 20,
                    traits: ["Flexible", "Adaptable"],
                },
                { min: 20, max: 40, traits: ["Easy-going", "Relaxed Pace"] },
                {
                    min: 40,
                    max: 60,
                    traits: ["Orderly", "Dependable"],
                },
                {
                    min: 60,
                    max: 80,
                    traits: ["Self-Disciplined", "Detail-Oriented"],
                },
                {
                    min: 80,
                    max: 100,
                    traits: ["Highly Diligent", "Meticulous"],
                },
            ],
        },
        {
            score: oceanScores.E,
            ranges: [
                {
                    min: 0,
                    max: 20,
                    traits: ["Thoughtful", "Self-Sufficient"],
                },
                { min: 20, max: 40, traits: ["Independent", "Reflective"] },
                {
                    min: 40,
                    max: 60,
                    traits: ["Engaged", "Naturally Outgoing"],
                },
                {
                    min: 60,
                    max: 80,
                    traits: ["Assertive", "Enthusiastic"],
                },
                {
                    min: 80,
                    max: 100,
                    traits: ["Highly Expressive", "Dynamic"],
                },
            ],
        },
        {
            score: oceanScores.A,
            ranges: [
                {
                    min: 0,
                    max: 20,
                    traits: ["Autonomous", "Challenges Status Quo"],
                },
                {
                    min: 20,
                    max: 40,
                    traits: ["Objective", "Stands Up for Self"],
                },
                { min: 40, max: 60, traits: ["Warm-Hearted", "Cooperative"] },
                {
                    min: 60,
                    max: 80,
                    traits: ["Empathetic", "Trusting"],
                },
                {
                    min: 80,
                    max: 100,
                    traits: ["Highly Compassionate", "Harmony-Focused"],
                },
            ],
        },
        {
            score: oceanScores.N,
            ranges: [
                { min: 0, max: 20, traits: ["Poised", "Highly Resilient"] },
                {
                    min: 20,
                    max: 40,
                    traits: ["Calm", "Steady Under Pressure"],
                },
                {
                    min: 40,
                    max: 60,
                    traits: ["Perceptive", "Situationally Vigilant"],
                },
                {
                    min: 60,
                    max: 80,
                    traits: ["Highly Sensitive", "Deeply Aware"],
                },
                {
                    min: 80,
                    max: 100,
                    traits: ["Attuned to Risk", "Heightened Self-Awareness"],
                },
            ],
        },
    ];

    traitCategories.forEach(({ score, ranges }) => {
        // An unscored trait is null; it must contribute no descriptors rather
        // than falling into the 0-20 band and inventing them.
        if (typeof score !== "number" || !Number.isFinite(score)) {
            return;
        }
        const matchingRange = ranges.find(
            (range) => score >= range.min && score <= range.max,
        );
        if (matchingRange) {
            traits.push(...matchingRange.traits);
        }
    });

    return traits;
}
