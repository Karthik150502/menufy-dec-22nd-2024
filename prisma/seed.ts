import prisma from "../src/lib/prisma/db";
import { DishStatus } from "@prisma/client";





const dishes = [
    {
        name: "Paneer Butter Masala", description: "A rich and creamy curry with chunks of cottage cheese.", price: 250, status: DishStatus.AVAILABLE, categoryId: "cm58fi7yk0000uh9wspnhwnih", restaurantId: 2
    },
    {
        name: "Chocolate Brownie", description: "A moist and fudgy chocolate dessert.", price: 120, status: DishStatus.AVAILABLE, categoryId: "cm58fi7yk0001uh9wjghq7g57", restaurantId: 3 // Appu Restaurant
    },
    {
        name: "Chicken Biryani", description: "Aromatic rice cooked with chicken and spices.", price: 300, status: DishStatus.INPREPARATION, categoryId: "cm58fi7yk0002uh9wagqxfack", restaurantId: 2 // Raymond Delicacies
    },
    {
        name: "Pav Bhaji", description: "A spicy vegetable mash served with buttery bread rolls.", price: 180, status: DishStatus.AVAILABLE, categoryId: "cm58fi7yk0003uh9w4m3si5rv",
        restaurantId: 3 // Appu Restaurant
    },
    {
        name: "Mango Ice Cream", description: "A creamy mango-flavored frozen dessert.", price: 100, status: DishStatus.UNAVAILABLE, categoryId: "cm58fi7yk0001uh9wjghq7g57",
        restaurantId: 3 // Default Restaurant
    },
    {
        name: "Grilled Chicken", description: "Perfectly grilled chicken with a smoky flavor.", price: 350, status: DishStatus.AVAILABLE, categoryId: "cm58fi7yk0002uh9wagqxfack", restaurantId: 2 // Raymond Delicacies
    },
    {
        name: "Dhokla", description: "A steamed savory cake made from fermented rice and chickpea flour.", price: 90, status: DishStatus.INPREPARATION, categoryId: "cm58fi7yk0000uh9wspnhwnih",
        restaurantId: 2
    },
    {
        name: "Masala Dosa", description: "A thin rice pancake filled with spiced potatoes.", price: 150, status: DishStatus.AVAILABLE, categoryId: "cm58fi7yk0000uh9wspnhwnih",
        restaurantId: 2
    },
    {
        name: "Gulab Jamun", description: "Soft and sweet milk-solid balls soaked in sugar syrup.", price: 60, status: DishStatus.UNAVAILABLE, categoryId: "cm58fi7yk0001uh9wjghq7g57", restaurantId: 3 // Raymond Delicacies
    },
    {
        name: "Fish Curry", description: "A spicy and tangy curry made with fresh fish.", price: 280, status: DishStatus.AVAILABLE, categoryId: "cm58fi7yk0002uh9wagqxfack", restaurantId: 2 // Raymond Delicacies
    },
    { name: "Paneer Butter Masala", description: "Rich and creamy cottage cheese curry.", price: 250, status: DishStatus.AVAILABLE, categoryId: "cm58fi7yk0000uh9wspnhwnih", restaurantId: 2 },
    { name: "Chocolate Brownie", description: "Moist chocolate dessert.", price: 120, status: DishStatus.AVAILABLE, categoryId: "cm58fi7yk0001uh9wjghq7g57", restaurantId: 3 },
    { name: "Chicken Biryani", description: "Spiced rice with chicken.", price: 300, status: DishStatus.INPREPARATION, categoryId: "cm58fi7yk0002uh9wagqxfack", restaurantId: 2 },
    { name: "Pav Bhaji", description: "Spicy mash with buttery bread rolls.", price: 180, status: DishStatus.AVAILABLE, categoryId: "cm58fi7yk0003uh9w4m3si5rv", restaurantId: 3 },
    { name: "Mango Ice Cream", description: "Creamy mango dessert.", price: 100, status: DishStatus.UNAVAILABLE, categoryId: "cm58fi7yk0001uh9wjghq7g57", restaurantId: 3 },
    { name: "Grilled Chicken", description: "Perfectly grilled with smoky flavor.", price: 350, status: DishStatus.AVAILABLE, categoryId: "cm58fi7yk0002uh9wagqxfack", restaurantId: 3 },
    { name: "Dhokla", description: "Steamed savory rice cake.", price: 90, status: DishStatus.INPREPARATION, categoryId: "cm58fi7yk0000uh9wspnhwnih", restaurantId: 2 },
    { name: "Masala Dosa", description: "Thin pancake with spiced potatoes.", price: 150, status: DishStatus.AVAILABLE, categoryId: "cm58fi7yk0000uh9wspnhwnih", restaurantId: 2 },
    { name: "Gulab Jamun", description: "Milk-solid balls in syrup.", price: 60, status: DishStatus.UNAVAILABLE, categoryId: "cm58fi7yk0001uh9wjghq7g57", restaurantId: 3 },
    { name: "Fish Curry", description: "Spicy tangy curry with fish.", price: 280, status: DishStatus.AVAILABLE, categoryId: "cm58fi7yk0002uh9wagqxfack", restaurantId: 3 },
    { name: "Vegetable Soup", description: "Freshly cooked vegetable broth.", price: 120, status: DishStatus.AVAILABLE, categoryId: "cm58fi7yk0000uh9wspnhwnih", restaurantId: 2 },
    { name: "Vanilla Ice Cream", description: "Classic vanilla frozen dessert.", price: 90, status: DishStatus.AVAILABLE, categoryId: "cm58fi7yk0001uh9wjghq7g57", restaurantId: 3 },
    { name: "Egg Curry", description: "Hard-boiled eggs in spicy gravy.", price: 180, status: DishStatus.INPREPARATION, categoryId: "cm58fi7yk0002uh9wagqxfack", restaurantId: 3 },
    { name: "Sev Puri", description: "Crispy puris topped with spicy chutneys.", price: 100, status: DishStatus.AVAILABLE, categoryId: "cm58fi7yk0003uh9w4m3si5rv", restaurantId: 2 },
    { name: "Butter Naan", description: "Soft buttery Indian bread.", price: 40, status: DishStatus.AVAILABLE, categoryId: "cm58fi7yk0000uh9wspnhwnih", restaurantId: 2 },
    { name: "Chocolate Mousse", description: "Airy chocolate dessert.", price: 150, status: DishStatus.AVAILABLE, categoryId: "cm58fi7yk0001uh9wjghq7g57", restaurantId: 3 },
    { name: "Tandoori Chicken", description: "Chicken marinated and roasted.", price: 350, status: DishStatus.AVAILABLE, categoryId: "cm58fi7yk0002uh9wagqxfack", restaurantId: 3 },
    { name: "Rajma Chawal", description: "Kidney beans with rice.", price: 200, status: DishStatus.AVAILABLE, categoryId: "cm58fi7yk0000uh9wspnhwnih", restaurantId: 2 },
    { name: "Rasgulla", description: "Soft cheese balls in syrup.", price: 70, status: DishStatus.AVAILABLE, categoryId: "cm58fi7yk0001uh9wjghq7g57", restaurantId: 3 },
    { name: "Pani Puri", description: "Crispy puris filled with flavored water.", price: 90, status: DishStatus.INPREPARATION, categoryId: "cm58fi7yk0003uh9w4m3si5rv", restaurantId: 2 },
    { name: "Mutton Korma", description: "Mutton in a rich creamy gravy.", price: 400, status: DishStatus.AVAILABLE, categoryId: "cm58fi7yk0002uh9wagqxfack", restaurantId: 3 },
    { name: "Hakka Noodles", description: "Stir-fried noodles with vegetables.", price: 180, status: DishStatus.AVAILABLE, categoryId: "cm58fi7yk0000uh9wspnhwnih", restaurantId: 2 },
    { name: "Strawberry Cheesecake", description: "Creamy dessert with strawberry flavor.", price: 200, status: DishStatus.AVAILABLE, categoryId: "cm58fi7yk0001uh9wjghq7g57", restaurantId: 3 },
    { name: "Chicken Kebab", description: "Spiced minced chicken grilled.", price: 220, status: DishStatus.AVAILABLE, categoryId: "cm58fi7yk0002uh9wagqxfack", restaurantId: 3 },
    { name: "Chole Bhature", description: "Spiced chickpeas with fried bread.", price: 180, status: DishStatus.INPREPARATION, categoryId: "cm58fi7yk0000uh9wspnhwnih", restaurantId: 2 },
    { name: "Kulfi", description: "Indian ice cream with cardamom.", price: 80, status: DishStatus.AVAILABLE, categoryId: "cm58fi7yk0001uh9wjghq7g57", restaurantId: 3 },
    { name: "Samosa", description: "Crispy fried snack with spiced filling.", price: 40, status: DishStatus.AVAILABLE, categoryId: "cm58fi7yk0003uh9w4m3si5rv", restaurantId: 3 },
    { name: "Chicken 65", description: "Spicy deep-fried chicken.", price: 250, status: DishStatus.AVAILABLE, categoryId: "cm58fi7yk0002uh9wagqxfack", restaurantId: 3 },
    { name: "Mixed Veg Curry", description: "Curry made with seasonal vegetables.", price: 220, status: DishStatus.AVAILABLE, categoryId: "cm58fi7yk0000uh9wspnhwnih", restaurantId: 2 },
    { name: "Carrot Halwa", description: "Sweet dessert made with grated carrots.", price: 120, status: DishStatus.AVAILABLE, categoryId: "cm58fi7yk0001uh9wjghq7g57", restaurantId: 3 },
    { name: "Dahi Puri", description: "Crispy puris topped with yogurt and chutneys.", price: 100, status: DishStatus.AVAILABLE, categoryId: "cm58fi7yk0003uh9w4m3si5rv", restaurantId: 2 },
    { name: "Fried Fish", description: "Fish coated in spices and fried.", price: 300, status: DishStatus.AVAILABLE, categoryId: "cm58fi7yk0002uh9wagqxfack", restaurantId: 3 },
];


export async function seed() {
    const updatedDishes = dishes.map(dish => ({
        ...dish,
        price: dish.price * 100 // Convert price to paise
    }));
    await prisma.dish.createMany({
        data: updatedDishes
    })

    // await prisma.dish.deleteMany()
}

seed().then(() => {
    console.log("Dishes seeded successfully");
}).catch(() => {
    console.log("Error seeding dishes");
    process.exit(1)
})