import * as knex from 'knex'

export async function AddToDatabase(stats, timestamp, message, pId) {
    const sql = getSQL();
    await sql('commitInfo').insert({day: timestamp, additions: stats.additions, deletions: stats.deletions, total: stats.total, message: message, project: pId})
    return ''
}

export async function addCommitToRepo(pId){
    const sql = getSQL();
    await sql('repository').update(sql.raw('commits = commits + 1')).where({id: pId})
    return ''
}

function getSQL(){
    const s = knex.knex({
        client: "mysql",
        connection: {
            "host": process.env.HOST,
            "port": 3306,
            "database": process.env.DB,
            "user": process.env.DB,
            "password": process.env.PSWD
        },
        debug: false,
    })
    return s;
}