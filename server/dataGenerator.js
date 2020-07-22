const { v4: uuidv4 } = require('uuid');

const categories = {
    homeNeeds: 'Home Needs',
    homeAppliances: 'Home Appliances',
    consumerGoods: 'Consumer Goods',
    aviation: 'Aviation',
    electronics: 'Electronics'
}

const productNames = [
    'Needle Steel',
    'Boeing Max 300 APX', 'Samsung Monitor', 'Wallet PE',
    'Fictional Name', 'Vivekananda Mini Statue', 'Key Shiner', 'Vaseline Pack Jumbo',
    'MSI Graphics Card', 'Business Deal', 'KitKat', 'Motorola EdgePlus', 'Bulbs Yellow',
    'Floor Magnet 34X', 'Surf Excel', 'Closeup', 'Stapler QW23', 'Luxor Marker Red',
    'Floppy Crusher L56', 'SSD EVO857 Samsung', 'Charger 345', 'Cello PinPoint',
    'LG Freeze', 'Samsung Freeze', 'Washing machine LSM', 'Flower Pot M'
];

const pickCategory = () => {
    const categoryCodes = Object.keys(categories);
    const categoryNames = Object.values(categories);

    const position =Math.floor(Math.random() * categoryCodes.length);

    return {
        name: categoryNames[position],
        code: categoryCodes[position]
    }
}

const generateData = () => {
    const data = [];
    for (let i=0; i < 300; i++) {
        const cat = pickCategory();

        data.push({
            productId: uuidv4(),
            productName: productNames[Math.floor(Math.random() *productNames.length)],
            category: cat.name,
            categoryCode: cat.code,
            pricePerUnit: Math.floor(Math.random() * 5000),
            shelfNumber: `SH${Math.floor(Math.random()*100)}`,
            vendorLink: 'https://vendor.example.com',
            quantity: Math.floor(Math.random() * 200),
        });
    }

    return {
        categories: categories,
        data: data
    }
}

module.exports = generateData
