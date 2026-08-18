import React from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL || "gemini-3.6-flash"
const TRANSIENT_STATUS_CODES = new Set([429, 500, 502, 503, 504])
const MAX_GEMINI_ATTEMPTS = 3

function wait(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

function extractRecipeText(responseData) {
    return responseData.steps
        ?.filter((step) => step.type === "model_output")
        .flatMap((step) => step.content || [])
        .filter((content) => content.type === "text")
        .map((content) => content.text)
        .join("")
        .trim() || ""
}

const Main = () => {
    const [ingredients, setIngredients] = React.useState([
        
    ])

    const [recipeShown, setRecipeShown] = React.useState(false)
    const [recipeText, setRecipeText] = React.useState("")
    const [isGeneratingRecipe, setIsGeneratingRecipe] = React.useState(false)
    const [recipeError, setRecipeError] = React.useState("")

    async function generateRecipe() {
        if (ingredients.length === 0) {
            return
        }

        setRecipeShown(true)
        setIsGeneratingRecipe(true)
        setRecipeError("")
        setRecipeText("")

        const prompt = `You are Chef Claude, a warm and practical cooking assistant. Create one concise recipe using the ingredients the user has on hand: ${ingredients.join(", ")}.

Return Markdown only, using exactly this structure:
## Recipe title

A brief, inviting one-sentence introduction.

### Ingredients
- ingredient with a practical quantity

### Instructions
1. Clear step-by-step instruction

Use sensible pantry staples only when necessary and label them as optional. Do not add a preamble, code fence, nutrition section, or closing remarks.`

        try {
            if (!GEMINI_API_KEY) {
                throw new Error("Gemini API key is missing. Add VITE_GEMINI_API_KEY to your .env.local file and restart the dev server.")
            }

            for (let attempt = 1; attempt <= MAX_GEMINI_ATTEMPTS; attempt++) {
                const response = await fetch(
                    "https://generativelanguage.googleapis.com/v1beta/interactions",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "x-goog-api-key": GEMINI_API_KEY,
                        },
                        body: JSON.stringify({
                            model: GEMINI_MODEL,
                            input: prompt,
                            generation_config: {
                                temperature: 0.7,
                            },
                        }),
                    }
                )

                if (response.ok) {
                    const data = await response.json()
                    const generatedRecipe = extractRecipeText(data)

                    if (!generatedRecipe) {
                        throw new Error("The model did not return any recipe text.")
                    }

                    setRecipeText(generatedRecipe)
                    return
                }

                const errorText = await response.text()
                const shouldRetry = TRANSIENT_STATUS_CODES.has(response.status)

                if (!shouldRetry || attempt === MAX_GEMINI_ATTEMPTS) {
                    throw new Error(`Gemini request failed (${response.status}): ${errorText}`)
                }

                await wait(attempt * 750)
            }
        } catch (error) {
            console.error(error)
            setRecipeError(
                error.message || "Something went wrong while generating the recipe."
            )
        } finally {
            setIsGeneratingRecipe(false)
        }
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        if (newIngredient.trim() !== "") {
            setIngredients((preIngredients) => [...preIngredients, newIngredient])
        }
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 && (
                <IngredientsList
                    ingredients={ingredients}
                    toggleRecipeShown={generateRecipe}
                />
            )}

            {recipeShown && (
                <ClaudeRecipe
                    recipe={recipeText}
                    loading={isGeneratingRecipe}
                    error={recipeError}
                />
            )}
        </main>
    )
}

export default Main
