import pool from "../library/poolData"

/** 卡池信息 version2.5 start */
export function getListData(type) {
    let listData = {
        textData: {},
        tableData5: [],
        tableData4: [],
        tableData3: []
    }
    if (type === 1) {
        listData.textData = {
            title: "角色",
            titleText1: "影寂",
            titleColor1: "purple",
            titleText2: "天下人",
            itemText1: "「一心净土·雷电将军（雷）」",
            itemColor2: "purple",
            itemText2: "「黑羽鸣镝·九条裟罗（雷）」",
            itemColor3: "red",
            itemText3: "「燥热旋律·辛焱（火）」",
            itemColor4: "red",
            itemText4: "「命运试金石·班尼特（火）」",
            pollText: "「角色活动祈愿」",
            rate1: "50.000%",
            rate2_1: "0.600%",
            rate2_2: "1.600%",
            rate3_1: "5.100%",
            rate3_2: "13.000%",
            rate4_1: "94.300%",
            rate4_2: "85.400%",
            rate5: "2.550%",
            rate6: "99.400%",
            floor: "90"
        }
        pool.upPool1.star5.up.forEach(item => {
            listData.tableData5.push({
                type: "角色",
                name: item + "（UP）",
                baseRate: "0.300%",
                allRate: "0.800%",
            })
        })
        pool.upPool1.star5.noUp.forEach(item => {
            listData.tableData5.push({
                type: "角色",
                name: item,
                baseRate: "0.060%",
                allRate: "0.160%",
            })
        })
        pool.upPool1.star4.up.forEach(item => {
            listData.tableData4.push({
                type: "角色",
                name: item + "（UP）",
                baseRate: "0.850%",
                allRate: "2.167%",
            })
        })
        pool.upPool1.star4.noUpRole.forEach(item => {
            listData.tableData4.push({
                type: "角色",
                name: item,
                baseRate: "0.075%",
                allRate: "0.191%",
            })
        })
        pool.upPool1.star4.noUpArms.forEach(item => {
            listData.tableData4.push({
                type: "武器",
                name: item,
                baseRate: "0.071%",
                allRate: "0.181%",
            })
        })
        pool.upPool1.star3.forEach(item => {
            listData.tableData3.push({
                type: "角色",
                name: item,
                baseRate: "7.254%",
                allRate: "6.569%",
            })
        })
    } else if (type === 2) {
        listData.textData = {
            title: "角色",
            titleText1: "浮岳",
            titleColor1: "blue",
            titleText2: "虹珠",
            itemText1: "「真珠之智·珊瑚宫心海（水）」",
            itemColor2: "purple",
            itemText2: "「黑羽鸣镝·九条裟罗（雷）」",
            itemColor3: "red",
            itemText3: "「燥热旋律·辛焱（火）」",
            itemColor4: "red",
            itemText4: "「命运试金石·班尼特（火）」",
            pollText: "「角色活动祈愿-2」",
            rate1: "50.000%",
            rate2_1: "0.600%",
            rate2_2: "1.600%",
            rate3_1: "5.100%",
            rate3_2: "13.000%",
            rate4_1: "94.300%",
            rate4_2: "85.400%",
            rate5: "2.550%",
            rate6: "99.400%",
            floor: "90"
        }
        pool.upPool2.star5.up.forEach(item => {
            listData.tableData5.push({
                type: "角色",
                name: item + "（UP）",
                baseRate: "0.300%",
                allRate: "0.800%",
            })
        })
        pool.upPool2.star5.noUp.forEach(item => {
            listData.tableData5.push({
                type: "角色",
                name: item,
                baseRate: "0.060%",
                allRate: "0.160%",
            })
        })
        pool.upPool2.star4.up.forEach(item => {
            listData.tableData4.push({
                type: "角色",
                name: item + "（UP）",
                baseRate: "0.850%",
                allRate: "2.167%",
            })
        })
        pool.upPool2.star4.noUpRole.forEach(item => {
            listData.tableData4.push({
                type: "角色",
                name: item,
                baseRate: "0.075%",
                allRate: "0.191%",
            })
        })
        pool.upPool2.star4.noUpArms.forEach(item => {
            listData.tableData4.push({
                type: "武器",
                name: item,
                baseRate: "0.071%",
                allRate: "0.181%",
            })
        })
        pool.upPool1.star3.forEach(item => {
            listData.tableData3.push({
                type: "角色",
                name: item,
                baseRate: "7.254%",
                allRate: "6.569%",
            })
        })
    } else if (type === 3) {
        listData.textData = {
            title: "武器",
            titleText1: "神铸",
            titleColor1: "king1",
            titleText2: "赋形",
            itemText1: "「长柄武器·薙草之稻光」",
            itemText1_1: "「法器·不灭月华」",
            itemColor2: "purple",
            itemText2: "「弓·曚云之月」",
            itemColor3: "purple",
            itemText3: "「法器·祭礼残章」",
            itemColor4: "purple",
            itemText4: "「长柄武器·西风长枪」",
            itemColor5: "purple",
            itemText5: "「双手剑·恶王丸」",
            itemColor6: "purple",
            itemText6: "「单手剑·匣里龙吟」",
            pollText: "「武器活动祈愿」",
            rate1: "75.000%",
            rate2_1: "0.700%",
            rate2_2: "1.850%",
            rate3_1: "6.000%",
            rate3_2: "14.500%",
            rate4_1: "93.300%",
            rate4_2: "83.650%",
            rate5: "3.000%",
            rate6: "99.300%",
            floor: "80"
        }
        pool.armsPool.star5.up.forEach(item => {
            listData.tableData5.push({
                type: "武器",
                name: item + "（UP）",
                baseRate: "0.263%",
                allRate: "0.694%",
            })
        })
        pool.armsPool.star5.noUp.forEach(item => {
            listData.tableData5.push({
                type: "武器",
                name: item,
                baseRate: "0.018%",
                allRate: "0.046%",
            })
        })
        pool.armsPool.star4.up.forEach(item => {
            listData.tableData4.push({
                type: "武器",
                name: item + "（UP）",
                baseRate: "0.900%",
                allRate: "2.175%",
            })
        })
        pool.armsPool.star4.noUpRole.forEach(item => {
            listData.tableData4.push({
                type: "角色",
                name: item,
                baseRate: "0.038%",
                allRate: "0.091%",
            })
        })
        pool.armsPool.star4.noUpArms.forEach(item => {
            listData.tableData4.push({
                type: "武器",
                name: item,
                baseRate: "0.050%",
                allRate: "0.121%",
            })
        })
        pool.upPool1.star3.forEach(item => {
            listData.tableData3.push({
                type: "角色",
                name: item,
                baseRate: "7.177%",
                allRate: "6.435%",
            })
        })
    } else if (type === 4) {
        listData.textData = {
            rate1: "50.000%",
            rate2_1: "0.600%",
            rate2_2: "1.600%",
            rate3_1: "5.100%",
            rate3_2: "13.000%",
            rate4_1: "94.300%",
            rate4_2: "85.400%",
            rate5: "2.550%",
            rate6: "99.400%",
            floor: "90"
        }
        pool.permanentPool.star5.role.forEach(item => {
            listData.tableData5.push({
                type: "角色",
                name: item,
                baseRate: "0.060%",
                allRate: "0.160%",
            })
        })
        pool.permanentPool.star5.arms.forEach(item => {
            listData.tableData5.push({
                type: "武器",
                name: item,
                baseRate: "0.030%",
                allRate: "0.080%",
            })
        })
        pool.permanentPool.star4.role.forEach(item => {
            listData.tableData4.push({
                type: "角色",
                name: item,
                baseRate: "0.111%",
                allRate: "0.282%",
            })
        })
        pool.permanentPool.star4.arms.forEach(item => {
            listData.tableData4.push({
                type: "武器",
                name: item,
                baseRate: "0.142%",
                allRate: "0.361%",
            })
        })
        pool.upPool1.star3.forEach(item => {
            listData.tableData3.push({
                type: "角色",
                name: item,
                baseRate: "7.254%",
                allRate: "6.569%",
            })
        })
    }
    return listData
}
/** 卡池信息 version2.5 end */