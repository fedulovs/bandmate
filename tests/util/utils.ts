function generateRandomEmail(): string {
    const characters =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;

    function getRandomCharacters(length: number): string {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        return result;
    }

    const localPart = getRandomCharacters(5);
    const domainPart = getRandomCharacters(4);

    return `test-${localPart}@${domainPart}.com`;
}

export default generateRandomEmail;
