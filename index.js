exports.handler = async (data, context) => {
    // Check if all required fields are provided and valid
    if (
        data.name && typeof data.name === "string" &&
        data.email && typeof data.email === "string" &&
        data.amount && typeof data.amount === "number" &&
        data.entry_id && (typeof data.entry_id === "string" || typeof data.entry_id === "number") &&
        data.card && typeof data.card === "string"
    ) {
        console.debug(`Received name: ${data.name}, email: ${data.email}, amount: ${data.amount}, entry_id: ${data.entry_id}, card (encrypted): [hidden]`);

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            throw new Error('Invalid email format');
        }

        // Process the decrypted data
        return {
            message: `Processed transaction for ${data.name} with email ${data.email}. Amount: $${data.amount}, Entry ID: ${data.entry_id}.`,
            name: data.name,
            email: data.email,
            amount: data.amount,
            entry_id: data.entry_id,
            card: context.encrypt(data.card) // Re-encrypt card for secure output
        };
    } else {
        console.debug('Missing or invalid input fields.');

        return {
            message: 'Hello from a Function! Send encrypted `name` (string), `email` (string), `amount` (number), `entry_id` (string or number), and `card` (string) parameters.'
        };
    }
};