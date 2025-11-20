class GimmeAHook {
    static hookGenerator = new GimmeAHook();

    constructor(genre = "fantasy", hookType = "adventure", length = "short", description = "", excludedStrings = []) {
        this.defaultGenre = genre;
        this.defaultHookType = hookType;
        this.defaultLength = length;
        this.defaultDescription = description;
        this.excludedStrings = excludedStrings;
        this.sessionHooks = [];
    }

    /**
     * Generates a plot hook based on the provided parameters.
     *
     * @param {string} [genre="fantasy"] The genre of the plot hook.
     * @param {string} [hookType="adventure"] The type of adventure (e.g., "adventure", "mystery", "horror").
     * @param {string} [length="short"] The length of the plot hook (e.g., "short", "medium", "long").
     * @param {string} [description=""] An optional description to guide the hook generation.
     * @param {string[]} [excludedStrings=[]] An array of strings to exclude from the generated hook.
     * @returns {string | null} The generated plot hook, or null if an error occurred.
     */
    async generatePlotHook(genre = this.defaultGenre, hookType = this.defaultHookType, length = this.defaultLength, description = this.defaultDescription, excludedStrings = this.excludedStrings) {
        let promptContent = `Generate a`;

        if (length != "")
            promptContent = `${promptContent} ${length}`;
        if (genre != "")
            promptContent = `${promptContent} ${genre}`;
        if (hookType != "")
            promptContent = `${promptContent} ${hookType}`;
        promptContent = `${promptContent} plot hook. Be creative and engaging. Do not use any other responses.`

        if (description != "")
            promptContent = `${promptContent} ${description}.`;
        if (excludedStrings.length > 0)
            promptContent = `${promptContent} Do not include: ${excludedStrings.join(', ')}.`


        promptContent = `${promptContent} Make it completely unique, nothing like the previous responses.`
        try {
            const prompt = await IntegrateAI.stringToUserMessage(promptContent);


            const messages = await IntegrateAI.combineUniqueArrays(this.sessionHooks, [prompt]);

            const response = await IntegrateAI.chatWithAI(messages);
            const plotHook = response.content;


            this.sessionHooks.push(IntegrateAI.combineUniqueArrays([response], this.sessionHooks));


            return plotHook;
        } catch (error) {
            console.error("Error generating plot hook:", error);
            return null;
        }
    }

    /**
     * Generates a sample plot hook using the default parameters.
     *
     * @returns {string | null} A sample plot hook, or null if an error occurred.
     */
    static async generatesSampleHook() {
        let sample = await this.hookGenerator.generatePlotHook();
        console.log(sample);
        return sample;
    }
}
