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
    //console.log(match_data);
    let matches_per_year = new Map();
    match_data.forEach(data_element => {
        let year_data = data_element.get("season");
        if(!matches_per_year.has(year_data)){
            matches_per_year.set(year_data, 1);
        }
        else{
            matches_per_year.set(year_data, matches_per_year.get(year_data) + 1);
        }
    });
    var matches_per_year_sorted = new Map([...matches_per_year.entries()].sort());
    var number = 0;
    for (k of matches_per_year_sorted.keys()){
        if (number++ === 1)
        {
            break;
        }
        matches_per_year_sorted.delete(k);
    }
    console.log(matches_per_year_sorted);
    let json_obj = {};
    matches_per_year_sorted.forEach((value, key) => {
        json_obj[key] = value;
    });
    //console.log(JSON.stringify(json_obj));
    file_reader.writeFile('../public/ipl.json', JSON.stringify(json_obj), (error) => {
        if (error) throw error;
    });
}

readMatchData();