import { loadingFacts } from "@/data/funFact"

const FunFacts = () => {
  return (
    <div>
      <ul>
        {loadingFacts.map((fact) => (
            <li>{fact}</li>
        ))}
      </ul>
    </div>
  )
}

export default FunFacts
