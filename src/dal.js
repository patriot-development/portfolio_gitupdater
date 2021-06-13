import * as knex from 'knex'

export async function AddToDatabase(stats, timestamp, message) {
    const sql = getSQL();
    await sql('commitInfo').insert({day: timestamp, additions: stats.additions, deletions: stats.deletions, total: stats.total, message: message})
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