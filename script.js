var hash = window.location.hash.split("/");

var id = hash[hash.length-2];
var preset_id = hash[hash.length-1];

var stats = {};

stats.players = [];

loadMatches(1);

function loadMatches(page) {
	var urlToLoad = "/ajax/loadMatches?id=" + id + "&page=" + page + "&preset_id=" + preset_id;
	console.log("Trying to load " + urlToLoad);

	$.getJSON(urlToLoad, function(data) {
		
		console.log("Successfully loaded " + urlToLoad);

		var lastMatchNum = 0;

		$.each(data, function(index, match) {

			lastMatchNum = match.number;
			console.groupCollapsed("Parse match no. " + match.number);
			console.log("Between " + match.summary.winners_text + " and " + match.summary.loosers_text);

			var winners = match.summary.winners_text.split(", ");
			var losers = match.summary.loosers_text.split(", ");

			// process winners

			$.each(winners, function(index, player) {

				player = (player == "SrenKottal279339" ? "Søren Kottal" : player);
				var existingPlayers = stats.players.map(function(p) {
					return p.name;
				});

				var indexOfPlayer = existingPlayers.indexOf(player);
				if (indexOfPlayer > -1) {
					// player already exists, update that one
					var existingTeammates = stats.players[indexOfPlayer].gamesWith.map(function(p) {
						return p.name;
					});

					stats.players[indexOfPlayer].totalGames++;

					$.each(winners, function(index, winner) {
						winner = (winner == "SrenKottal279339" ? "Søren Kottal" : winner);
						if (winner != player) {

							var indexOfTeammate = existingTeammates.indexOf(winner);
							if (indexOfTeammate > -1) {
								stats.players[indexOfPlayer].gamesWith[indexOfTeammate].count++;
								stats.players[indexOfPlayer].gamesWith[indexOfTeammate].winsWith++;
							}
							else {
								var newTeammate = {}
								newTeammate.name = winner;
								newTeammate.count = 1;
								newTeammate.winsOver = 0;
								newTeammate.winsWith = 1;
								newTeammate.defeatsTo = 0;
								newTeammate.defeatsWith = 0;
								stats.players[indexOfPlayer].gamesWith.push(newTeammate);
							}

						}
					});

					$.each(losers, function(index, loser) {
						loser = (loser == "SrenKottal279339" ? "Søren Kottal" : loser);
						if (loser != player) {

							var indexOfTeammate = existingTeammates.indexOf(loser);
							if (indexOfTeammate > -1) {
								stats.players[indexOfPlayer].gamesWith[indexOfTeammate].count++;
								stats.players[indexOfPlayer].gamesWith[indexOfTeammate].winsOver++;
							}
							else {
								var newTeammate = {}
								newTeammate.name = loser;
								newTeammate.count = 1;
								newTeammate.winsOver = 1;
								newTeammate.winsWith = 0;
								newTeammate.defeatsTo = 0;
								newTeammate.defeatsWith = 0;
								stats.players[indexOfPlayer].gamesWith.push(newTeammate);
							}

						}
					});
				}
				else {
					// create player
					var newPlayer = {};
					newPlayer.name = player;
					newPlayer.totalGames = 1;
					newPlayer.gamesWith = [];

					$.each(winners, function(index, winner) {
						winner = (winner == "SrenKottal279339" ? "Søren Kottal" : winner);
						if (winner != player) {

							var newTeammate = {}
							newTeammate.name = winner;
							newTeammate.count = 1;
							newTeammate.winsOver = 0;
							newTeammate.winsWith = 1;
							newTeammate.defeatsTo = 0;
							newTeammate.defeatsWith = 0;
							newPlayer.gamesWith.push(newTeammate);

						}
					});

					$.each(losers, function(index, loser) {
						loser = (loser == "SrenKottal279339" ? "Søren Kottal" : loser);
						if (loser != player) {

							var newTeammate = {}
							newTeammate.name = loser;
							newTeammate.count = 1;
							newTeammate.winsOver = 1;
							newTeammate.winsWith = 0;
							newTeammate.defeatsTo = 0;
							newTeammate.defeatsWith = 0;
							newPlayer.gamesWith.push(newTeammate);

						}
					});

					stats.players.push(newPlayer);
				}

			});

			// process losers

			$.each(losers, function(index, player) {

				player = (player == "SrenKottal279339" ? "Søren Kottal" : player);

				var existingPlayers = stats.players.map(function(p) {
					return p.name;
				});

				var indexOfPlayer = existingPlayers.indexOf(player);
				if (indexOfPlayer > -1) {
					// player already exists, update that one
					var existingTeammates = stats.players[indexOfPlayer].gamesWith.map(function(p) {
						return p.name;
					});

					stats.players[indexOfPlayer].totalGames++;

					$.each(winners, function(index, winner) {
						winner = (winner == "SrenKottal279339" ? "Søren Kottal" : winner);
						if (winner != player) {

							var indexOfTeammate = existingTeammates.indexOf(winner);
							if (indexOfTeammate > -1) {
								stats.players[indexOfPlayer].gamesWith[indexOfTeammate].count++;
								stats.players[indexOfPlayer].gamesWith[indexOfTeammate].defeatsTo++;
							}
							else {
								var newTeammate = {}
								newTeammate.name = winner;
								newTeammate.count = 1;
								newTeammate.winsOver = 0;
								newTeammate.winsWith = 0;
								newTeammate.defeatsTo = 1;
								newTeammate.defeatsWith = 0;
								stats.players[indexOfPlayer].gamesWith.push(newTeammate);
							}

						}
					});

					$.each(losers, function(index, loser) {
						loser = (loser == "SrenKottal279339" ? "Søren Kottal" : loser);
						if (loser != player) {

							var indexOfTeammate = existingTeammates.indexOf(loser);
							if (indexOfTeammate > -1) {
								stats.players[indexOfPlayer].gamesWith[indexOfTeammate].count++;
								stats.players[indexOfPlayer].gamesWith[indexOfTeammate].defeatsWith++;
							}
							else {
								var newTeammate = {}
								newTeammate.name = loser;
								newTeammate.count = 1;
								newTeammate.winsOver = 0;
								newTeammate.winsWith = 0;
								newTeammate.defeatsTo = 0;
								newTeammate.defeatsWith = 1;
								stats.players[indexOfPlayer].gamesWith.push(newTeammate);
							}

						}
					});
				}
				else {
					// create player
					var newPlayer = {};
					newPlayer.name = player;
					newPlayer.totalGames = 1;
					newPlayer.gamesWith = [];

					$.each(winners, function(index, winner) {
						winner = (winner == "SrenKottal279339" ? "Søren Kottal" : winner);
						if (winner != player) {
							var newTeammate = {}
							newTeammate.name = winner;
							newTeammate.count = 1;
							newTeammate.winsOver = 0;
							newTeammate.winsWith = 0;
							newTeammate.defeatsTo = 1;
							newTeammate.defeatsWith = 0;
							newPlayer.gamesWith.push(newTeammate);
						}
					});

					$.each(losers, function(index, loser) {
						loser = (loser == "SrenKottal279339" ? "Søren Kottal" : loser);
						if (loser != player) {
							var newTeammate = {}
							newTeammate.name = loser;
							newTeammate.count = 1;
							newTeammate.winsOver = 0;
							newTeammate.winsWith = 0;
							newTeammate.defeatsTo = 0;
							newTeammate.defeatsWith = 1;
							newPlayer.gamesWith.push(newTeammate);
						}
					});

					stats.players.push(newPlayer);
				}


			});

			console.groupEnd();

		});

		//console.log("Parsing ended at " + lastMatchNum, stats);
		if (lastMatchNum > 1) {
			loadMatches(page+1);
		}
		else {
			$.each(stats.players, function(index, player) {

				$.each(player.gamesWith, function(index, teammate) {
					teammate.winsPct = (teammate.winsOver == 0 || (teammate.winsOver + teammate.defeatsTo) == 0 ? 0 : teammate.winsOver / (teammate.winsOver + teammate.defeatsTo) * 100);
					teammate.winsWithPct = (teammate.winsWith == 0 || (teammate.winsWith + teammate.defeatsWith) == 0 ? 0 : teammate.winsWith / (teammate.winsWith + teammate.defeatsWith) * 100);
				});
				console.groupCollapsed(player.name);
				console.table(player.gamesWith);
				console.groupEnd();
			});


		}

	});
}