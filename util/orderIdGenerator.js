// utils/orderIdGenerator.js

/**
 * Generates a random alphanumeric string of a given length.
 * @param {number} length - The length of the ID code (default 6).
 * @returns {string} The generated code.
 */
const generateRandomCode = (length = 6) => {
    // Contains uppercase letters, lowercase letters, and numbers
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

/**
 * Generates a unique, custom Order ID with the format #XXXXXX.
 * It checks the database to prevent collisions.
 * * @param {MongooseModel} OrderModel - The Mongoose model (e.g., OrderCheckout).
 * @returns {Promise<string>} The unique custom Order ID (e.g., #A1bC2d).
 */
const generateUniqueCustomOrderId = async (OrderModel) => {
    let customId;
    let isUnique = false;
    let attempts = 0;
    const MAX_ATTEMPTS = 5; 

    while (!isUnique && attempts < MAX_ATTEMPTS) {
        // Generate the 6-character code
        const generatedCode = generateRandomCode(6);
        customId = `#${generatedCode}`;

        // Check the database for an existing ID
        const existingOrder = await OrderModel.findOne({ customOrderId: customId });

        if (!existingOrder) {
            isUnique = true;
        }
        attempts++;
    }

    if (!isUnique) {
        // Throw an error if a unique ID cannot be generated after max attempts
        throw new Error("Failed to generate a unique custom Order ID after multiple attempts.");
    }
    
    return customId;
};

module.exports = {
    generateUniqueCustomOrderId,
};