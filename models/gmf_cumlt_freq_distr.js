module.exports = (sequelize, DataTypes) => {
    const GMF_CUMLT_FREQ_DISTR = sequelize.define('gmf_cumlt_freq_distr', {
        CFD_ID: { type: DataTypes.INTEGER(5) },
        PROC_TP_NM: { type: DataTypes.STRING(15) },
        SEQ_NO: { type: DataTypes.INTEGER(5) },
        CFD_NM: { type: DataTypes.STRING(2) },
        LOWR_BND_NO: { type: DataTypes.DECIMAL(2, 1) },
        UPPR_BND_NO: { type: DataTypes.DECIMAL(2, 1) },
        FREQ_NO: { type: DataTypes.INTEGER(3) },
        CUMLT_NO: { type: DataTypes.INTEGER(3) },
        PCT_NO: { type: DataTypes.DECIMAL(5, 2) },
        LVL_NO: { type: DataTypes.INTEGER(2) },
        ST_DT: { type: DataTypes.DATE },
        END_DT: { type: DataTypes.DATE }
    })

    return GMF_CUMLT_FREQ_DISTR;
}