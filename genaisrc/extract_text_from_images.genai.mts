const { output } = env

script({
    title: "Parse Text from images",
    description: "Extract and parse text from images",
    files: ["./sample_images/*.png"],
});

const result: { fileName: string, text: string }[] = []

for (const file of env.files) {
    const { text } = await runPrompt(_ => {
        _.defImages(file, { detail: "high"})
        _.$`Extract text from the image. Only provide the text in Markdown format, no other information.`;
    })
    result.push({ fileName: file.filename, text})
}

output.table(result)