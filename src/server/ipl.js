const file_reader = require('fs');

function readMatchData(){
    var raw_data = file_reader.readFileSync('../data/matches.csv','utf8');
    let match_data = new Array();
    let match_data_row = new Array();
    match_data_row = raw_data.split(/\n/);
    let title = match_data_row[0].split(',');
    let i = 1;
    let j = 0;
    for(i = 1; i < match_data_row.length; i++){
        let match = new Map();
        let single_data_row = match_data_row[i].split(',');
        for(j = 0; j < single_data_row.length; j++){
            match.set(title[j], single_data_row[j]);
        }
        match_data.push(match);
    }
    console.log(match_data);
}

readMatchData();