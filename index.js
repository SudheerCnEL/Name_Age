exports.handler = async (data, context) => {
    // Check if both name and age are provided and valid
    if (data.name && typeof data.name === "string" && data.age && typeof data.age === "number") {
        console.debug(`A name of length ${data.name.length} and age ${data.age} have arrived into the Function.`);

        // Process the decrypted name and age, and re-encrypt both using the encrypt function
        return {
            message: `Hello from a Function! Your name has ${data.name.length} letters, and you are ${data.age} years old.`,
            name: context.encrypt(data.name),
            age: context.encrypt(data.age)
        };
    } else {
        console.debug('Missing or invalid name or age in the Function input.');

        return {
            message: 'Hello from a Function! Send encrypted `name` (string) and `age` (number) parameters to show Function decryption in action.'
        };
    }
};