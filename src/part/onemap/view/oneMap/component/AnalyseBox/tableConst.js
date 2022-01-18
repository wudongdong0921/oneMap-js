const obj = {
    gp: {
        LYK_DLTB: {
            en: 'TBMJ,TBDLMJ,DLBM,DLMC,QSXZ,TKXS,TKMJ,LXDWMJ,XZDWMJ,TBDLMJY,TBMJY,TBBH,ZLDWDM,ZLDWMC,QSDWDM,QSDWMC,TBYBH,SMID,smgeometry',
            cn: '图斑面积,图斑地类面积,地类编码,地类名称,权属性质,田坎系数,田坎面积,零星地物面积,线状地物面积,图斑地类面积（原）,图斑面积（原）,图斑编号,坐落单位代码,坐落单位名称,权属单位代码,权属单位名称,图斑预编号,SMID'
        },
        LYK_XZDW: {
            en: "DLBM,DLMC,QSXZ,CD,KD,KCBL,XZDWMJ,KCXZDWZMJ1,KCXZDWZMJ2,KCTBBH1,KCTBBH2,QSDWMC1,QSDWDM1,QSDWDM2,XZDWBH,XZDWYBH,SMID,smgeometry",
            cn: "地类编码,地类名称,权属性质,长度,宽度,扣除比例,线状地物总面积,统计扣除线状地物总面积1,统计扣除线状地物总面积2,扣除图斑编号1,扣除图斑编号2,权属单位名称1,权属单位代码1,权属单位名称2,权属单位代码2,线状地物编号,线状地物预编号,SMID"
        }
        
    },
    oracle: {
        LYK_DLTB: {
            en: 'TBMJ,TBDLMJ,DLBM,DLMC,QSXZ,TKXS,TKMJ,LXDWMJ,XZDWMJ,TBDLMJY,TBMJY,TBBH,ZLDWDM,ZLDWMC,QSDWDM,QSDWMC,TBYBH,SMID,to_char(smgeometry) smgeometry',
            cn: '图斑面积,图斑地类面积,地类编码,地类名称,权属性质,田坎系数,田坎面积,零星地物面积,线状地物面积,图斑地类面积（原）,图斑面积（原）,图斑编号,坐落单位代码,坐落单位名称,权属单位代码,权属单位名称,图斑预编号,SMID'
        },
        LYK_XZDW: {
            en: "DLBM,DLMC,QSXZ,CD,KD,KCBL,XZDWMJ,KCXZDWZMJ1,KCXZDWZMJ2,KCTBBH1,KCTBBH2,QSDWMC1,QSDWDM1,QSDWDM2,XZDWBH,XZDWYBH,SMID,to_char(smgeometry) smgeometry",
            cn: "地类编码,地类名称,权属性质,长度,宽度,扣除比例,线状地物总面积,统计扣除线状地物总面积1,统计扣除线状地物总面积2,扣除图斑编号1,扣除图斑编号2,权属单位名称1,权属单位代码1,权属单位名称2,权属单位代码2,线状地物编号,线状地物预编号,SMID"
        }
       
    }
    
}
export default obj