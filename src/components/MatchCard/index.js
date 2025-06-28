// Write your code here
import './index.css'

const MatchCard = props => {
  const {item} = props
  const {competingTeam, competingTeamLogo, result, matchStatus} = item
  const statusColor = matchStatus === 'Won' ? 'won' : 'lost'
  return (
    <li className="items">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="team-logo-w"
      />
      <p className="text-a">{competingTeam}</p>
      <p className="text-b">{result}</p>
      <p className={`text-a ${statusColor}`}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
