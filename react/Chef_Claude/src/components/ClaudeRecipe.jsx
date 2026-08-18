function renderInline(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean).map((part, index) => (
    part.startsWith("**") ? <strong key={index}>{part.slice(2, -2)}</strong> : part
  ))
}

function RecipeContent({ recipe }) {
  function renderLines(lines, key) {
    const bulletItems = lines.filter((line) => /^[-*]\s+/.test(line))
    const numberedItems = lines.filter((line) => /^\d+\.\s+/.test(line))

    if (bulletItems.length === lines.length) return <ul key={key}>{bulletItems.map((item, itemIndex) => <li key={itemIndex}>{renderInline(item.replace(/^[-*]\s+/, ""))}</li>)}</ul>
    if (numberedItems.length === lines.length) return <ol key={key}>{numberedItems.map((item, itemIndex) => <li key={itemIndex}>{renderInline(item.replace(/^\d+\.\s+/, ""))}</li>)}</ol>

    return <p key={key}>{renderInline(lines.join(" "))}</p>
  }

  return recipe.trim().split(/\n\s*\n/).filter(Boolean).flatMap((block, index) => {
    const lines = block.trim().split("\n")
    const heading = lines[0].match(/^##\s+(.+)/)
    const subheading = lines[0].match(/^###\s+(.+)/)
    const remainingLines = lines.slice(1).filter(Boolean)

    if (heading || subheading) {
      const Heading = heading ? "h2" : "h3"
      const title = (heading || subheading)[1]
      const elements = [<Heading key={`${index}-heading`}>{renderInline(title)}</Heading>]

      if (remainingLines.length) {
        elements.push(renderLines(remainingLines, `${index}-content`))
      }

      return elements
    }

    return renderLines(lines, index)
  })
}

const ClaudeRecipe = ({ recipe, loading, error }) => {
  if (loading) {
    return <section className="recipe-section"><h2>Chef Claude Recommends:</h2><article className="suggested-recipe-container" aria-live="polite"><p>Creating a recipe from your ingredients...</p></article></section>
  }

  if (error) {
    return <section className="recipe-section"><h2>Chef Claude Recommends:</h2><article className="suggested-recipe-container recipe-error" aria-live="polite"><p>{error}</p></article></section>
  }

  if (!recipe) return null

  return <section className="recipe-section"><h2>Chef Claude Recommends:</h2><article className="suggested-recipe-container" aria-live="polite"><p className="recipe-intro">Based on the ingredients you have on hand, I would recommend:</p><div className="recipe-content"><RecipeContent recipe={recipe} /></div></article></section>
}

export default ClaudeRecipe
