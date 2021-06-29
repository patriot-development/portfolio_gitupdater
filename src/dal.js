import * as knex from 'knex'

export async function AddToDatabase(stats, timestamp, message, pId) {
    const sql = getSQL();
    await sql('commitInfo').insert({day: timestamp, additions: stats.additions, deletions: stats.deletions, total: stats.total, message: message, project: pId})
    return ''
}

export async function addCommitToRepo(pId){
    const sql = getSQL();
    let res = await sql('repository').select('*').where({id: pId});
    if(res.length == 0){
        await sql.raw('INSERT INTO `onHoldRepo` (`id`, `commits`) values (' + pId + ', 1) ON DUPLICATE KEY UPDATE `id` = `id` = `id` + 1')
    }
    let s = await sql('repository').select('*').where({id: pId});
    await sql('repository').update({commits: parseInt(s[0].commits, 10) + 1}).where({id: pId})
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