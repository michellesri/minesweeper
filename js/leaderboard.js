class Leaderboard {
  constructor() {
    this.leaderboard = {};
  }

  addWinData(dimension, time) {
    const leaderboardForDimen = this.leaderboard[dimension];
    if (!leaderboardForDimen) {
      this.leaderboard[dimension] = [time];
    } else {
      leaderboardForDimen.push(time);
      leaderboardForDimen.sort();
    }
  }

  getTop10ForDimen(dimension) {
    const leaderboardForDimen = this.leaderboard[dimension];
    if (leaderboardForDimen) {
      return leaderboardForDimen.splice(0, 10);
    }
    return [];
  }
}
