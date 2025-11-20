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

    async generatePlotHook(genre = this.defaultGenre, hookType = this.defaultHookType, length = this.defaultLength, description = this.defaultDescription, excludedStrings = this.excludedStrings) {
        var promptContent = `Generate a`
        //promptContent = `Generate a ${length} ${genre} ${hookType} plot hook.  Be creative and engaging. ${description}. Do not include: ${excludedStrings.join(', ')}.`

        if (length != "")
            promptContent = `${promptContent} ${length}`
        if (genre != "")
            promptContent = `${promptContent} ${genre}`
        if (hookType != "")
            promptContent = `${promptContent} ${hookType}`
        promptContent = `${promptContent} plot hook. Be creative and engaging. Do not use any other responses.`

        if (description != "")
            promptContent = `${promptContent} ${description}.`
        if (excludedStrings.length > 0)
            promptContent = `${promptContent} Do not include: ${excludedStrings.join(', ')}.`


        promptContent = `${promptContent} Make it completely unique, nothing like the previous responses.`
        try {
            const prompt = await IntegrateAI.stringToUserMessage(promptContent)


            const messages = await IntegrateAI.combineUniqueArrays(this.sessionHooks, [prompt])

            const response = await IntegrateAI.chatWithAI(messages);
            const plotHook = response.content;


            this.sessionHooks.push(IntegrateAI.combineUniqueArrays([response], this.sessionHooks))


            return plotHook;
        } catch (error) {
            console.error("Error generating plot hook:", error);
            return null;
        }
    }

    static async generatesSampleHook() {
        var sample = await this.hookGenerator.generatePlotHook()
        console.log(sample)
        return sample;
    }
}
