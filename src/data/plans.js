export const WORKOUT_PLANS = {
    beginner: {
        bulking: {
            days: [
                {
                    name: "Upper Body Power",
                    exercises: [
                        { id: 1, name: "Push ups", sets: 3, reps: "10-12", muscle: "Chest/Triceps" },
                        { id: 2, name: "Dumbbell Press", sets: 3, reps: "10", muscle: "Chest" },
                        { id: 3, name: "Lat Pulldowns", sets: 3, reps: "12", muscle: "Back" },
                        { id: 4, name: "Overhead Press", sets: 3, reps: "10", muscle: "Shoulders" },
                        { id: 5, name: "Bicep Curls", sets: 2, reps: "12", muscle: "Arms" }
                    ]
                },
                {
                    name: "Lower Body Foundation",
                    exercises: [
                        { id: 1, name: "Bodyweight Squats", sets: 4, reps: "15", muscle: "Quads" },
                        { id: 2, name: "Lunges", sets: 3, reps: "10/leg", muscle: "Glutes" },
                        { id: 3, name: "Glute Bridges", sets: 3, reps: "15", muscle: "Glutes" },
                        { id: 4, name: "Calf Raises", sets: 3, reps: "20", muscle: "Calves" },
                        { id: 5, name: "Plank", sets: 3, reps: "45s", muscle: "Core" }
                    ]
                },
                {
                    name: "Full Body Bloom",
                    exercises: [
                        { id: 1, name: "Incline Pushups", sets: 3, reps: "12", muscle: "Upper Chest" },
                        { id: 2, name: "Seated Rows", sets: 3, reps: "12", muscle: "Back" },
                        { id: 3, name: "Leg Press", sets: 3, reps: "12", muscle: "Legs" },
                        { id: 4, name: "Hammer Curls", sets: 2, reps: "15", muscle: "Arms" },
                        { id: 5, name: "Deadbugs", sets: 3, reps: "12", muscle: "Core" }
                    ]
                }
            ]
        },
        cutting: {
            days: [
                {
                    name: "Full Body Circuit",
                    exercises: [
                        { id: 1, name: "Jumping Jacks", sets: 3, reps: "60s", muscle: "Cardio" },
                        { id: 2, name: "Goblet Squats", sets: 3, reps: "15", muscle: "Legs" },
                        { id: 3, name: "Mountain Climbers", sets: 3, reps: "45s", muscle: "Core" },
                        { id: 4, name: "Dumbbell Rows", sets: 3, reps: "12", muscle: "Back" },
                        { id: 5, name: "Burpees", sets: 3, reps: "10", muscle: "Full Body" }
                    ]
                },
                {
                    name: "Cardio & Core",
                    exercises: [
                        { id: 1, name: "High Knees", sets: 4, reps: "45s", muscle: "Cardio" },
                        { id: 2, name: "Plank Jacks", sets: 3, reps: "30s", muscle: "Core" },
                        { id: 3, name: "Side Planks", sets: 3, reps: "30s/side", muscle: "Obliques" },
                        { id: 4, name: "Shadow Boxing", sets: 3, reps: "120s", muscle: "Endurance" },
                        { id: 5, name: "Russian Twists", sets: 3, reps: "20", muscle: "Core" }
                    ]
                },
                {
                    name: "Metabolic Burn",
                    exercises: [
                        { id: 1, name: "Speed Squats", sets: 3, reps: "20", muscle: "Legs" },
                        { id: 2, name: "Pushup to T-Rotation", sets: 3, reps: "10", muscle: "Chest/Core" },
                        { id: 3, name: "Alternating Lunges", sets: 3, reps: "16", muscle: "Legs" },
                        { id: 4, name: "Superman Holds", sets: 3, reps: "30s", muscle: "Back" },
                        { id: 5, name: "Bicycle Crunches", sets: 3, reps: "30", muscle: "Core" }
                    ]
                }
            ]
        }
    },
    intermediate: {
        bulking: {
            days: [
                {
                    name: "Push Day (Heavy)",
                    exercises: [
                        { id: 1, name: "Bench Press", sets: 4, reps: "6-8", muscle: "Chest" },
                        { id: 2, name: "Incline DB Press", sets: 3, reps: "10", muscle: "Upper Chest" },
                        { id: 3, name: "Military Press", sets: 3, reps: "8-10", muscle: "Shoulders" },
                        { id: 4, name: "Tricep Dips", sets: 3, reps: "12", muscle: "Triceps" },
                        { id: 5, name: "Lateral Raises", sets: 4, reps: "15", muscle: "Shoulders" }
                    ]
                },
                {
                    name: "Pull Day (Volume)",
                    exercises: [
                        { id: 1, name: "Deadlifts", sets: 3, reps: "5", muscle: "Posterior" },
                        { id: 2, name: "Weighted Pull-ups", sets: 3, reps: "8", muscle: "Back" },
                        { id: 3, name: "Barbell Rows", sets: 4, reps: "10", muscle: "Back" },
                        { id: 4, name: "Hammer Curls", sets: 3, reps: "12", muscle: "Biceps" },
                        { id: 5, name: "Face Pulls", sets: 3, reps: "15", muscle: "Rear Delts" }
                    ]
                },
                {
                    name: "Leg Day (Foundation)",
                    exercises: [
                        { id: 1, name: "Back Squats", sets: 4, reps: "8", muscle: "Quads" },
                        { id: 2, name: "Romanian Deadlifts", sets: 4, reps: "10", muscle: "Hamstrings" },
                        { id: 3, name: "Leg Extensions", sets: 3, reps: "12", muscle: "Quads" },
                        { id: 4, name: "Seated Calf Raises", sets: 4, reps: "15", muscle: "Calves" },
                        { id: 5, name: "Cable Crunches", sets: 3, reps: "15", muscle: "Abs" }
                    ]
                }
            ]
        },
        cutting: {
            days: [
                {
                    name: "Upper Body Hypertrophy",
                    exercises: [
                        { id: 1, name: "Incline Bench", sets: 4, reps: "10", muscle: "Chest" },
                        { id: 2, name: "Pull-ups", sets: 3, reps: "failure", muscle: "Back" },
                        { id: 3, name: "Arnold Press", sets: 3, reps: "12", muscle: "Shoulders" },
                        { id: 4, name: "Cable Flys", sets: 3, reps: "15", muscle: "Chest" },
                        { id: 5, name: "Pushdowns", sets: 3, reps: "15", muscle: "Triceps" }
                    ]
                },
                {
                    name: "Lower Body Shred",
                    exercises: [
                        { id: 1, name: "Front Squats", sets: 4, reps: "12", muscle: "Quads" },
                        { id: 2, name: "Walking Lunges", sets: 3, reps: "20", muscle: "Legs" },
                        { id: 3, name: "Leg Curls", sets: 3, reps: "15", muscle: "Hamstrings" },
                        { id: 4, name: "Calf Raises", sets: 4, reps: "20", muscle: "Calves" },
                        { id: 5, name: "Hanging Leg Raises", sets: 3, reps: "15", muscle: "Abs" }
                    ]
                },
                {
                    name: "High Intensity Pull",
                    exercises: [
                        { id: 1, name: "Bent Over Rows", sets: 4, reps: "12", muscle: "Back" },
                        { id: 2, name: "Lat Pulldowns", sets: 3, reps: "12", muscle: "Back" },
                        { id: 3, name: "Face Pulls", sets: 3, reps: "20", muscle: "Delts" },
                        { id: 4, name: "Preacher Curls", sets: 3, reps: "12", muscle: "Biceps" },
                        { id: 5, name: "Plank with Shoulder Taps", sets: 3, reps: "60s", muscle: "Core" }
                    ]
                }
            ]
        }
    },
    advanced: {
        bulking: {
            days: [
                {
                    name: "Leg Protocol (Max)",
                    exercises: [
                        { id: 1, name: "Barbell Squats", sets: 5, reps: "3-5", muscle: "Quads" },
                        { id: 2, name: "RDLs", sets: 4, reps: "8", muscle: "Hamstrings" },
                        { id: 3, name: "Leg Press", sets: 3, reps: "12-15", muscle: "Quads" },
                        { id: 4, name: "Leg Curls", sets: 3, reps: "15", muscle: "Hamstrings" },
                        { id: 5, name: "Weighted Calf Raises", sets: 5, reps: "12", muscle: "Calves" }
                    ]
                },
                {
                    name: "Chest & Back Elite",
                    exercises: [
                        { id: 1, name: "Incline Barbell", sets: 5, reps: "5", muscle: "Chest" },
                        { id: 2, name: "Weighted Pullups", sets: 5, reps: "6", muscle: "Back" },
                        { id: 3, name: "Flat DB Flys", sets: 3, reps: "12", muscle: "Chest" },
                        { id: 4, name: "T-Bar Rows", sets: 4, reps: "8", muscle: "Back" },
                        { id: 5, name: "Cable Pullovers", sets: 3, reps: "15", muscle: "Lats" }
                    ]
                },
                {
                    name: "Arm & Shoulder Overload",
                    exercises: [
                        { id: 1, name: "Military Press", sets: 5, reps: "5", muscle: "Shoulders" },
                        { id: 2, name: "Barbell Curls", sets: 4, reps: "10", muscle: "Biceps" },
                        { id: 3, name: "Close Grip Bench", sets: 4, reps: "10", muscle: "Triceps" },
                        { id: 4, name: "Lateral Raises", sets: 4, reps: "20", muscle: "Shoulders" },
                        { id: 5, name: "Skull Crushers", sets: 3, reps: "12", muscle: "Triceps" }
                    ]
                }
            ]
        },
        cutting: {
            days: [
                {
                    name: "High Intensity Shred",
                    exercises: [
                        { id: 1, name: "Deadlifts", sets: 5, reps: "5", muscle: "Full Body" },
                        { id: 2, name: "Box Jumps", sets: 4, reps: "10", muscle: "Explosive" },
                        { id: 3, name: "KB Swings", sets: 4, reps: "20", muscle: "Core/Glutes" },
                        { id: 4, name: "Sprints", sets: 5, reps: "100m", muscle: "Conditioning" }
                    ]
                },
                {
                    name: "Upper Body Burnout",
                    exercises: [
                        { id: 1, name: "Pushups to failure", sets: 4, reps: "Max", muscle: "Chest" },
                        { id: 2, name: "Chin ups", sets: 4, reps: "Max", muscle: "Back" },
                        { id: 3, name: "Dumbbell Snatch", sets: 4, reps: "12/side", muscle: "Power" },
                        { id: 4, name: "Battle Ropes", sets: 4, reps: "45s", muscle: "Conditioning" },
                        { id: 5, name: "Hanging Leg Raises", sets: 4, reps: "20", muscle: "Abs" }
                    ]
                },
                {
                    name: "Lactic Acid Protocol",
                    exercises: [
                        { id: 1, name: "Split Squats", sets: 4, reps: "15/side", muscle: "Legs" },
                        { id: 2, name: "Renegade Rows", sets: 4, reps: "12", muscle: "Back/Abs" },
                        { id: 3, name: "Thrusters", sets: 3, reps: "15", muscle: "Full Body" },
                        { id: 4, name: "Medicine Ball Slams", sets: 4, reps: "20", muscle: "Explosive" },
                        { id: 5, name: "Burpee Pullups", sets: 3, reps: "10", muscle: "Full Body" }
                    ]
                }
            ]
        }
    }
};

export const DIET_PLANS = {
    beginner: {
        bulking: {
            targetCalories: 2600,
            macros: { protein: "140g", carbs: "300g", fats: "70g" },
            veg: [
                { name: "Breakfast", time: "8:00 AM", calories: 600, items: "Oats with nuts, seeds, and banana" },
                { name: "Lunch", time: "1:00 PM", calories: 800, items: "Paneer Butter Masala, 3 Roti, Rice & Dal" },
                { name: "Snack", time: "4:30 PM", calories: 400, items: "Roasted Chickpeas & Greek Yogurt" },
                { name: "Dinner", time: "8:00 PM", calories: 800, items: "Soya Chunks Stir-fry with Brown Rice" }
            ],
            nonVeg: [
                { name: "Breakfast", time: "8:00 AM", calories: 600, items: "4 Eggs, Whole Wheat Toast & Juice" },
                { name: "Lunch", time: "1:00 PM", calories: 800, items: "Chicken Curry, 3 Roti, Rice & Salad" },
                { name: "Snack", time: "4:30 PM", calories: 400, items: "Peanut Butter Sandwich & Whey Shake" },
                { name: "Dinner", time: "8:00 PM", calories: 800, items: "Fish Fillet, Quinoa & Steamed Veg" }
            ]
        },
        cutting: {
            targetCalories: 1800,
            macros: { protein: "120g", carbs: "180g", fats: "50g" },
            veg: [
                { name: "Breakfast", time: "8:00 AM", calories: 400, items: "Sprouted Moong Salad & Green Tea" },
                { name: "Lunch", time: "1:00 PM", calories: 600, items: "Mixed Lettuce Salad, Dal Soup & 1 Roti" },
                { name: "Snack", time: "4:30 PM", calories: 200, items: "Apple & Handful of Almonds" },
                { name: "Dinner", time: "8:00 PM", calories: 600, items: "Grilled Tofu with Sautéed Spinach" }
            ],
            nonVeg: [
                { name: "Breakfast", time: "8:00 AM", calories: 400, items: "Egg White Omelet with Spinach" },
                { name: "Lunch", time: "1:00 PM", calories: 600, items: "Grilled Chicken Breast, Broccoli & salad" },
                { name: "Snack", time: "4:30 PM", calories: 200, items: "Greek Yogurt & Berries" },
                { name: "Dinner", time: "8:00 PM", calories: 600, items: "Lean Fish & Steamed Asparagus" }
            ]
        }
    },
    intermediate: {
        bulking: {
            targetCalories: 3200,
            macros: { protein: "180g", carbs: "400g", fats: "90g" },
            veg: [
                { name: "High-Cal Breakfast", time: "7:30 AM", calories: 800, items: "Double Paneer paratha & Curd" },
                { name: "Lunch", time: "12:30 PM", calories: 1000, items: "Rajma Chawal, Paneer Tikka & salad" },
                { name: "Post-Work", time: "5:00 PM", calories: 600, items: "Banana Shake, Nuts & Dates" },
                { name: "Dinner", time: "9:00 PM", calories: 800, items: "Tofu Fried Rice with extra veggies" }
            ],
            nonVeg: [
                { name: "Power Breakfast", time: "7:30 AM", calories: 800, items: "Omelet, Sausages & Sweet Potato" },
                { name: "Lunch", time: "12:30 PM", calories: 1000, items: "Mutton/Chicken Biryani & Raita" },
                { name: "Post-Work", time: "5:00 PM", calories: 600, items: "Beef Jerky or Chicken Sandwich & Whey" },
                { name: "Dinner", time: "9:00 PM", calories: 800, items: "Grilled Salmon, Mash & Veg" }
            ]
        },
        cutting: {
            targetCalories: 2200,
            macros: { protein: "160g", carbs: "220g", fats: "60g" },
            veg: [
                { name: "Breakfast", time: "8:00 AM", calories: 500, items: "Moong Dal Chilla & Green Tea" },
                { name: "Lunch", time: "1:00 PM", calories: 700, items: "Quinoa Pulao with Soya Chunks" },
                { name: "Snack", time: "4:30 PM", calories: 300, items: "Greek Yogurt with half an apple" },
                { name: "Dinner", time: "8:00 PM", calories: 700, items: "Zucchini Noodles with Tofu Scramble" }
            ],
            nonVeg: [
                { name: "Breakfast", time: "8:00 AM", calories: 500, items: "Egg White Scramble with Avocado" },
                { name: "Lunch", time: "1:00 PM", calories: 700, items: "Baked Chicken with Asparagus" },
                { name: "Snack", time: "4:30 PM", calories: 300, items: "Cottage Cheese with Berries" },
                { name: "Dinner", time: "8:00 PM", calories: 700, items: "Grilled Sea Bass with Greens" }
            ]
        }
    },
    advanced: {
        bulking: {
            targetCalories: 4000,
            macros: { protein: "220g", carbs: "550g", fats: "110g" },
            veg: [
                { name: "Macro Peak", time: "7:00 AM", calories: 1200, items: "Mass Gainer Shake & Heavy Paratha" },
                { name: "Protocol Lunch", time: "12:00 PM", calories: 1400, items: "Double Paneer Meal & Soya" },
                { name: "Fueling", time: "4:00 PM", calories: 700, items: "Cheese Sandwich & Nuts" },
                { name: "Dinner", time: "8:30 PM", calories: 700, items: "Pasta with Tofu & veggies" }
            ],
            nonVeg: [
                { name: "Elite Fuel", time: "7:00 AM", calories: 1200, items: "Steak & Eggs with Toast" },
                { name: "Heavy Lunch", time: "12:00 PM", calories: 1400, items: "Double Chicken portion & Brown Rice" },
                { name: "Refuel", time: "4:00 PM", calories: 700, items: "Tuna Salad & Sweet Potato" },
                { name: "Dinner", time: "8:30 PM", calories: 700, items: "Venison/Lean Beef & Quinoa" }
            ]
        },
        cutting: {
            targetCalories: 2800,
            macros: { protein: "220g", carbs: "300g", fats: "80g" },
            veg: [
                { name: "Elite Cut (B)", time: "7:00 AM", calories: 600, items: "Whey Isolate & 30g Almonds" },
                { name: "Metabolic Lunch", time: "12:00 PM", calories: 900, items: "Tempeh Steak with Broccoli" },
                { name: "Fast Refuel", time: "4:00 PM", calories: 600, items: "Cottage Cheese & Walnuts" },
                { name: "Dinner", time: "8:30 PM", calories: 700, items: "Cauliflower Steak with Paneer cubes" }
            ],
            nonVeg: [
                { name: "Advanced Shred", time: "7:00 AM", calories: 600, items: "Salmon Fillet & Broccoli" },
                { name: "Lean Lunch", time: "12:00 PM", calories: 900, items: "Turkey Breast with Kale Salad" },
                { name: "Protein Snack", time: "4:00 PM", calories: 600, items: "Egg Whites & lean Ham slice" },
                { name: "Elite Dinner", time: "8:30 PM", calories: 700, items: "Lobster/Shellfish with Asparagus" }
            ]
        }
    }
};
