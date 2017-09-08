const moment = require('moment');
const CfdTableServices = require('../services/CfdTableServices')
const request = require('request-promise')

const getIndex = (req, res) => {
    if (req.user) {
        const model = {
            title: 'CFD Table'
        };
        res.render('cfd-table/index', model);
    } else {
        res.render('auth/signin/index', {
            title: 'Sign In'
          });
    }
};

const getCumulative = (req, res) => {
    const reqBody = {
    }
    const reqOpts = {
        method: 'GET',
        uri: process.env.SERVER_API + '/golfgame-api/work-history',
        body: reqBody,
        json: true // Automatically stringifies the body to JSON 
    }
    request(reqOpts).then((response) => {
        res.status(200).json(getAlgorithm(response))
    })
        .catch((error) => {
            console.log(`error: `, error)
            next(error)
        })
}

const getAlgorithm = (processList) => {
    const hashObj = {}
    processList.forEach((itm) => {
        if (!!hashObj[itm.PROC_NM]) {
            if (hashObj[itm.PROC_NM].LD_TMs) {
                const len = hashObj[itm.PROC_NM].LD_TMs.length;
                if (hashObj[itm.PROC_NM].max <= itm.LD_TM) {
                    hashObj[itm.PROC_NM].max = itm.LD_TM
                    hashObj[itm.PROC_NM].maxCeil = ceil05(hashObj[itm.PROC_NM].max)
                }

                if (hashObj[itm.PROC_NM].min >= itm.LD_TM) {
                    hashObj[itm.PROC_NM].min = itm.LD_TM
                    hashObj[itm.PROC_NM].minFloor = Math.floor(hashObj[itm.PROC_NM].min)
                }

                hashObj[itm.PROC_NM].LD_TMs.push(itm.LD_TM)
            } else {
                hashObj[itm.PROC_NM].LD_TMs = [itm.LD_TM]
                hashObj[itm.PROC_NM].max = itm.LD_TM
                hashObj[itm.PROC_NM].min = itm.LD_TM
                hashObj[itm.PROC_NM].minFloor = Math.floor(hashObj[itm.PROC_NM].min)
                hashObj[itm.PROC_NM].maxCeil = ceil05(hashObj[itm.PROC_NM].max)
            }
        } else {
            hashObj[itm.PROC_NM] = {
                LD_TMs: [itm.LD_TM],
                max: itm.LD_TM,
                min: itm.LD_TM,
                maxCeil: ceil05(itm.LD_TM),
                minFloor: Math.floor(itm.LD_TM)
            }
        }

    })
    const resArr = [];
    let idcfd = 0;
    Object.keys(hashObj).forEach(k => {
        const max = hashObj[k].maxCeil
        const min = hashObj[k].minFloor
        let temp = 0;
        let sumLeadTime = hashObj[k].LD_TMs.length;
        idcfd++;
        let seq = 1;
        for (let i = min; i < max; i += 0.5) {
            temp = temp + countIf(hashObj[k].LD_TMs, { lowerBound: i, upperBound: i + 0.5 });
            let countfre = countIf(hashObj[k].LD_TMs, { lowerBound: i, upperBound: i + 0.5 });
            let percen = Math.round(temp * 100 / sumLeadTime * 100) / 100;
            resArr.push({
                id: idcfd,
                cfdName: "G" + k,
                processName: k,
                seq: seq,
                lowerBound: i,
                upperBound: i + 0.5,
                frequency: countIf(hashObj[k].LD_TMs, { lowerBound: i, upperBound: i + 0.5 }),
                cumuFrequency: temp,
                percentage: percen,
                level: setLevel(percen),
                // stDt: moment(new Date()).add(-1, 'month'),
                // endDt: new Date()
                stDt: '2017.08.01',
                endDt: '2017.08.31'
            })
            seq++;
        }
    })
    saveCumulative(resArr);
    console.log(resArr);
    return resArr;
}

/**
 * 
 * @param {*} arr [list of number]
 * @param {*} obj {lowerBound, upperBound}
 */
const countIf = (arr, obj) => {
    let count = 0
    arr.forEach(itm => {
        if (obj.lowerBound <= itm && obj.upperBound > itm) {
            count += 1
        }
    })
    return count
}

const ceil05 = (num) => {
    if (num - Math.floor(num) >= 0.5) {
        return Math.ceil(num)
    } else if (num - Math.floor(num) == 0) {
        return num + 0.5
    } else {
        return Math.floor(num) + 0.5
    }
}

const setLevel = (percen) => {
    switch (true) {
        case (percen > 0 && percen <= 10):
            return 1;
            break;
        case (percen > 10 && percen <= 20):
            return 2;
            break;
        case (percen > 20 && percen <= 30):
            return 3;
            break;
        case (percen > 30 && percen <= 40):
            return 4;
            break;
        case (percen > 40 && percen <= 50):
            return 5;
            break;
        case (percen > 50 && percen <= 60):
            return 6;
            break;
        case (percen > 60 && percen <= 70):
            return 7;
            break;
        case (percen > 70 && percen <= 80):
            return 8;
            break;
        case (percen > 80 && percen <= 90):
            return 9;
            break;
        case (percen > 90 && percen <= 100):
            return 10;
            break;
        default:
            return 0;
            break;
    }
}

const saveCumulative = (lstData) => {
    CfdTableServices.deleteGMF_CUMLT_FREQ_DIST();
    CfdTableServices.addGMF_CUMLT_FREQ_DISTR(lstData);
}

module.exports = {
    getCumulative, getIndex
};