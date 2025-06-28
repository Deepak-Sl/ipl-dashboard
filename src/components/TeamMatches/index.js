// Write your code here
import './index.css'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {Component} from 'react'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {
    teamBannerUrl: '',
    latestMatchDetails: null,
    isLoading: true,
    recentMatchesList: [],
  }

  componentDidMount() {
    this.getIplDeatails()
  }

  getIplDeatails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    console.log(data)
    const latestMatchDetails = data.latest_match_details
    const formattedLatestMatchDetails = {
      competingTeam: latestMatchDetails.competing_team,
      competingTeamLogo: latestMatchDetails.competing_team_logo,
      date: latestMatchDetails.date,
      venue: latestMatchDetails.venue,
      result: latestMatchDetails.result,
      firstInnings: latestMatchDetails.first_innings,
      secondInnings: latestMatchDetails.second_innings,
      manOfTheMatch: latestMatchDetails.man_of_the_match,
      umpires: latestMatchDetails.umpires,
    }
    const recentMatches = data.recent_matches
    const formattedRecentMatches = recentMatches.map(eachItem => ({
      id: eachItem.id,
      competingTeam: eachItem.competing_team,
      competingTeamLogo: eachItem.competing_team_logo,
      result: eachItem.result,
      matchStatus: eachItem.match_status,
    }))
    console.log(formattedRecentMatches)
    const teamBannerUrll = data.team_banner_url
    this.setState({
      teamBannerUrl: teamBannerUrll,
      latestMatchDetails: formattedLatestMatchDetails,
      recentMatchesList: formattedRecentMatches,
      isLoading: false,
    })
  }

  render() {
    const {teamBannerUrl, latestMatchDetails, isLoading, recentMatchesList} =
      this.state
    console.log(latestMatchDetails)
    return (
      <>
        {isLoading ? (
          <div data-testid="loader" className="details-page-container">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div className="details-page-container">
            <img src={teamBannerUrl} alt="team banner" className="banner" />
            <LatestMatch item={latestMatchDetails} />
            <ul className="recent-matches-list">
              {recentMatchesList.map(eachItem => (
                <MatchCard item={eachItem} key={eachItem.id} />
              ))}
            </ul>
          </div>
        )}
      </>
    )
  }
}

export default TeamMatches
