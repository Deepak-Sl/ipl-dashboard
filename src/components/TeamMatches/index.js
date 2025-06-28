import './index.css'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import {PieChart, Pie, Legend, Tooltip, Cell} from 'recharts'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

const COLORS = ['#28a745', '#dc3545', '#ffc107']

class TeamMatches extends Component {
  state = {
    latestteamData: {},
    recentMatchData: [],
    isLoader: true,
    id: '',
  }

  componentDidMount() {
    this.getTeamData()
  }

  getTeamData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const latestData = {
      teamBannerUrl: data.team_banner_url,
      umpires: data.latest_match_details.umpires,
      result: data.latest_match_details.result,
      manOfTheMatch: data.latest_match_details.man_of_the_match,
      id: data.latest_match_details.id,
      date: data.latest_match_details.date,
      venue: data.latest_match_details.venue,
      competingTeam: data.latest_match_details.competing_team,
      competingTeamLogo: data.latest_match_details.competing_team_logo,
      firstInnings: data.latest_match_details.first_innings,
      secondInnings: data.latest_match_details.second_innings,
      matchStatus: data.latest_match_details.match_status,
    }

    const recentMatches = data.recent_matches.map(each => ({
      result: each.result,
      id: each.id,
      competingTeam: each.competing_team,
      competingTeamLogo: each.competing_team_logo,
      firstInnings: each.first_innings,
      secondInnings: each.second_innings,
      matchStatus: each.match_status,
    }))

    this.setState({
      latestteamData: latestData,
      recentMatchData: recentMatches,
      id,
      isLoader: false,
    })
  }

  getChartData = () => {
    const {recentMatchData} = this.state
    const won = recentMatchData.filter(match => match.matchStatus === 'Won')
      .length
    const lost = recentMatchData.filter(match => match.matchStatus === 'Lost')
      .length
    const drawn = recentMatchData.filter(match => match.matchStatus === 'Drawn')
      .length

    return [
      {name: 'Won', value: won},
      {name: 'Lost', value: lost},
      {name: 'Drawn', value: drawn},
    ]
  }

  renderPieChart = () => {
    const data = this.getChartData()

    return (
      <div className="pie-chart-container">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label
          >
            {data.map(entry => (
              <Cell
                key={entry.name}
                fill={
                  COLORS[
                    data.findIndex(d => d.name === entry.name) % COLORS.length
                  ]
                }
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </div>
    )
  }

  render() {
    const {latestteamData, recentMatchData, id, isLoader} = this.state
    const {teamBannerUrl} = latestteamData
    const background = id.toLowerCase()

    return (
      <div className={`team-matches-container ${background}`}>
        {isLoader ? (
          <div className="loader" data-testid="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          <>
            <img
              className="each-team-img"
              src={teamBannerUrl}
              alt="team banner"
            />
            <h1 className="latest-match-heading">Team Statistics</h1>
            {this.renderPieChart()}
            <h1 className="heading-2">Latest Matches</h1>
            <LatestMatch latestMatchData={latestteamData} />
            <ul className="recent-match-container">
              {recentMatchData.map(each => (
                <MatchCard key={each.id} matchDetails={each} />
              ))}
            </ul>
          </>
        )}
        <Link to="/" className="link">
          <button type="button" className="back-btn">
            Back
          </button>
        </Link>
      </div>
    )
  }
}

export default TeamMatches
