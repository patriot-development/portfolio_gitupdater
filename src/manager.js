import axios from 'axios'
import * as dal from './dal'

export async function processCommit(req) {
    new Promise((resolve, reject) => {
        req.body.commits.forEach(commit => {
            axios({
              method: "GET",
              url: "https://api.github.com/repos/" + req.body.repository.owner.name + "/" + req.body.repository.name + "/commits/" + commit.id,
              headers: {
                  "Authorization": "token " + process.env.TOKEN,
              }
            }).then(async statusResult =>{
              let author = statusResult.data.author;
              let stats = statusResult.data.stats;
              if(author.login.toLowerCase() == "bartverm779"){
                await dal.AddToDatabase(stats, commit.timestamp, commit.message)
              }
            })
        })
        resolve()
    }).then(() => {return})
}