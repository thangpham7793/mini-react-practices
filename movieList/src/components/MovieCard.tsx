import React from "react"

type MovieCardProps = {
  movie: Movie
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { title, distributor, year, amount, ranking, img } = movie

  return (
    <div>
      <h2>{`#${ranking} - ${title} - ${year}`}</h2>
      <img src={img.src} alt={img.alt} width="200" />
      <p>{`Distributor: ${distributor}`}</p>
      <p>{`Amount: ${amount}`}</p>
    </div>
  )
}
