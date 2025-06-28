// Write your code here
import './index.css'

const LatestMatch = props => {
  const {latestMatchData} = props
  const {
    competingTeam,
    competingTeamLogo,
    date,
    venue,
    result,
    firstInnings,
    secondInnings,
    manOfTheMatch,
    umpires,
  } = latestMatchData
  return (
    <>
      <p className="text-2">Latest Match</p>
      <div className="latest-match">
        <div>
          <p className="text-1">{competingTeam}</p>
          <p className="text-1">{date}</p>
          <p className="text-2">{venue}</p>
          <p className="text-2">{result}</p>
        </div>
        <img
          src={competingTeamLogo}
          className="team-logo"
          alt={`latest match ${competingTeam}`}
        />
        <div className="text-cont">
          <p className="text-2">First Innings</p>
          <p className="text-2">{firstInnings}</p>
          <p className="text-2">Second Innings</p>
          <p className="text-2">{secondInnings}</p>
          <p className="text-2">Man Of The Match</p>
          <p className="text-2">{manOfTheMatch}</p>
          <p className="text-2">Umpires</p>
          <p className="text-2">{umpires}</p>
        </div>
      </div>
    </>
  )
}

export default LatestMatch
