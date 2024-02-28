export const players = [
  {
    "id": 1,
    "name": "Valerio Lundini"
  },
  {
    "id": 2,
    "name": "Daniele Fabbri"
  },
  {
    "id": 3,
    "name": "Daniele Tinti"
  },
  {
    "id": 4,
    "name": "Stefano Rapone"
  },
  {
    "id": 5,
    "name": "Davide Calgaro"
  },
  {
    "id": 6,
    "name": "Carmine Del Grosso"
  },
  {
    "id": 7,
    "name": "Tommaso Faoro"
  },
  {
    "id": 8,
    "name": "Francesco Mileto"
  },
  {
    "id": 9,
    "name": "Giorgia Fumo"
  },
  {
    "id": 10,
    "name": "Eleazaro Rossi"
  },
  {
    "id": 11,
    "name": "Michela Giraud"
  },
  {
    "id": 12,
    "name": "Alessandro Gori"
  }
]
export const teams = [
  {
    "id": 6,
    "defender": {
      "id": 1,
      "name": "Valerio Lundini"
    },
    "striker": {
      "id": 2,
      "name": "Daniele Fabbri"
    }
  },
  {
    "id": 7,
    "defender": {
      "id": 2,
      "name": "Daniele Fabbri"
    },
    "striker": {
      "id": 1,
      "name": "Valerio Lundini"
    }
  },
  {
    "id": 9,
    "defender": {
      "id": 1,
      "name": "Valerio Lundini"
    },
    "striker": {
      "id": 12,
      "name": "Alessandro Gori"
    }
  },
  {
    "id": 13,
    "defender": {
      "id": 2,
      "name": "Daniele Fabbri"
    },
    "striker": {
      "id": 7,
      "name": "Tommaso Faoro"
    }
  },
  {
    "id": 14,
    "defender": {
      "id": 7,
      "name": "Tommaso Faoro"
    },
    "striker": {
      "id": 2,
      "name": "Daniele Fabbri"
    }
  }
]
export const matches = [
  {
    "blue": {
      "id": 1,
      "striker": "Valerio Lundini",
      "defender": "Daniele Fabbri",
      "score": 0,
      "name": "Team 1"
    },
    "red": {
      "id": 4,
      "striker": "Giorgia Fumo",
      "defender": "Michela Giraud",
      "score": 0,
      "name": "Team 4"
    },
    "id": 2,
    "status": "ongoing"
  },
  {
    "blue": {
      "id": 1,
      "striker": "Valerio Lundini",
      "defender": "Daniele Fabbri",
      "score": 0,
      "name": "Team 1"
    },
    "red": {
      "id": 3,
      "striker": "Daniele Tinti",
      "defender": "Stefano Rapone",
      "score": 0,
      "name": "Team 3"
    },
    "id": 1,
    "status": "preparing"
  },
  {
    "blue": {
      "id": 1,
      "striker": "Valerio Lundini",
      "defender": "Daniele Fabbri",
      "score": 4,
      "name": "Team 1"
    },
    "red": {
      "id": 4,
      "striker": "Giorgia Fumo",
      "defender": "Michela Giraud",
      "score": 4,
      "name": "Team 4"
    },
    "id": 5,
    "status": "ended"
  },
  {
    "blue": {
      "id": 4,
      "striker": "Giorgia Fumo",
      "defender": "Michela Giraud",
      "score": 0,
      "name": "Team 4"
    },
    "red": {
      "id": 1,
      "striker": "Valerio Lundini",
      "defender": "Daniele Fabbri",
      "score": 0,
      "name": "Team 1"
    },
    "id": 6,
    "status": "preparing"
  },
  {
    "blue": {
      "id": 3,
      "striker": "Daniele Tinti",
      "defender": "Stefano Rapone",
      "score": 0,
      "name": "Team 3"
    },
    "red": {
      "id": 4,
      "striker": "Giorgia Fumo",
      "defender": "Michela Giraud",
      "score": 0,
      "name": "Team 4"
    },
    "id": 7,
    "status": "preparing"
  }
]
export const defenders = [
  {
    "id": 1,
    "name": "Valerio Lundini",
    "goalsConceded": 2,
    "goalsConcededPerMatch": 2,
    "gamesPlayed": 1
  },
  {
    "id": 10,
    "name": "Eleazaro Rossi",
    "goalsConceded": 2,
    "goalsConcededPerMatch": 2,
    "gamesPlayed": 1
  },
  {
    "id": 4,
    "name": "Stefano Rapone",
    "goalsConceded": 4,
    "goalsConcededPerMatch": 2,
    "gamesPlayed": 2
  },
  {
    "id": 6,
    "name": "Carmine Del Grosso",
    "goalsConceded": 3,
    "goalsConcededPerMatch": 3,
    "gamesPlayed": 1
  },
  {
    "id": 9,
    "name": "Giorgia Fumo",
    "goalsConceded": 4,
    "goalsConcededPerMatch": 4,
    "gamesPlayed": 1
  },
  {
    "id": 8,
    "name": "Francesco Mileto",
    "goalsConceded": 8,
    "goalsConcededPerMatch": 4,
    "gamesPlayed": 2
  },
  {
    "id": 11,
    "name": "Michela Giraud",
    "goalsConceded": 13,
    "goalsConcededPerMatch": 4.33,
    "gamesPlayed": 3
  },
  {
    "id": 2,
    "name": "Daniele Fabbri",
    "goalsConceded": 9,
    "goalsConcededPerMatch": 4.5,
    "gamesPlayed": 2
  },
  {
    "id": 7,
    "name": "Tommaso Faoro",
    "goalsConceded": 7,
    "goalsConcededPerMatch": 7,
    "gamesPlayed": 1
  }
]
export const strikers = [
  {
    "id": 12,
    "name": "Alessandro Gori",
    "goalsScored": 12,
    "goalsScoredPerMatch": 6,
    "gamesPlayed": 2
  },
  {
    "id": 9,
    "name": "Giorgia Fumo",
    "goalsScored": 12,
    "goalsScoredPerMatch": 4,
    "gamesPlayed": 3
  },
  {
    "id": 5,
    "name": "Davide Calgaro",
    "goalsScored": 4,
    "goalsScoredPerMatch": 4,
    "gamesPlayed": 1
  },
  {
    "id": 1,
    "name": "Valerio Lundini",
    "goalsScored": 7,
    "goalsScoredPerMatch": 3.5,
    "gamesPlayed": 2
  },
  {
    "id": 3,
    "name": "Daniele Tinti",
    "goalsScored": 10,
    "goalsScoredPerMatch": 3.33,
    "gamesPlayed": 3
  },
  {
    "id": 7,
    "name": "Tommaso Faoro",
    "goalsScored": 6,
    "goalsScoredPerMatch": 3,
    "gamesPlayed": 2
  },
  {
    "id": 2,
    "name": "Daniele Fabbri",
    "goalsScored": 1,
    "goalsScoredPerMatch": 1,
    "gamesPlayed": 1
  }
]
export const rankings = [
  {
    "striker": {
      "id": 3,
      "name": "Daniele Tinti"
    },
    "defender": {
      "id": 4,
      "name": "Stefano Rapone"
    },
    "id": 3,
    "points": 6,
    "goalsScored": 6,
    "goalsConceded": 4,
    "gamesPlayed": 2,
    "name": "Team 3"
  },
  {
    "striker": {
      "id": 12,
      "name": "Alessandro Gori"
    },
    "defender": {
      "id": 9,
      "name": "Giorgia Fumo"
    },
    "id": 11,
    "points": 3,
    "goalsScored": 7,
    "goalsConceded": 4,
    "gamesPlayed": 1,
    "name": "Team 11"
  },
  {
    "striker": {
      "id": 9,
      "name": "Giorgia Fumo"
    },
    "defender": {
      "id": 2,
      "name": "Daniele Fabbri"
    },
    "id": 9,
    "points": 3,
    "goalsScored": 6,
    "goalsConceded": 5,
    "gamesPlayed": 1,
    "name": "Team 9"
  },
  {
    "striker": {
      "id": 5,
      "name": "Davide Calgaro"
    },
    "defender": {
      "id": 6,
      "name": "Carmine Del Grosso"
    },
    "id": 6,
    "points": 3,
    "goalsScored": 4,
    "goalsConceded": 3,
    "gamesPlayed": 1,
    "name": "Team 6"
  },
  {
    "striker": {
      "id": 1,
      "name": "Valerio Lundini"
    },
    "defender": {
      "id": 10,
      "name": "Eleazaro Rossi"
    },
    "id": 5,
    "points": 3,
    "goalsScored": 3,
    "goalsConceded": 2,
    "gamesPlayed": 1,
    "name": "Team 5"
  },
  {
    "striker": {
      "id": 1,
      "name": "Valerio Lundini"
    },
    "defender": {
      "id": 2,
      "name": "Daniele Fabbri"
    },
    "id": 1,
    "points": 1,
    "goalsScored": 4,
    "goalsConceded": 4,
    "gamesPlayed": 1,
    "name": "Team 1"
  },
  {
    "striker": {
      "id": 9,
      "name": "Giorgia Fumo"
    },
    "defender": {
      "id": 11,
      "name": "Michela Giraud"
    },
    "id": 4,
    "points": 1,
    "goalsScored": 6,
    "goalsConceded": 7,
    "gamesPlayed": 2,
    "name": "Team 4"
  },
  {
    "striker": {
      "id": 12,
      "name": "Alessandro Gori"
    },
    "defender": {
      "id": 11,
      "name": "Michela Giraud"
    },
    "id": 8,
    "points": 0,
    "goalsScored": 5,
    "goalsConceded": 6,
    "gamesPlayed": 1,
    "name": "Team 8"
  },
  {
    "striker": {
      "id": 2,
      "name": "Daniele Fabbri"
    },
    "defender": {
      "id": 1,
      "name": "Valerio Lundini"
    },
    "id": 2,
    "points": 0,
    "goalsScored": 1,
    "goalsConceded": 2,
    "gamesPlayed": 1,
    "name": "Team 2"
  },
  {
    "striker": {
      "id": 7,
      "name": "Tommaso Faoro"
    },
    "defender": {
      "id": 8,
      "name": "Francesco Mileto"
    },
    "id": 7,
    "points": 0,
    "goalsScored": 6,
    "goalsConceded": 8,
    "gamesPlayed": 2,
    "name": "Team 7"
  },
  {
    "striker": {
      "id": 3,
      "name": "Daniele Tinti"
    },
    "defender": {
      "id": 7,
      "name": "Tommaso Faoro"
    },
    "id": 10,
    "points": 0,
    "goalsScored": 4,
    "goalsConceded": 7,
    "gamesPlayed": 1,
    "name": "Team 10"
  }
]
export const match = {
  "blue": {
    "id": 1,
    "striker": "Valerio Lundini",
    "defender": "Daniele Fabbri",
    "score": 0,
    "name": "Team 1"
  },
  "red": {
    "id": 4,
    "striker": "Giorgia Fumo",
    "defender": "Michela Giraud",
    "score": 0,
    "name": "Team 4"
  },
  "id": 2,
  "status": "ongoing"
}