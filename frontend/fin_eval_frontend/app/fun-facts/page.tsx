import { loadingFacts } from "@/public/data/funFact"

const FunFacts = () => {
  return (
    <div>
      <ul>
        {loadingFacts.map((fact, e) => (
            <li key={e}>{fact}</li>
        ))}
      </ul>
    </div>
  )
}

export default FunFacts
