import pool from "../library/poolData.js";
import store from "@/store"

export function getItem(times, wishType) {
    let storeData = {} // store中缓存的数据
    let data = {
        up4: true, // 上次四星: true.中, false.歪
        up5: true, // 上次五星: true.中, false.歪
        c4: 0, // 累计c4抽未抽出四星
        c5: 0, // 累计c5抽未抽出五星
        n4: 0, // 累计抽出四星数
        n5: 0 // 累计抽出五星数
    }
    let poolObj = null; // 卡池信息
    let poolList = []; // 卡池选择
    let itemList = []; //抽卡结果
    // 0~length-1 整数随机
    let rd = (length) => {
        return Math.floor(Math.random() * (length - 0));
    };
    /** 抽卡 */
    switch (wishType) {
        case 1:
            poolObj = pool.upPool1;
            storeData = JSON.parse(JSON.stringify(store.state.info.up));
            data.up4 = storeData.up4
            data.up5 = storeData.up5
            data.c4 = storeData.c4
            data.c5 = storeData.c5
            data.n4 = storeData.n4
            data.n5 = storeData.n5
            for (let x = 0; x < times; x++) {
                /** 定义基础变量 */
                let b = 0.006; // 五星基础概率
                let i = 10 * b; // 五星递增概率
                let k = b; // 当前五星概率
                let p = 0.051; // 当前四星概率
                let f = 74;
                let r = Math.random(); // 随机数
                // 从连续不出五星第f发开始，每次出五星概率加i
                if (data.c5 + 1 >= f) {
                    k = b + i * (data.c5 + 1 - (f - 1))
                }
                // 从连续不出四星第9发开始，每次出四星概率加51%
                if (data.c4 + 1 >= 9) {
                    p = 0.051 + 0.51 * (data.c4 + 1 - 8)
                }
                // console.log("k,p,r,4,5:", k, p, r, data.c4, data.c5)

                // 出五星
                if (r < k) {
                    if (!data.up5) {
                        // 上次歪了 本次必中
                        data.up5 = true;
                    } else {
                        // 上次中了 本次1/2概率up
                        data.up5 = rd(2) === 0;
                    }
                    poolList = data.up5 ? poolObj.star5.up : poolObj.star5.noUp
                    itemList.push({ name: poolList[rd(poolList.length)], star: 5, type: 0 })
                    data.c4 += 1; // 累计不出四星计数器照常自增
                    data.c5 = 0; // 累计不出五星计数器清零
                    data.n5 += 1; // 五星计数器自增
                }
                // 出四星
                else if (r >= k && r < k + p) {
                    if (!data.up4) {
                        // 上次歪了 本次必中
                        data.up4 = true;
                    } else {
                        // 上次中了 本次1/2概率up
                        data.up4 = rd(2) === 0;
                    }
                    let type;
                    if (!data.up4) {
                        // 本次歪了 非up角色与武器1/2随机
                        if (rd(2) === 0) {
                            poolList = poolObj.star4.noUpRole;
                            type = 0;
                        } else {
                            poolList = poolObj.star4.noUpArms;
                            type = 1;
                        }
                    } else {
                        // 本次中了
                        poolList = poolObj.star4.up;
                        type = 0;
                    }
                    itemList.push({ name: poolList[rd(poolList.length)], star: 4, type: type })
                    data.c4 = 0; // 累计不出四星计数器清零
                    data.c5 += 1; // 累计不出五星计数器照常自增
                    data.n4 += 1; // 四星计数器自增
                }
                // 出三星
                else if (r >= k + p) {
                    itemList.push({ name: poolObj.star3[rd(poolObj.star3.length)], star: 3, type: 1 })
                    data.c4 += 1; // 累计不出四星计数器照常自增
                    data.c5 += 1; // 累计不出五星计数器照常自增
                }
            }
            itemList.forEach(item => {
                item.time = new Date().getTime()
            })
            store.commit('setUpInfo', {
                all: times,
                up4: data.up4,
                up5: data.up5,
                c4: data.c4,
                c5: data.c5,
                n4: data.n4,
                n5: data.n5,
                allList: itemList
            });
            break;
        case 2:
            poolObj = pool.upPool2;
            storeData = JSON.parse(JSON.stringify(store.state.info.up));
            data.up4 = storeData.up4
            data.up5 = storeData.up5
            data.c4 = storeData.c4
            data.c5 = storeData.c5
            data.n4 = storeData.n4
            data.n5 = storeData.n5
            for (let x = 0; x < times; x++) {
                /** 定义基础变量 */
                let b = 0.006; // 五星基础概率
                let i = 10 * b; // 五星递增概率
                let k = b; // 当前五星概率
                let p = 0.051; // 当前四星概率
                let f = 74;
                let r = Math.random(); // 随机数
                // 从连续不出五星第f发开始，每次出五星概率加i
                if (data.c5 + 1 >= f) {
                    k = b + i * (data.c5 + 1 - (f - 1))
                }
                // 从连续不出四星第9发开始，每次出四星概率加51%
                if (data.c4 + 1 >= 9) {
                    p = 0.051 + 0.51 * (data.c4 + 1 - 8)
                }
                // console.log("k,p,r,4,5:", k, p, r, data.c4, data.c5)

                // 出五星
                if (r < k) {
                    if (!data.up5) {
                        // 上次歪了 本次必中
                        data.up5 = true;
                    } else {
                        // 上次中了 本次1/2概率up
                        data.up5 = rd(2) === 0;
                    }
                    poolList = data.up5 ? poolObj.star5.up : poolObj.star5.noUp
                    itemList.push({ name: poolList[rd(poolList.length)], star: 5, type: 0 })
                    data.c4 += 1; // 累计不出四星计数器照常自增
                    data.c5 = 0; // 累计不出五星计数器清零
                    data.n5 += 1; // 五星计数器自增
                }
                // 出四星
                else if (r >= k && r < k + p) {
                    if (!data.up4) {
                        // 上次歪了 本次必中
                        data.up4 = true;
                    } else {
                        // 上次中了 本次1/2概率up
                        data.up4 = rd(2) === 0;
                    }
                    let type;
                    if (!data.up4) {
                        // 本次歪了 非up角色与武器1/2随机
                        if (rd(2) === 0) {
                            poolList = poolObj.star4.noUpRole;
                            type = 0;
                        } else {
                            poolList = poolObj.star4.noUpArms;
                            type = 1;
                        }
                    } else {
                        // 本次中了
                        poolList = poolObj.star4.up;
                        type = 0;
                    }
                    itemList.push({ name: poolList[rd(poolList.length)], star: 4, type: type })
                    data.c4 = 0; // 累计不出四星计数器清零
                    data.c5 += 1; // 累计不出五星计数器照常自增
                    data.n4 += 1; // 四星计数器自增
                }
                // 出三星
                else if (r >= k + p) {
                    itemList.push({ name: poolObj.star3[rd(poolObj.star3.length)], star: 3, type: 1 })
                    data.c4 += 1; // 累计不出四星计数器照常自增
                    data.c5 += 1; // 累计不出五星计数器照常自增
                }
            }
            itemList.forEach(item => {
                item.time = new Date().getTime()
            })
            store.commit('setUpInfo', {
                all: times,
                up4: data.up4,
                up5: data.up5,
                c4: data.c4,
                c5: data.c5,
                n4: data.n4,
                n5: data.n5,
                allList: itemList
            });
            break;
        case 3:
            poolObj = pool.armsPool;
            storeData = JSON.parse(JSON.stringify(store.state.info.arms));
            data.up4 = storeData.up4
            data.up5 = storeData.up5
            data.c4 = storeData.c4
            data.c5 = storeData.c5
            data.n4 = storeData.n4
            data.n5 = storeData.n5
            for (let x = 0; x < times; x++) {
                /** 定义基础变量 */
                let b = 0.007; // 五星基础概率
                let i = 10 * b; // 五星递增概率
                let k = b; // 当前五星概率
                let p = 0.051; // 当前四星概率
                let f = 63;
                let r = Math.random(); // 随机数
                // 从连续不出五星第f发开始，每次出五星概率加i
                if (data.c5 + 1 >= f) {
                    k = b + i * (data.c5 + 1 - (f - 1))
                }
                // 从连续不出四星第9发开始，每次出四星概率加51%
                if (data.c4 + 1 >= 9) {
                    p = 0.051 + 0.51 * (data.c4 + 1 - 8)
                }
                // console.log("k,p,r,4,5:", k, p, r, data.c4, data.c5)

                // 出五星
                if (r < k) {
                    if (!data.up5) {
                        // 上次歪了 本次必中
                        data.up5 = true;
                    } else {
                        // 上次中了 本次3/4概率up
                        data.up5 = rd(4) !== 0;
                    }
                    poolList = data.up5 ? poolObj.star5.up : poolObj.star5.noUp
                    let item = rd(poolList.length);
                    // 定轨
                    if (store.state.reg.regulation !== false) {
                        // 1.命定值满 必抽出定轨武器;2.没到命定值满就抽到定轨武器: 命定值清空 大保底清空
                        if (store.state.reg.count === 2 || (data.up5 && item === store.state.reg.regulation)) {
                            store.commit('setRegCount', 0);
                            data.up5 = true;
                            item = store.state.reg.regulation;
                        }
                        // 其他情况: 命定值加1
                        else {
                            store.commit('setRegCount', store.state.reg.count + 1)
                        }
                    }
                    itemList.push({ name: poolList[item], star: 5, type: 1 })
                    data.c4 += 1; // 累计不出四星计数器照常自增
                    data.c5 = 0; // 累计不出五星计数器清零
                    data.n5 += 1; // 五星计数器自增
                }
                // 出四星
                else if (r >= k && r < k + p) {
                    if (!data.up4) {
                        // 上次歪了 本次必中
                        data.up4 = true;
                    } else {
                        // 上次中了 本次3/4概率up
                        data.up4 = rd(4) !== 0;
                    }
                    let type;
                    if (!data.up4) {
                        // 本次歪了 非up角色与武器1/2随机
                        if (rd(2) === 0) {
                            poolList = poolObj.star4.noUpRole;
                            type = 0;
                        } else {
                            poolList = poolObj.star4.noUpArms;
                            type = 1;
                        }
                    } else {
                        // 本次中了
                        poolList = poolObj.star4.up;
                        type = 1;
                    }
                    itemList.push({ name: poolList[rd(poolList.length)], star: 4, type: type })
                    data.c4 = 0; // 累计不出四星计数器清零
                    data.c5 += 1; // 累计不出五星计数器照常自增
                    data.n4 += 1; // 四星计数器自增
                }
                // 出三星
                else if (r >= k + p) {
                    itemList.push({ name: poolObj.star3[rd(poolObj.star3.length)], star: 3, type: 1 })
                    data.c4 += 1; // 累计不出四星计数器照常自增
                    data.c5 += 1; // 累计不出五星计数器照常自增
                }
            }
            itemList.forEach(item => {
                item.time = new Date().getTime()
            })
            store.commit('setArmsInfo', {
                all: times,
                up4: data.up4,
                up5: data.up5,
                c4: data.c4,
                c5: data.c5,
                n4: data.n4,
                n5: data.n5,
                allList: itemList
            });
            break;
        case 4:
            poolObj = pool.permanentPool;
            storeData = JSON.parse(JSON.stringify(store.state.info.permanent));
            data.c4 = storeData.c4
            data.c5 = storeData.c5
            data.n4 = storeData.n4
            data.n5 = storeData.n5
            for (let x = 0; x < times; x++) {
                /** 定义基础变量 */
                let b = 0.006; // 五星基础概率
                let i = 10 * b; // 五星递增概率
                let k = b; // 当前五星概率
                let p = 0.051; // 当前四星概率
                let f = 74;
                let r = Math.random(); // 随机数
                // 从连续不出五星第f发开始，每次出五星概率加i
                if (data.c5 + 1 >= f) {
                    k = b + i * (data.c5 + 1 - (f - 1))
                }
                // 从连续不出四星第9发开始，每次出四星概率加51%
                if (data.c4 + 1 >= 9) {
                    p = 0.051 + 0.51 * (data.c4 + 1 - 8)
                }
                // console.log("k,p,r,4,5:", k, p, r, data.c4, data.c5)

                // 出五星
                if (r < k) {
                    let type;
                    // 角色与武器1/2随机
                    if (rd(2) === 0) {
                        poolList = poolObj.star5.role;
                        type = 0;
                    } else {
                        poolList = poolObj.star5.arms;
                        type = 1;
                    }
                    itemList.push({ name: poolList[rd(poolList.length)], star: 5, type: type })
                    data.c4 += 1; // 累计不出四星计数器照常自增
                    data.c5 = 0; // 累计不出五星计数器清零
                    data.n5 += 1; // 五星计数器自增
                }
                // 出四星
                else if (r >= k && r < k + p) {
                    let type;
                    // 角色与武器1/2随机
                    if (rd(2) === 0) {
                        poolList = poolObj.star4.role;
                        type = 0;
                    } else {
                        poolList = poolObj.star4.arms;
                        type = 1;
                    }
                    itemList.push({ name: poolList[rd(poolList.length)], star: 4, type: type })
                    data.c4 = 0; // 累计不出四星计数器清零
                    data.c5 += 1; // 累计不出五星计数器照常自增
                    data.n4 += 1; // 四星计数器自增
                }
                // 出三星
                else if (r >= k + p) {
                    itemList.push({ name: poolObj.star3[rd(poolObj.star3.length)], star: 3, type: 1 })
                    data.c4 += 1; // 累计不出四星计数器照常自增
                    data.c5 += 1; // 累计不出五星计数器照常自增
                }
            }
            itemList.forEach(item => {
                item.time = new Date().getTime()
            })
            store.commit('setPermanentInfo', {
                all: times,
                c4: data.c4,
                c5: data.c5,
                n4: data.n4,
                n5: data.n5,
                allList: itemList
            });
            break;
    }
    store.commit('setResentList', itemList)
    return itemList
}