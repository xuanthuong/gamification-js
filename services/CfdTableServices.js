
const models = require('../models');

const addGMF_CUMLT_FREQ_DISTR = (dataArr) => {
    dataArr.forEach(function (element) {
        models.GMF_CUMLT_FREQ_DISTR.create({
            CFD_ID: element.id,
            CFD_NM: element.cfdName,
            PROC_TP_NM: element.processName,
            SEQ_NO: element.seq,
            LOWR_BND_NO: element.lowerBound,
            UPPR_BND_NO: element.upperBound,
            FREQ_NO: element.frequency,
            CUMLT_NO: element.cumuFrequency,
            PCT_NO: element.percentage,
            LVL_NO: element.level,
            ST_DT: element.stDt,
            END_DT: element.endDt
        })
    });
    return 1;
}

const deleteGMF_CUMLT_FREQ_DIST = () => {
    models.GMF_CUMLT_FREQ_DISTR.destroy({
        where: {}
    });
}

module.exports = {
    addGMF_CUMLT_FREQ_DISTR, deleteGMF_CUMLT_FREQ_DIST
}